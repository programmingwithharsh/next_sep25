'use client'
import Image from 'next/image'

export default function NextImageDemoPage() {
    return (
        <div className="container py-3">
            <h2 className="mb-3">Next.js Image Component Demo</h2>
            <p className="text-muted">Examples: fixed size, responsive, and fill with object-fit.</p>

            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Fixed dimensions</h5>
                            <p className="card-text">Explicit width/height. Optimized and lazy-loaded by default.</p>
                            <Image
                                src="/vercel.svg"
                                alt="Vercel Logo"
                                width={180}
                                height={38}
                                priority
                            />
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Responsive</h5>
                            <p className="card-text">Scales with container using sizes for optimal srcset selection.</p>
                            <Image
                                src="/next.svg"
                                alt="Next.js Logo"
                                width={800}
                                height={160}
                                sizes="(max-width: 768px) 100vw, 400px"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Fill container</h5>
                            <p className="card-text">Image fills the parent; parent must be position:relative.</p>
                            <div style={{ position: 'relative', width: '100%', height: 160, borderRadius: 8, overflow: 'hidden' }}>
                                <Image
                                    src="/globe.svg"
                                    alt="Globe"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4 mt-1">
                <div className="col-md-6">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Multiple images in a grid</h5>
                            <div className="d-flex gap-3 align-items-center flex-wrap">
                                <Image src="/file.svg" alt="File" width={64} height={64} />
                                <Image src="/window.svg" alt="Window" width={64} height={64} />
                                <Image src="/next.svg" alt="Next" width={120} height={24} />
                                <Image src="/vercel.svg" alt="Vercel" width={120} height={24} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Tips</h5>
                            <ul className="mb-0">
                                <li>Use images from <code>public/</code> with a leading slash.</li>
                                <li>For remote images, configure <code>images.remotePatterns</code> in <code>next.config.mjs</code>.</li>
                                <li>Use <code>sizes</code> with responsive images for best performance.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



