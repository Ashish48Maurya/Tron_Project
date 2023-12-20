import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-transparent" style={{ maxHeight:"50px" }}>
                <div className="container-fluid" style={{ background: "rgba(0,0,0,0)" }}>
                    <a className="navbar-brand fs-4 fw-bolder text-primary" href="#">PayonWeb</a>
                    <button className="navbar-toggler " style={{ "border": "2px solid black" }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-lg-0 fs-5 fw-normal">
                            <li className="nav-item" style={{ "margin-inline": "10px" }}>
                                <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                            </li>
                            <li className="nav-item" style={{ "margin-inline": "10px" }}>
                                <Link className="nav-link active" aria-current="page" to='/private/about'>About Us</Link>
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
<<<<<<< HEAD
                            <button className="btn btn-outline-primary ms-2 fw-semibold" onClick={()=>navigate('/')} type="submit" style={{ maxHeight: "min-content" }}>LogIn</button>
                            <button className="btn btn-outline-success ms-2 fw-semibold" onClick={()=>navigate('/register')} type="submit" style={{ maxHeight: "min-content" }}>SignUp</button>
=======
                            <button className="btn btn-outline-primary ms-2 fw-semibold" type="submit" style={{ maxHeight: "min-content" }} onClick={()=>{navigate('/login')}}>Login</button>
                            <button className="btn btn-outline-success ms-2 fw-semibold" type="submit" style={{ maxHeight: "min-content" }} onClick={()=>{navigate('/register')}}>SignUp</button>
>>>>>>> a758aa3bec8562fc634f0f1c61a4a2b3f1026b0d
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}
