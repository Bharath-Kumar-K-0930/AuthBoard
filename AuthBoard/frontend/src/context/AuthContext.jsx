import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const userFromStorage = localStorage.getItem('user');
            return userFromStorage ? JSON.parse(userFromStorage) : null;
        } catch (error) {
            console.error("Error parsing user from local storage:", error);
            return null;
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

    const register = async (userData) => {
        setIsLoading(true);
        setIsError(false);
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/auth/register', userData);
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                setUser(response.data);
            }
        } catch (error) {
            console.error('Registration Error:', error); // Debug log
            setIsError(true);
            setMessage(error.response?.data?.message || error.message);
        }
        setIsLoading(false);
    };

    const login = async (userData) => {
        setIsLoading(true);
        setIsError(false);
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/auth/login', userData);
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                setUser(response.data);
                setIsLoading(false);
                return { success: true };
            }
        } catch (error) {
            console.error('Login Error:', error); // Debug log
            setIsError(true);
            const msg = error.response?.data?.message || error.message;
            setMessage(msg);
            setIsLoading(false);
            return {
                success: false,
                message: msg
            };
        }
        setIsLoading(false);
        return { success: false, message: "Unexpected error" };
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const updateProfile = async (updatedData) => {
        setIsLoading(true);
        try {
            const response = await axios.put('http://127.0.0.1:5000/api/auth/updatedetails', updatedData, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            if (response.data) {
                // Keep the token from the old user object, but update details
                const newUser = { ...user, ...response.data };
                localStorage.setItem('user', JSON.stringify(newUser));
                setUser(newUser);
                return { success: true };
            }
        } catch (error) {
            console.error('Profile Update Error:', error); // Debug log
            return {
                success: false,
                message: error.response?.data?.message || error.message
            };
        }
        setIsLoading(false);
    };

    const uploadPhoto = async (formData) => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/auth/upload-photo', formData, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (response.data) {
                const newUser = { ...user, ...response.data };
                localStorage.setItem('user', JSON.stringify(newUser));
                setUser(newUser);
                return { success: true };
            }
        } catch (error) {
            console.error('Photo Upload Error:', error);
            return {
                success: false,
                message: error.response?.data?.message || error.message
            };
        }
        setIsLoading(false);
    };

    const changePassword = async (passwordData) => {
        setIsLoading(true);
        try {
            await axios.put('http://127.0.0.1:5000/api/auth/change-password', passwordData, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            return { success: true, message: 'Password updated successfully' };
        } catch (error) {
            console.error('Change Password Error:', error);
            return {
                success: false,
                message: error.response?.data?.message || error.message
            };
        }
        setIsLoading(false);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            isError,
            message,
            register,
            login,
            logout,
            updateProfile,
            uploadPhoto,
            changePassword
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
