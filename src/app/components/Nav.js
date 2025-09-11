'use client'
import Link from "next/link";

function Nav() {
    return (<nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
            <Link className="navbar-brand" href="/">Dashboard</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" href="/add-product">Add Product</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/products">Products</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/title">Title</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/core-bootstrap">Core Bootstrap</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/admin/dashboard">Admin Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/user/dashboard">User Dashboard</Link>
                    </li>
                </ul>
                <form className="d-flex" role="search">
                    <Link className="btn btn-outline-light" href="/auth/register">Register</Link>
                    <Link className="btn btn-outline-light" href="/auth/login">Login</Link>
                </form>
            </div>
        </div>
    </nav>);
}

export default Nav;