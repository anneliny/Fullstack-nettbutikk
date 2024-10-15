
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children, isLoggedIn}) => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';

    return loggedIn ? children : <Navigate to="/min-side" />;
};

export default ProtectedRoute;