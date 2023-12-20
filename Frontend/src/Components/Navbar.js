import React from 'react'

export default function Navbar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-transparent">
        <div className="container-fluid">
          <a className="navbar-brand fs-4 fw-bolder text-primary" href="#">PayonWeb</a>
          <button className="navbar-toggler " style={{"border": "2px solid black"}} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon "></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fs-5 fw-normal">
              <li className="nav-item" style={{"margin-inline": "10px"}}>
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item" style={{"margin-inline": "10px"}}>
                <a className="nav-link active" aria-current="page" href="#">About Us</a>
              </li>
              <li className="nav-item" style={{"margin-inline": "10px"}}>
                <a className="nav-link active" aria-current="page" href="#">Contact Us</a>
              </li>
              <li className="nav-item" style={{"margin-inline": "10px"}}>
                <a className="nav-link active" aria-current="page" href="#">History</a>
              </li>
              <li className="nav-item" style={{"margin-inline": "10px"}}>
                <a className="nav-link active" aria-current="page" href="#">Send&Receive</a>
              </li>
            
            </ul>
            <form className="d-flex fs-6 fw-medium ms-auto" role="search">
              <button className="btn btn-outline-primary ms-2 fw-semibold" type="submit">LogIn</button>
              <button className="btn btn-outline-success ms-2 fw-semibold" type="submit">SignUp</button>
            </form>
          </div>
        </div>
      </nav>

    </>
  )
}
