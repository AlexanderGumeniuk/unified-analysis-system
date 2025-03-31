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
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.detail);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/login', {
        username,
        password,
      }, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      setMessage(`Token: ${response.data.access_token}`);
    } catch (error) {
      setMessage(error.response.data.detail);
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