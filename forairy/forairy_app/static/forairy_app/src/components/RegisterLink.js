import React, { useState } from 'react';
import RegisterForm from './RegisterForm';

const RegisterLink = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleRegisterClick = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  return (
    <div>
      <button type="button" onClick={handleRegisterClick}>Register</button>
      {showRegisterForm && <RegisterForm />}
    </div>
  );
};

export default RegisterLink;
