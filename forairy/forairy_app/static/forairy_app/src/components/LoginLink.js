import React, { useState } from 'react';
import LoginForm from './LoginForm';

const LoginLink = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div>
      <button type="button" onClick={handleLoginClick}>Login</button>
      {showLoginForm && <LoginForm />}
    </div>
  );
};

export default LoginLink;
