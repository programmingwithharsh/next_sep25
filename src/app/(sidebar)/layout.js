import Link from "next/link";

export default function SidebarLayout({ children }) {
    return (
        <div className="container-fluid py-3">
            <div className="d-flex">
                <aside className="sidebar-menu me-3">
                    <div className="list-group list-group-flush">
                        <Link className="list-group-item list-group-item-action" href="/image-demo">1 Image Demo</Link>
                        <Link className="list-group-item list-group-item-action" href="/geo-demo">2 Geo Demo</Link>
                        <Link className="list-group-item list-group-item-action" href="/i18n-demo">3 i18n Demo</Link>
                        <Link className="list-group-item list-group-item-action" href="/logging-demo">4 Logging Demo</Link>
                        <Link className="list-group-item list-group-item-action" href="/prisma-demo">5 Prisma Demo</Link>
                        <Link className="list-group-item list-group-item-action" href="/validation-demo">6 Validation Demo</Link>
                        <Link className="list-group-item list-group-item-action" href="/context-demo">7 Context Demo</Link>
                        <Link className="list-group-item list-group-item-action" href="/rate-limiting-demo">8 Rate Limiting Demo</Link>
                        <Link className="list-group-item list-group-item-action" href="/emotion-demo">9 Emotion Demo</Link>
                        <Link className="list-group-item list-group-item-action" href="/metadata-loading-demo">10 Metadata Loading Demo</Link>
                        <Link className="list-group-item list-group-item-action" href="/ssr-app-demo">11 SSR App Demo</Link>
                        <Link className="list-group-item list-group-item-action" href="/ssg-app-demo">12 SSG Demo</Link>
                    </div>
                </aside>
                <main className="flex-grow-1">
                    {children}
                </main>
            </div>
        </div>
    );
}