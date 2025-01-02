import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
// import jwtDecode from "jwt-decode";
import { jwtDecode } from 'jwt-decode';

// Create a context for the authentication state
const AuthContext = createContext();

// Create a provider component to wrap the app and manage authentication state
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem('user'));
    const API_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:7071';

    // Check if the user is already authenticated (e.g., using a token stored in localStorage)
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
    }, [user]);

    // Function to handle user login
    const login = async (userData) => {
        try {
            console.log('response');
            const response = await axios.post(`${API_URL}/user/login`, userData);
            console.log(response, 'response');

            if (response.data?.success) {
                setUser(response?.data?.result);
                localStorage.setItem('user', JSON.stringify(response?.data?.result?.token));

                return { success: true }
            } else {
                throw new Error('Invalid login credentials');
            }
        } catch (error) {
            return {
                message: error?.response?.data?.message || 'Invalid login credentials',
                success: false
            }
        }
    };

    // Function to handle user logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // Provide the authentication state and functions through the context
    const contextValue = {
        user,
        login,
        logout,
        isAuthenticated: user,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access the authentication context
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
