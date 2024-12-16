import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate login and redirect to dashboard immediately
        localStorage.setItem('token', 'dummy-token'); // Set a dummy token for login
        alert("Login successful!"); // Show login success message
        navigate("/dashboard"); // Redirect to dashboard
    }, [navigate]);

    return null; // No need for UI or form
};

export default AdminLogin;
