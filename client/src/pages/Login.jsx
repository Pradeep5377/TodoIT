import '../styles/Login.css';
import React from 'react';
import loginlogo from "../assets/todologo.png"; // Adjust as needed
import { CheckCircle } from 'lucide-react'; // Ensure you have @mui/icons-material installed

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };
  const handleGithubLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <img src={loginlogo} alt="Logo" className="login-logo-large" />
        {/* <CheckCircle className="check-icon" /> */}

        <p className="app-tagline">Organize. Track. Collaborate.</p>
      </div>
      <div className="login-maincontainer">
        <h1 id='login-welcome'>Welcome</h1>
        <p>Login to manage your tasks efficiently</p>
        <div className="login-options">
          <button onClick={handleGoogleLogin} className="login-google">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="auth-icon"/>
            Continue with Google
          </button>
          <button onClick={handleGithubLogin} className="login-github">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub"  className="auth-icon"/>
            Continue with Github
          </button>
      </div>

      </div>
    </div>
  );
};

export default Login;
