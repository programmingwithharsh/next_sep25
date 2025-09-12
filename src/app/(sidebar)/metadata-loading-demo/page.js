export async function generateMetadata({ searchParams }) {
    const query = searchParams?.q ?? '';
    const title = query ? `Metadata & Loading Demo - ${query}` : 'Metadata & Loading Demo';
    const description = query ? `Results for “${query}”` : 'Demo page showing generateMetadata and loading.js in the App Router';
    return {
        title,
        description,
        openGraph: {
            title,
            description
        }
    };
}

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function MetadataLoadingDemoPage({ searchParams }) {
    const q = searchParams?.q ?? '';
    // Simulate slow data fetch to trigger loading.js
    await wait(1200);

    return (
        <div className="container py-3">
            <h2 className="mb-3">generateMetadata + loading.js Demo</h2>
            <p className="text-muted mb-3">This page simulates a slow fetch to show the route segment loader.</p>

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Search Query</h5>
                    <p className="card-text mb-0">q = {q ? <strong>{q}</strong> : <em>(empty)</em>}</p>
                </div>
            </div>

            <div className="alert alert-info mt-3">
                Tip: Try adding <code>?q=nextjs</code> to the URL to see dynamic metadata.
            </div>
        </div>
    );
}



