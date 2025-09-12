'use client'
import { useState } from 'react'

export default function LoggingDemo() {
    const [logs, setLogs] = useState([])

    // Simple logging functions
    const logInfo = (message) => {
        const log = { level: 'INFO', message, timestamp: new Date().toISOString() }
        setLogs(prev => [...prev, log])
        console.log(`[INFO] ${message}`)
    }

    const logError = (message) => {
        const log = { level: 'ERROR', message, timestamp: new Date().toISOString() }
        setLogs(prev => [...prev, log])
        console.error(`[ERROR] ${message}`)
    }

    const logWarning = (message) => {
        const log = { level: 'WARNING', message, timestamp: new Date().toISOString() }
        setLogs(prev => [...prev, log])
        console.warn(`[WARNING] ${message}`)
    }

    const clearLogs = () => {
        setLogs([])
    }

    return (
        <div className="container mt-4">
            <h1>Logging Demo</h1>
            <p>Simple logging example with different levels</p>

            {/* Logging Buttons */}
            <div className="mb-4">
                <button 
                    onClick={() => logInfo('User clicked info button')}
                    className="btn btn-info me-2"
                >
                    Log Info
                </button>
                <button 
                    onClick={() => logWarning('This is a warning message')}
                    className="btn btn-warning me-2"
                >
                    Log Warning
                </button>
                <button 
                    onClick={() => logError('An error occurred')}
                    className="btn btn-danger me-2"
                >
                    Log Error
                </button>
                <button 
                    onClick={clearLogs}
                    className="btn btn-secondary"
                >
                    Clear Logs
                </button>
            </div>

            {/* Logs Display */}
            <div className="card">
                <div className="card-body">
                    <h3>Logs ({logs.length})</h3>
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {logs.map((log, index) => (
                            <div 
                                key={index} 
                                className={`p-2 mb-1 border-start border-4 ${
                                    log.level === 'ERROR' ? 'border-danger bg-danger bg-opacity-10' :
                                    log.level === 'WARNING' ? 'border-warning bg-warning bg-opacity-10' :
                                    'border-info bg-info bg-opacity-10'
                                }`}
                            >
                                <div className="d-flex justify-content-between">
                                    <span className={`badge ${
                                        log.level === 'ERROR' ? 'bg-danger' :
                                        log.level === 'WARNING' ? 'bg-warning' :
                                        'bg-info'
                                    }`}>
                                        {log.level}
                                    </span>
                                    <small className="text-muted">{log.timestamp}</small>
                                </div>
                                <div className="mt-1">{log.message}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Logging Code Examples */}
            <div className="mt-4">
                <h4>Logging Code Examples:</h4>
                <pre className="bg-light p-3">
{`// Simple logging functions
const logInfo = (message) => {
  console.log(\`[INFO] \${message}\`)
}

const logError = (message) => {
  console.error(\`[ERROR] \${message}\`)
}

const logWarning = (message) => {
  console.warn(\`[WARNING] \${message}\`)
}

// Usage
logInfo('User logged in')
logWarning('API rate limit approaching')
logError('Database connection failed')`}
                </pre>
            </div>
        </div>
    )
}
