'use client'
import { useEffect, useState } from 'react'

export default function GeoDemoPage() {
    const [coords, setCoords] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function requestLocation() {
        setError('')
        setLoading(true)
        debugger
        if (!('geolocation' in navigator)) {
            setError('Geolocation is not supported by your browser.')
            setLoading(false)
            return
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude, accuracy } = pos.coords
                setCoords({ latitude, longitude, accuracy })
                setLoading(false)
            },
            (err) => {
                setError(err.message || 'Unable to retrieve your location.')
                setLoading(false)
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        )
    }

    useEffect(() => {
        // Auto request on first load; you can remove if you prefer manual only
        requestLocation()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="container py-3">
            <h2 className="mb-3">Geolocation Demo</h2>
            <div className="card">
                <div className="card-body">
                    <p className="mb-3">This demo uses the browser's Geolocation API.</p>
                    <button className="btn btn-primary" onClick={requestLocation} disabled={loading}>
                        {loading ? 'Fetching location…' : 'Get Current Location'}
                    </button>
                    {error ? (
                        <div className="alert alert-danger mt-3" role="alert">{error}</div>
                    ) : null}
                    {coords ? (
                        <div className="mt-3">
                            <div><strong>Latitude:</strong> {coords.latitude}</div>
                            <div><strong>Longitude:</strong> {coords.longitude}</div>
                            <div className="text-muted"><small>Accuracy: ±{coords.accuracy} meters</small></div>
                            <div className="mt-2">
                                <a className="btn btn-outline-secondary btn-sm me-2" target="_blank" rel="noreferrer" href={`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`}>
                                    Open in Google Maps
                                </a>
                                <a className="btn btn-outline-secondary btn-sm" target="_blank" rel="noreferrer" href={`https://www.openstreetmap.org/?mlat=${coords.latitude}&mlon=${coords.longitude}#map=15/${coords.latitude}/${coords.longitude}`}>
                                    Open in OpenStreetMap
                                </a>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}


