import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contextAPI/authContext';
import '../styles/UserDashboard.css'

const Dashboard = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const { user } = useContext(AuthContext);
  let userId;

  const fetchData = () => {
    if (user) {
      userId = user._id;
      getDocuments();
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleCreateDocument = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const formData = new FormData();
      formData.append('title', title);
      formData.append('file', file);

      const response = await axios.post('http://localhost:8080/api/v1/document/createDoc', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      setDocuments([...documents, response.data]);
      setTitle('');
      setFile(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const getDocuments = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const response = await axios.get(`http://localhost:8080/api/v1/document/get/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDocuments(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditDocument = (documentId) => {
    console.log("handleEditDocument : doc id", documentId);
    
    setEditing(documentId);
  };

  const handleRenameDocument = async (documentId, newTitle) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const response = await axios.patch(`http://localhost:8080/api/v1/document/update/${documentId}`, { title: newTitle }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedDocuments = documents.map((document) => {
        if (document._id === documentId) {
          return { ...document, title: newTitle };
        }
        return document;
      });
      setDocuments(updatedDocuments);
      setEditing(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteDocument = async (documentId) => {
    console.log("doc id :", documentId);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      await axios.delete(`http://localhost:8080/api/v1/document/delete/${documentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedDocuments = documents.filter((document) => document._id !== documentId);
      setDocuments(updatedDocuments);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="dashboard">
      <h1>Documents</h1>
      <form onSubmit={handleCreateDocument} className="create-form">
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </label>
        <br />
        <label>
          File:
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
        <br />
        <button type="submit" className="btn btn-primary">
          Create Document
        </button>
      </form>
      <ul className="document-list">
        {documents.map((document) => (
          <li key={document._id} className="document-item">
            {editing === document._id ? (
              <input
                type="text"
                value={document.title}
                onChange={(e) => handleRenameDocument(document._id, e.target.value)}
                className="rename-input"
              />
            ) : (
              <span className="document-title">{document.title}</span>
            )}
            <button
              onClick={() => handleEditDocument(document._id)}
              className="btn btn-secondary"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteDocument(document._id)}
              className="btn btn-danger"
            >
              Delete
              </button>
          </li>
        ))}
      </ul>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Dashboard;