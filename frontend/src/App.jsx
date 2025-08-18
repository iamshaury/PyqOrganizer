import React, { useState, useEffect } from 'react';
import LoginScreen from './components/auth/LoginScreen';
import OrganizerScreen from './components/organizer/OrganizerScreen';


export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <div className="font-sans antialiased">
            {isAuthenticated ? (
                <OrganizerScreen onLogout={handleLogout} />
            ) : (
                <LoginScreen onLogin={handleLogin} />
            )}
        </div>
    );
}
