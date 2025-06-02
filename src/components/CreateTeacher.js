import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateTeacher.css';


const CreateTeacher = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('teacher'); // Default to teacher
  const [classroom, setClassroom] = useState(''); // Store the selected classroom for class teacher
  const [subject, setSubject] = useState(''); // Store the selected subject for subject teacher
  const [password, setPassword] = useState(''); // Store the password for teacher
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();

    if (!name || !email || !role || !password) {
      setMessage('All fields are required');
      return;
    }

    const teacherData = { name, email, role, classroom, subject, password };

    axios.post('http://127.0.0.1:8000/api/CreateTeacher/', teacherData)
      .then(response => {
        alert('Teacher Created');
        navigate('/AdminDashboard'); // Redirect back to admin dashboard
      })
      .catch(error => {
        setMessage('Error creating teacher. Please try again.');
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Create Teacher</h2>
      <form onSubmit={handleCreate}>
        <div>
          <input
            type="text"
            placeholder="Teacher Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Teacher Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Role Selection */}
        <div>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="teacher">Subject Teacher</option>
            <option value="class_teacher">Class Teacher</option>
          </select>
        </div>

        {/* Classroom Dropdown for Class Teacher */}
        {role === 'class_teacher' && (
          <div>
            <select value={classroom} onChange={(e) => setClassroom(e.target.value)} required>
              <option value="">Select Classroom</option>
              <option value="UKG">UKG</option>
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              <option value="3">Class 3</option>
              <option value="4">Class 4</option>
              <option value="5">Class 5</option>
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
            </select>
          </div>
        )}

        {/* Subject Input for Subject Teacher */}
        {role === 'teacher' && (
          <div>
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
        )}

        {/* Password Input */}
        <div>
          <input
            type="password"
            placeholder="Teacher Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {message && <p style={{ color: 'red' }}>{message}</p>}

        <div>
          <button type="submit">Create Teacher</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeacher;
