export default function Loading() {
    return (
        <div className="container py-5 d-flex justify-content-center">
            <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="mt-2">Loading demo content…</div>
            </div>
        </div>
    );
}



