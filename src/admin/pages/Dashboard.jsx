
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Users,
    MessageSquare,
    Clock,
    CheckCircle,
    TrendingUp
} from 'lucide-react';

import { adminService } from '../services/adminService';
import StatCard from '../components/StatCard';

export default function Dashboard() {

    const [data, setData] = useState({
        stats: {
            total: 0,
            new: 0,
            progress: 0,
            closed: 0
        },
        recent: []
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        adminService.dashboard()
            .then(res => {
                // Handle different API response structures
                const responseData = res?.data?.data ?? res?.data ?? res ?? {};

                setData({
                    stats: {
                        total: Number(responseData?.stats?.total ?? 0),
                        new: Number(responseData?.stats?.new ?? 0),
                        progress: Number(responseData?.stats?.progress ?? 0),
                        closed: Number(responseData?.stats?.closed ?? 0)
                    },
                    recent: Array.isArray(responseData?.recent)
                        ? responseData.recent
                        : []
                });
            })
            .catch(err => {
                console.error('Dashboard API error:', err);
                setError('Unable to load dashboard. Please try again.');
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);

    if (loading) {
        return <div className="admin-content"><p>Loading dashboard...</p></div>;
    }

    if (error) {
        return (
            <div className="admin-content">
                <p>{error}</p>
                <button
                    className="gold-button"
                    onClick={() => window.location.reload()}
                >
                    Retry
                </button>
            </div>
        );
    }

    const stats = data.stats;
    const recent = data.recent;

    return (
        <div className="admin-content">

            <div className="page-heading">
                <div>
                    <span>OVERVIEW</span>
                    <h1>Dashboard</h1>
                    <p>Welcome to your NRI enquiry management portal.</p>
                </div>

                <button
                    className="gold-button"
                    onClick={() => navigate('/admin/enquiries')}
                >
                    View All Enquiries
                </button>
            </div>

            <div className="stats-grid">

                <StatCard
                    title="Total Enquiries"
                    value={stats.total}
                    icon={Users}
                    color="#b28a43"
                />

                <StatCard
                    title="New Enquiries"
                    value={stats.new}
                    icon={MessageSquare}
                    color="#3478b8"
                />

                <StatCard
                    title="In Progress"
                    value={stats.progress}
                    icon={Clock}
                    color="#d39b35"
                />

                <StatCard
                    title="Closed Enquiries"
                    value={stats.closed}
                    icon={CheckCircle}
                    color="#31966b"
                />

            </div>

            <div className="dashboard-table">

                <div className="table-heading">
                    <div>
                        <h3>Recent Enquiries</h3>
                        <p>Latest customer requests</p>
                    </div>

                    <TrendingUp color="#b28a43" />
                </div>

                <div className="table-responsive">

                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Customer</th>
                                <th>Email</th>
                                <th>Service</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody>

                            {recent.length === 0 ? (

                                <tr>
                                    <td colSpan="6">
                                        No enquiries available.
                                    </td>
                                </tr>

                            ) : recent.map(item => (

                                <tr key={item.id}>
                                    <td>#{item.id}</td>
                                    <td>{item.name ?? '-'}</td>
                                    <td>{item.email ?? '-'}</td>
                                    <td>{item.service ?? '-'}</td>

                                    <td>
                                        <span className={`status-badge status-${(item.status ?? 'new').toLowerCase().replaceAll(' ', '-')}`}>
                                            {item.status ?? 'New'}
                                        </span>
                                    </td>

                                    <td>
                                        {item.created_at
                                            ? new Date(
                                                item.created_at.replace(' ', 'T')
                                            ).toLocaleDateString()
                                            : '-'}
                                    </td>
                                </tr>

                            ))}

                        </tbody>
                    </table>

                </div>

            </div>

        </div>
    );
}
