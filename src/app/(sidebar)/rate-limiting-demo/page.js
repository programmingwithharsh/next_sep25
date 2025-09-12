'use client'
import { useState, useRef } from 'react'

export default function RateLimitingDemo() {
    const [requests, setRequests] = useState([])
    const [isBlocked, setIsBlocked] = useState(false)
    const requestCount = useRef(0)
    const lastRequestTime = useRef(0)

    // Simple rate limiting: max 5 requests per 10 seconds
    const makeRequest = () => {
        const now = Date.now()
        const timeDiff = now - lastRequestTime.current

        // Reset counter if more than 10 seconds have passed
        if (timeDiff > 10000) {
            requestCount.current = 0
        }

        // Check if rate limit exceeded
        if (requestCount.current >= 5) {
            setIsBlocked(true)
            setRequests(prev => [...prev, {
                id: Date.now(),
                status: 'BLOCKED',
                message: 'Rate limit exceeded! Wait 10 seconds.',
                timestamp: new Date().toISOString()
            }])
            return
        }

        // Make request
        requestCount.current += 1
        lastRequestTime.current = now
        setIsBlocked(false)

        setRequests(prev => [...prev, {
            id: Date.now(),
            status: 'SUCCESS',
            message: `Request ${requestCount.current} successful`,
            timestamp: new Date().toISOString()
        }])
    }

    const resetLimiter = () => {
        requestCount.current = 0
        lastRequestTime.current = 0
        setIsBlocked(false)
        setRequests([])
    }

    return (
        <div className="container mt-4">
            <h1>API Rate Limiting Demo</h1>
            <p>Simple rate limiting: max 5 requests per 10 seconds</p>

            {/* Controls */}
            <div className="mb-4">
                <button 
                    onClick={makeRequest}
                    disabled={isBlocked}
                    className={`btn me-2 ${isBlocked ? 'btn-danger' : 'btn-primary'}`}
                >
                    {isBlocked ? 'Rate Limited' : 'Make Request'}
                </button>
                <button 
                    onClick={resetLimiter}
                    className="btn btn-secondary"
                >
                    Reset
                </button>
            </div>

            {/* Status */}
            <div className="alert alert-info">
                <strong>Status:</strong> {requestCount.current}/5 requests used
                {isBlocked && <span className="text-danger"> - BLOCKED!</span>}
            </div>

            {/* Requests Log */}
            <div className="card">
                <div className="card-body">
                    <h5>Request Log ({requests.length})</h5>
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {requests.map(request => (
                            <div 
                                key={request.id} 
                                className={`p-2 mb-2 border-start border-4 ${
                                    request.status === 'SUCCESS' ? 'border-success bg-success bg-opacity-10' :
                                    'border-danger bg-danger bg-opacity-10'
                                }`}
                            >
                                <div className="d-flex justify-content-between">
                                    <span className={`badge ${
                                        request.status === 'SUCCESS' ? 'bg-success' : 'bg-danger'
                                    }`}>
                                        {request.status}
                                    </span>
                                    <small className="text-muted">{request.timestamp}</small>
                                </div>
                                <div className="mt-1">{request.message}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Code Examples */}
            <div className="mt-4">
                <h4>Rate Limiting Code Examples:</h4>
                <div className="row">
                    <div className="col-md-6">
                        <h5>Simple Rate Limiter</h5>
                        <pre className="bg-light p-3">
{`const requestCount = useRef(0)
const lastRequestTime = useRef(0)

const makeRequest = () => {
  const now = Date.now()
  const timeDiff = now - lastRequestTime.current

  // Reset counter if more than 10 seconds
  if (timeDiff > 10000) {
    requestCount.current = 0
  }

  // Check rate limit
  if (requestCount.current >= 5) {
    // Block request
    return
  }

  // Make request
  requestCount.current += 1
  lastRequestTime.current = now
}`}
                        </pre>
                    </div>
                    <div className="col-md-6">
                        <h5>Server-side Rate Limiting</h5>
                        <pre className="bg-light p-3">
{`// Express.js example
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many requests'
})

app.use('/api/', limiter)`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}
