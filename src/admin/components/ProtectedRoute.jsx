
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { adminService } from '../services/adminService';

export default function ProtectedRoute() {

    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {

        let active = true;

        adminService.me()
            .then(() => {
                if (active) setAuthenticated(true);
            })
            .catch(() => {
                if (active) setAuthenticated(false);
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };

    }, []);

    if (loading) {
        return <div className="admin-loading">Checking login...</div>;
    }

    return authenticated
        ? <Outlet />
        : <Navigate to="/admin/login" replace />;
}
