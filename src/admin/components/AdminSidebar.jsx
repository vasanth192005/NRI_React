
import {
    LayoutDashboard,
    MessageSquare,
    LogOut,
    ShieldCheck
} from 'lucide-react';

import { NavLink, useNavigate } from 'react-router-dom';
import { adminService } from '../services/adminService';

export default function AdminSidebar() {

    const navigate = useNavigate();

    async function handleLogout() {

        try {

            await adminService.logout();

            navigate('/admin/login', {
                replace: true
            });

        } catch {
            alert('Unable to logout. Please try again.');
        }
    }

    return (
        <aside className="admin-sidebar">

            <div className="admin-brand">
                <ShieldCheck size={28} />

                <div>
                    <strong>NRI PROPERTY</strong>
                    <small>ADMIN PORTAL</small>
                </div>
            </div>

            <div className="sidebar-label">
                MAIN MENU
            </div>

            <nav>

                <NavLink to="/admin/dashboard">
                    <LayoutDashboard size={19} />
                    Dashboard
                </NavLink>

                <NavLink to="/admin/enquiries">
                    <MessageSquare size={19} />
                    Enquiries
                </NavLink>

            </nav>

            <div className="sidebar-bottom">

                <button onClick={handleLogout}>
                    <LogOut size={18} />
                    Logout
                </button>

            </div>

        </aside>
    );
}
