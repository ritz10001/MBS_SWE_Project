import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch } from '../util/apiFetch';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [userRoles, setUserRoles] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const response = await apiFetch(`/api/user/user-details`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserDetails(data);

        const tokenPayload = jwtDecode(token);
        const roles = tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']?.split(',') ?? [];
        setUserRoles(roles);

        setIsAuthenticated(true);
      } else {
        console.error('Failed to fetch user details');
        logout();
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      logout();
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');

    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchUserDetails();
    }
  }, [token]);

  const login = (newToken, newUserId) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('userId', newUserId);
    setToken(newToken);
    setUserId(newUserId);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setToken(null);
    setUserId(null);
    setUserDetails(null);
    setUserRoles(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      userId,
      token,
      userDetails,
      userRoles,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 