import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import '../styles/AdminDashBoard.css'


const AdminDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("documents", documents)

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/v1/document/all`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setDocuments(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/document/delete/${id}`);
      setDocuments(documents.filter((doc) => doc._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = async (id) => {
    console.log("need to implement this feature");
    
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Last Modified</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc._id}>
                <td>{doc.title}</td>
                <td>{moment(doc.lastModified).format('dddd h:mm a')}</td>
                <td>{moment(doc.createdAt).format('dddd h:mm a')}</td>
                <td>
                  <button onClick={() => handleEdit(doc._id)}>Edit</button>
                  <button onClick={() => handleDelete(doc._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AdminDashboard;