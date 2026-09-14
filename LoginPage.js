import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Task 10 Requirement: Fetch request with content-type and Authorization headers
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('auth-token') || ''}`
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Login successful:", data);
                // Save token for authenticated session states
                sessionStorage.setItem('auth-token', data.token);
                sessionStorage.setItem('username', data.name);
                navigate('/'); // Redirect to landing showcase page
            } else {
                setError(data.error || 'Invalid login credentials.');
            }
        } catch (err) {
            console.error("Connection error during authentication login:", err);
            setError('Unable to reach the authentication server.');
        }
    };

    return (
        <div className="login-container" style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2>Login to GiftLink</h2>
            {error && <div className="error-message" style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email Address:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                    Sign In
                </button>
            </form>
        </div>
    );
}

export default LoginPage;
