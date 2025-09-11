'use client'
import { useState } from 'react'

function LazyComponent() {
    const [count, setCount] = useState(0)
    
    return (
        <div className="p-4 border rounded">
            <h3>Lazy Loaded Component</h3>
            <p>Count: {count}</p>
            <button 
                onClick={() => setCount(count + 1)}
                className="btn btn-primary"
            >
                Increment
            </button>
        </div>
    )
}

export default LazyComponent
