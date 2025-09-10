'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UserDashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            router.push('/auth/login');
            return;
        }

        try {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            
            // Verify token is still valid
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
        } catch (err) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/auth/login');
        } finally {
            setLoading(false);
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
                        <h1>User Dashboard</h1>
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
                            <h5>Welcome, {user?.username}!</h5>
                        </div>
                        <div className="card-body">
                            <p className="card-text">
                                This is your user dashboard. You have access to basic user features.
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
                                            <h6 className="card-title">Available Actions</h6>
                                            <ul className="list-unstyled">
                                                <li>✓ View products</li>
                                                <li>✓ Update profile</li>
                                                <li>✓ Basic dashboard access</li>
                                                <li>✗ Admin functions (not available)</li>
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
                                    View Products
                                </a>
                                <a href="/settings/account" className="btn btn-outline-secondary">
                                    Account Settings
                                </a>
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
        </div>
    );
}
