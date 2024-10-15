import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';  // Import PropTypes

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchUser(token);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const res = await axios.get('/api/client/profile', {
        headers: { 'x-auth-token': token },
      });
      setUser(res.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const login = async (email, password) => {
    const res = await axios.post('/api/client/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setIsAuthenticated(true);
    fetchUser(res.data.token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Add PropTypes validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
