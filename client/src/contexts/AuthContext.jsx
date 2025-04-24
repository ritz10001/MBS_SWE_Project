import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    const fetchUserDetails = async () => {
        try {
            const response = await fetch('http://localhost:5168/api/user/user-details', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUserDetails(data);
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
            setIsAuthenticated(true);
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
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setToken(null);
        setUserId(null);
        setUserDetails(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            userId, 
            token, 
            userDetails,
            login, 
            logout,
            fetchUserDetails
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