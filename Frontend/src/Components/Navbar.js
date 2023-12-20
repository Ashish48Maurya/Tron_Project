import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-transparent" style={{ maxHeight:"50px" }}>
                <div className="container-fluid">
                    <a className="navbar-brand fs-4 fw-bolder text-primary" href="#">PayonWeb</a>
                    <button className="navbar-toggler " style={{ "border": "2px solid black" }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-lg-0 fs-5 fw-normal">
                            <li className="nav-item" style={{ "margin-inline": "10px" }}>
                                <Link className="nav-link active" aria-current="page" to='/home'>Home</Link>
                            </li>
                            <li className="nav-item" style={{ "margin-inline": "10px" }}>
                                <Link className="nav-link active" aria-current="page" to='/about'>About Us</Link>
                            </li>
                            <li className="nav-item" style={{ "margin-inline": "10px" }}>
                                <Link className="nav-link active" aria-current="page" to='/private/contact'>Contact Us</Link>
                            </li>
                            <li className="nav-item" style={{ "margin-inline": "10px" }}>
                                <Link className="nav-link active" aria-current="page" to='/private/history'>History</Link>
                            </li>
                            <li className="nav-item" style={{ "margin-inline": "10px" }}>
                                <Link className="nav-link active" aria-current="page" to='/private/payment'>Send&Receive</Link>
                            </li>

                        </ul>
                        <form className="d-flex fs-6 fw-medium ms-auto">
                            <button className="btn btn-outline-primary ms-2 fw-semibold" type="submit" style={{ maxHeight: "min-content" }}>LogIn</button>
                            <button className="btn btn-outline-success ms-2 fw-semibold" type="submit" style={{ maxHeight: "min-content" }}>SignUp</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}
