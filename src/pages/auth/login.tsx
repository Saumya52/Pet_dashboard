import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faEyeSlash, faKey } from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from '../../store/authStore';
import './login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // For demo purposes, using dummy validation
      if (formData.identifier === 'admin' && formData.password === 'admin') {
        login('dummy-token');
        toast.success('Login successful!');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="text-center mb-8">
          <FontAwesomeIcon icon={faUser} className="text-6xl" />
          <h1 className="text-2xl font-bold mt-4">Vet Dashboard Login</h1>
        </div>

        <form onSubmit={handleLogin}>
          <div className="material-input">
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label>Username or Email</label>
          </div>

          <div className="material-input">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label>Password</label>
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            />
          </div>

          <button type="submit" className="btn-three">
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <button className="auth-link mt-4 flex items-center justify-center w-full">
            <FontAwesomeIcon icon={faKey} className="mr-2" />
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
