import React, { useState } from 'react'; // Ensure 'import' is always lowercase
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import AuthOverlay from '../components/Auth/AuthOverlay';
import '../styles/auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="video-auth-page">
      <div className="video-auth-container">
        
        {/* LEFT ZONE: Login Form Block */}
        <div 
          className="form-wrapper-zone zone-left"
          style={{ 
            opacity: isLogin ? 1 : 0, 
            pointerEvents: isLogin ? 'all' : 'none' 
          }}
        >
          <LoginForm onSwitch={() => setIsLogin(false)} />
        </div>
        
        {/* RIGHT ZONE: Register Form Block */}
        <div 
          className="form-wrapper-zone zone-right"
          style={{ 
            opacity: !isLogin ? 1 : 0, 
            pointerEvents: !isLogin ? 'all' : 'none'
          }}
        >
          <RegisterForm onSwitch={() => setIsLogin(true)} />
        </div>

        {/* Dynamic Slanted Moving Layer Mask */}
        <AuthOverlay isLogin={isLogin} />

      </div>
    </div>
  );
};

export default Auth;