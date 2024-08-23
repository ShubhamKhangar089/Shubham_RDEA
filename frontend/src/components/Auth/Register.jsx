import { useState } from 'react';
import '../../styles/RegisterStyle.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

    const Register = () => {
        const [formData, setFormData] = useState({ username: '', email: '', password: '' });
        const [error , setError] = useState("");
        const navigate = useNavigate();


        const handleSubmit = async (e) => {
          e.preventDefault();
          try {
            const response = await axios.post('http://localhost:8080/api/v1/user/register', formData);
            // console.log(response.data.message);
            alert("Welcome : User Register Successfully")
            if(!response){
              setError("response not valid")
            }
            setFormData({ username: '', email: '', password: '' })
            navigate('/login')
          } catch (err) {
            setError(err.message);
          }
        };
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        };
      
        return (
          <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
              <h2>Register</h2>
              <div className="form-field">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <button type="submit" className="register-button">
                  Register
                </button>
                <button className="login-button">
                  <Link style={{ color: '#fff', textDecoration: 'none' }} to="/login">
                    Login
                  </Link>
                </button>
              </div>
              {error && <p>{error}</p>}
            </form>
          </div>
          
        );
      };
export default Register;