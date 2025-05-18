import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faEyeSlash, faKey, faMobileAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    name: '',
    email: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // For demo purposes, using dummy validation
      if (formData.identifier === 'admin' && formData.password === 'password') {
        localStorage.setItem('accessToken', 'dummy-token');
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      // Add your registration logic here
      toast.success('Registration successful! Please login.');
      setIsLogin(true);
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="text-center mb-8">
          <FontAwesomeIcon icon={faUser} className="text-6xl" />
        </div>

        {isLogin ? (
          <>
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
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="auth-link"
                >
                  Register here
                </button>
              </p>
              <button className="auth-link mt-4 flex items-center justify-center w-full">
                <FontAwesomeIcon icon={faKey} className="mr-2" />
                Reset Password
              </button>
            </div>
          </>
        ) : (
          <>
            <form onSubmit={handleRegister}>
              <div className="material-input">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder=" "
                />
                <label>Name</label>
              </div>

              <div className="material-input">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder=" "
                />
                <label>Email</label>
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
              </div>

              <div className="material-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder=" "
                />
                <label>Confirm Password</label>
              </div>

              <button type="submit" className="btn-three">
                Register
              </button>
            </form>

            <div className="mt-6 space-y-4">
              <button className="auth-link flex items-center justify-center w-full">
                <FontAwesomeIcon icon={faMobileAlt} className="mr-2" />
                Verify Phone via OTP
              </button>
              <button className="auth-link flex items-center justify-center w-full">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Email Verification
              </button>
              <p className="text-center">
                Already have an account?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="auth-link"
                >
                  Login here
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;