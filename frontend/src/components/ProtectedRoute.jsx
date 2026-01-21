import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = () => {
    const { user } = useContext(AuthContext);

    // If no user, redirect to login
    // Note: In a real app, checking token expiry might be needed
    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
