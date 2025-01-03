import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../assets/logo.jpg'
const Login = () => {
  const {i18n, t} = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Login attempt with:', { email, password });
      setIsLoading(false);
      window.location.href = '/logs';
    }, 2000);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">
          <div className="logo-background"></div>
          <img src={Logo} alt="AASTU Logo" className="logo" />
        </div>

        <h2>{t('Welcome Back B-57')}</h2>
        <p className="subtitle">{t('Enter_your_credentials_to_access_Logs')}</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">{t('email')}</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m.example@aastu.edu"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">{t('password')}</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span>
                {t('signing_in')}
              </>
            ) : (
              t('sign-in')
            )}
          </button>
        </form>
        <div className="forgot-password">
          <a href="#">{t('forget_password')}</a>
        </div>
        <div className="language-selector">
          <select
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            value={i18n.language}
          >
            <option value="en">🇺🇸 English</option>
            <option value="am">🇪🇹 አማርኛ</option>
          </select>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .login-box {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 10px;
          padding: 40px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .logo-container {
          width: 120px;
          height: 120px;
          margin: 0 auto 30px;
          position: relative;
        }

        .logo-background {
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, #d4af37, #c49b2c);
          border-radius: 50%;
          opacity: 0.2;
          filter: blur(10px);
          animation: pulse 2s infinite;
        }

        .logo {
          position: relative;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        h2 {
          color: #333;
          text-align: center;
          margin-bottom: 10px;
          font-size: 24px;
        }

        .subtitle {
          color: #666;
          text-align: center;
          margin-bottom: 30px;
          font-size: 14px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 5px;
          color: #333;
          font-size: 14px;
        }

        input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
          transition: border-color 0.3s ease;
        }

        input:focus {
          outline: none;
          border-color: #d4af37;
          box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
        }

        button {
          width: 100%;
          padding: 12px;
          background: linear-gradient(45deg, #d4af37, #c49b2c);
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        button:hover {
          opacity: 0.9;
        }

        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s ease-in-out infinite;
          margin-right: 10px;
        }

        .forgot-password {
          text-align: center;
          margin-top: 20px;
        }

        .forgot-password a {
          color: #d4af37;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.3s ease;
        }

        .forgot-password a:hover {
          color: #c49b2c;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.3;
          }
          100% {
            transform: scale(1);
            opacity: 0.2;
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 480px) {
          .login-box {
            padding: 30px;
          }

          .logo-container {
            width: 100px;
            height: 100px;
          }

          h2 {
            font-size: 20px;
          }
        }

        .language-selector {
          position: absolute;
          top: 20px;
          right: 20px;
        }

        .language-selector select {
          padding: 8px 12px;
          background-color: rgba(255, 255, 255, 0.8);
          border: 1px solid #d4af37;
          border-radius: 4px;
          font-size: 14px;
          color: #333;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .language-selector select:hover,
        .language-selector select:focus {
          background-color: #fff;
          border-color: #c49b2c;
          box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Login;

