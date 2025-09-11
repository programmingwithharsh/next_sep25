'use client'
import { useState, lazy, Suspense } from 'react'

// Lazy load the component
const LazyComponent = lazy(() => import('../components/LazyComponent'))

export default function LazyDemo() {
    const [showLazy, setShowLazy] = useState(false)

    return (
        <div className="container mt-4">
            <h1>Lazy Loading Demo</h1>
            
            <button 
                onClick={() => setShowLazy(!showLazy)}
                className="btn btn-success mb-3"
            >
                {showLazy ? 'Hide' : 'Show'} Lazy Component
            </button>

            {showLazy && (
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyComponent />
                </Suspense>
            )}
        </div>
    )
}
