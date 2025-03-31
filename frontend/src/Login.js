import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/register', {
        username,
        password,
      });
      console.log('Register Response:', response);
      setMessage(response.data.message || 'Registration successful');
    } catch (error) {
      console.log('Register Error:', error.response);
      if (error.response && error.response.data) {
        // Если это массив ошибок валидации
        if (Array.isArray(error.response.data)) {
          const errorMessages = error.response.data.map(err => err.msg).join(', ');
          setMessage(errorMessages);
        } else if (error.response.data.detail) {
          setMessage(error.response.data.detail);
        } else {
          setMessage('An error occurred during registration');
        }
      } else {
        setMessage('Network error during registration');
      }
    }
  };

  const handleLogin = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      const response = await axios.post('http://localhost:8000/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      console.log('Login Response:', response);
      setMessage(`Token: ${response.data.access_token}`);
    } catch (error) {
      console.log('Login Error:', error.response);
      if (error.response && error.response.data) {
        if (Array.isArray(error.response.data)) {
          const errorMessages = error.response.data.map(err => err.msg).join(', ');
          setMessage(errorMessages);
        } else if (error.response.data.detail) {
          setMessage(error.response.data.detail);
        } else {
          setMessage('An error occurred during login');
        }
      } else {
        setMessage('Network error during login');
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
}

export default Login;