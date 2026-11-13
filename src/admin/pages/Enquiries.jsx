
import { useCallback, useEffect, useState } from 'react';

import {
    Search,
    Eye,
    RefreshCw,
    X,
    Mail,
    Phone,
    MapPin,
    CalendarDays,
    FileText
} from 'lucide-react';

import { adminService } from '../services/adminService';

const statuses = [
    'New',
    'Contacted',
    'In Progress',
    'Closed'
];

// Safely format date
const formatDate = (date) => {
    if (!date) return '-';

    const parsedDate = new Date(
        String(date).replace(' ', 'T')
    );

    return isNaN(parsedDate.getTime())
        ? '-'
        : parsedDate.toLocaleDateString();
};

// Safely display null or empty values
const displayValue = (value) => {
    return value !== null && value !== undefined && value !== ''
        ? value
        : '-';
};

// Normalize API response
const getResponseBody = (response) => {
    return response?.data ?? response ?? {};
};

export default function Enquiries() {

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(1);

    const [pagination, setPagination] = useState({
        page: 1,
        total: 0,
        totalPages: 1
    });

    const [selected, setSelected] = useState(null);

    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');

    const loadEnquiries = useCallback(async () => {

        setLoading(true);
        setError('');

        try {

            const response = await adminService.enquiries({
                page,
                limit: 10,
                search,
                status
            });

            const body = getResponseBody(response);

            const responseData = Array.isArray(body?.data)
                ? body.data
                : Array.isArray(body)
                    ? body
                    : [];

            const paginationData = body?.pagination ?? {};

            setItems(responseData);

            setPagination({
                page: Number(paginationData?.page ?? page),
                total: Number(paginationData?.total ?? 0),
                totalPages: Math.max(
                    1,
                    Number(paginationData?.totalPages ?? 1)
                )
            });

        } catch (err) {

            console.error('Enquiries API error:', err);

            setItems([]);
            setPagination({
                page: 1,
                total: 0,
                totalPages: 1
            });

            setError('Unable to load enquiries.');

        } finally {
            setLoading(false);
        }

    }, [page, search, status]);

    useEffect(() => {
        loadEnquiries();
    }, [loadEnquiries]);

    async function viewDetails(id) {

        try {

            const response = await adminService.enquiryDetails(id);
            const body = getResponseBody(response);

            const details = body?.data ?? body;

            if (!details || typeof details !== 'object' || Array.isArray(details)) {
                throw new Error('Invalid enquiry details response');
            }

            setSelected(details);

        } catch (err) {

            console.error('Enquiry details error:', err);
            alert('Unable to load enquiry details');

        }
    }

    async function updateStatus(id, newStatus) {

        setUpdating(true);

        try {

            await adminService.updateStatus(id, newStatus);

            setSelected(previous =>
                previous?.id === id
                    ? { ...previous, status: newStatus }
                    : previous
            );

            await loadEnquiries();

        } catch (err) {

            console.error('Status update error:', err);
            alert('Status update failed');

        } finally {
            setUpdating(false);
        }
    }

    return (
        <div className="admin-content">

            <div className="page-heading">

                <div>
                    <span>MANAGEMENT</span>
                    <h1>Customer Enquiries</h1>
                    <p>Manage and track all NRI customer requests.</p>
                </div>

                <button
                    className="refresh-button"
                    onClick={loadEnquiries}
                    disabled={loading}
                >
                    <RefreshCw size={17} />
                    Refresh
                </button>

            </div>

            <div className="filter-panel">

                <div className="search-box">

                    <Search size={18} />

                    <input
                        placeholder="Search name, email or phone..."
                        value={search}
                        onChange={e => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />

                </div>

                <select
                    value={status}
                    onChange={e => {
                        setStatus(e.target.value);
                        setPage(1);
                    }}
                >
                    <option value="">All Status</option>

                    {statuses.map(s => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}

                </select>

            </div>

            {error && (
                <div className="admin-error">
                    {error}
                </div>
            )}

            <div className="dashboard-table">

                <div className="table-heading">

                    <div>
                        <h3>Enquiry Records</h3>
                        <p>
                            {pagination.total} total records
                        </p>
                    </div>

                </div>

                <div className="table-responsive">

                    <table>

                        <thead>
                            <tr>
                                <th>Enquiry ID</th>
                                <th>Customer</th>
                                <th>Contact</th>
                                <th>Service</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {loading ? (

                                <tr>
                                    <td colSpan="7">
                                        Loading...
                                    </td>
                                </tr>

                            ) : items.length === 0 ? (

                                <tr>
                                    <td colSpan="7">
                                        No enquiries found.
                                    </td>
                                </tr>

                            ) : items.map((item, index) => {

                                const itemStatus = item?.status ?? 'New';

                                return (
                                    <tr key={item?.id ?? index}>

                                        <td>
                                            #{displayValue(item?.id)}
                                        </td>

                                        <td>
                                            <strong>
                                                {displayValue(item?.name)}
                                            </strong>

                                            <small className="table-sub">
                                                {displayValue(item?.country)}
                                            </small>
                                        </td>

                                        <td>
                                            {displayValue(item?.email)}

                                            <small className="table-sub">
                                                {displayValue(item?.phone)}
                                            </small>
                                        </td>

                                        <td>
                                            {displayValue(item?.service)}
                                        </td>

                                        <td>
                                            {formatDate(item?.created_at)}
                                        </td>

                                        <td>

                                            <select
                                                className="status-select"
                                                value={itemStatus}
                                                disabled={updating}
                                                onChange={e =>
                                                    updateStatus(
                                                        item.id,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                {statuses.map(s => (
                                                    <option key={s} value={s}>
                                                        {s}
                                                    </option>
                                                ))}

                                            </select>

                                        </td>

                                        <td>

                                            <button
                                                className="view-button"
                                                onClick={() => viewDetails(item.id)}
                                                aria-label="View enquiry"
                                            >
                                                <Eye size={17} />
                                            </button>

                                        </td>

                                    </tr>
                                );
                            })}

                        </tbody>

                    </table>

                </div>

                <div className="pagination">

                    <span>
                        Page {pagination.page} of {pagination.totalPages}
                    </span>

                    <div>

                        <button
                            disabled={page <= 1 || loading}
                            onClick={() => setPage(p => p - 1)}
                        >
                            Previous
                        </button>

                        <button
                            disabled={
                                page >= pagination.totalPages || loading
                            }
                            onClick={() => setPage(p => p + 1)}
                        >
                            Next
                        </button>

                    </div>

                </div>

            </div>

            {selected && (

                <div
                    className="modal-overlay"
                    onMouseDown={e => {
                        if (e.target === e.currentTarget) {
                            setSelected(null);
                        }
                    }}
                >

                    <div
                        className="enquiry-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="enquiry-title"
                    >

                        <div className="modal-header">

                            <div>
                                <span>
                                    ENQUIRY #{displayValue(selected.id)}
                                </span>

                                <h2 id="enquiry-title">
                                    {displayValue(selected.name)}
                                </h2>
                            </div>

                            <button
                                onClick={() => setSelected(null)}
                                aria-label="Close details"
                            >
                                <X />
                            </button>

                        </div>

                        <div className="modal-body">

                            <div className="detail-item">
                                <Mail size={18} />

                                <div>
                                    <small>Email</small>
                                    <strong>
                                        {displayValue(selected.email)}
                                    </strong>
                                </div>
                            </div>

                            <div className="detail-item">
                                <Phone size={18} />

                                <div>
                                    <small>Phone</small>
                                    <strong>
                                        {displayValue(selected.phone)}
                                    </strong>
                                </div>
                            </div>

                            <div className="detail-item">
                                <MapPin size={18} />

                                <div>
                                    <small>Country / City</small>
                                    <strong>
                                        {displayValue(selected.country)} / {displayValue(selected.city)}
                                    </strong>
                                </div>
                            </div>

                            <div className="detail-item">
                                <CalendarDays size={18} />

                                <div>
                                    <small>Submitted</small>
                                    <strong>
                                        {formatDate(selected.created_at)}
                                    </strong>
                                </div>
                            </div>

                            <div className="detail-item">
                                <FileText size={18} />

                                <div>
                                    <small>Requested service</small>
                                    <strong>
                                        {displayValue(selected.service)}
                                    </strong>
                                </div>
                            </div>

                            <div className="requirement-box">
                                <h4>Customer Requirement</h4>

                                <p>
                                    {displayValue(selected.description)}
                                </p>
                            </div>

                            <label>Update Enquiry Status</label>

                            <select
                                value={selected.status ?? 'New'}
                                disabled={updating}
                                onChange={e =>
                                    updateStatus(
                                        selected.id,
                                        e.target.value
                                    )
                                }
                            >
                                {statuses.map(s => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}

                            </select>

                            {selected.email && (
                                <a
                                    className="gold-button contact-customer"
                                    href={`mailto:${encodeURIComponent(selected.email)}?subject=${encodeURIComponent('Regarding your NRI enquiry #' + selected.id)}`}
                                >
                                    <Mail size={16} />
                                    Reply to Customer
                                </a>
                            )}

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}
