import React, { useState } from 'react';

if (!window.getCookie) {
  window.getCookie = function(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };
}

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password1: '',
    password2: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = () => {
    fetch('/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': window.getCookie('csrftoken'),
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Registration successful!');
        } else {
          console.error('Registration failed:', data.error);
        }
      })
      .catch(error => console.error('Registration error:', error));
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password1" value={formData.password1} onChange={handleChange} />
        </label>
        <br />
        <label>
          Confirm Password:
          <input type="password" name="password2" value={formData.password2} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
