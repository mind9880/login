import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function TeacherLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:8000/api/TeacherLogin/', {
      username: username,
      password: password,
    });

    console.log('Login successful', response.data);
    // Navigate or store token/session
     navigate('/TeacherDashboard'); // Redirect to Teacher Dashboard on successful login
  } catch (error) {
    console.error('Login error:', error);
  }
};

  return (
    <div className="login-container">
      <h2>Teacher Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="links">
        <a href="/forgot-password">Forgot Password?</a>
      </div>
    </div>
  );
}

export default TeacherLogin;