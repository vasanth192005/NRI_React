
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockKeyhole, ShieldCheck } from 'lucide-react';
import { adminService } from '../services/adminService';

export default function AdminLogin() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        adminService.getCsrf().catch(() => {
            setError('Unable to connect to the server.');
        });
    }, []);

    async function handleSubmit(e) {

        e.preventDefault();
        setError('');
        setLoading(true);

        try {

            await adminService.login(username, password);

            navigate('/admin/dashboard', {
                replace: true
            });

        } catch (err) {

            setError(
                err.response?.data?.message ||
                'Login failed. Please try again.'
            );

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="admin-login-page">

            <div className="login-card">

                <div className="login-logo">
                    <ShieldCheck size={38} />
                </div>

                <h2>NRI Admin Portal</h2>

                <p>Secure backoffice access</p>

                {error && (
                    <div className="admin-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <label>Username</label>

                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Enter username"
                        autoComplete="username"
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter password"
                        autoComplete="current-password"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        <LockKeyhole size={16} />

                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                </form>

                <small>
                    Secure & Confidential Administration
                </small>

            </div>

        </div>
    );
}
