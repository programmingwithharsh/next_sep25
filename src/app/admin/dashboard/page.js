'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token'); // get item from localstorage
        const userData = localStorage.getItem('user'); // get item from localstorage

        // debugger
        if (!token || !userData) {
            router.push('/auth/login');
            return;
        }

        try {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            
            // Verify token and check if user is admin
            verifyToken();
        } catch (err) {
            router.push('/auth/login');
        }
    }, [router]);

    const verifyToken = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/auth/verify', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Token verification failed');
            }

            const data = await response.json();
            setUser(data.data.user);

            // Check if user is admin
            if (data.data.user.role !== 'admin') {
                router.push('/user/dashboard');
                return;
            }

            // Load users list
            loadUsers();
        } catch (err) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/auth/login');
        } finally {
            setLoading(false);
        }
    };

    const loadUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/auth/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data.data.users);
            } else {
                setError('Failed to load users');
            }
        } catch (err) {
            setError('Error loading users');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/auth/login');
    };

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>Admin Dashboard</h1>
                        <button 
                            className="btn btn-outline-danger"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h5>Welcome, {user?.username}! (Admin)</h5>
                        </div>
                        <div className="card-body">
                            <p className="card-text">
                                This is your admin dashboard. You have access to all administrative features.
                            </p>
                            
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card bg-light">
                                        <div className="card-body">
                                            <h6 className="card-title">Your Profile</h6>
                                            <p className="card-text">
                                                <strong>Username:</strong> {user?.username}<br/>
                                                <strong>Email:</strong> {user?.email}<br/>
                                                <strong>Role:</strong> {user?.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-md-6">
                                    <div className="card bg-light">
                                        <div className="card-body">
                                            <h6 className="card-title">Admin Privileges</h6>
                                            <ul className="list-unstyled">
                                                <li>✓ View all users</li>
                                                <li>✓ Manage products</li>
                                                <li>✓ System administration</li>
                                                <li>✓ Full dashboard access</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <h6>Quick Actions</h6>
                        </div>
                        <div className="card-body">
                            <div className="d-grid gap-2">
                                <a href="/products" className="btn btn-outline-primary">
                                    Manage Products
                                </a>
                                <button 
                                    className="btn btn-outline-success"
                                    onClick={loadUsers}
                                >
                                    Refresh Users
                                </button>
                                <button 
                                    className="btn btn-outline-info"
                                    onClick={verifyToken}
                                >
                                    Verify Token
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>All Users ({users.length})</h5>
                        </div>
                        <div className="card-body">
                            {users.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Username</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Status</th>
                                                <th>Created</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user) => (
                                                <tr key={user._id}>
                                                    <td>{user.username}</td>
                                                    <td>{user.email}</td>
                                                    <td>
                                                        <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className={`badge ${user.isActive ? 'bg-success' : 'bg-secondary'}`}>
                                                            {user.isActive ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </td>
                                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-muted">No users found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
