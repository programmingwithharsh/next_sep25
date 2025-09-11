import Link from 'next/link'

function Home() {
    return (
        <div className="container mt-4">
            <h1>Home Page</h1>
            <p>This demonstrates route prefetching:</p>
            
            {/* Prefetch on hover */}
            <Link href="/lazy-demo" prefetch={true} className="btn btn-primary me-2">
                Prefetch Lazy Demo
            </Link>
            
            {/* No prefetch */}
            <Link href="/products" prefetch={false} className="btn btn-secondary">
                No Prefetch Products
            </Link>
        </div>
    );
}

export default Home;