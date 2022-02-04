import './index.css'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../../static/svg-logo-1.svg'

const Navbar = () => {
  const location = useLocation()

  const closeNavbar = () => {
    document.querySelector('.navbar-toggler').click()
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container navbar-items">
        <Link class="navbar-brand" to="/">
          <img src={logo} style={{ width: '42px', height: '42px' }} />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
                to="/"
                onClick={closeNavbar}>Blog</Link>
            </li>
            <li className="nav-item">
              <Link
                className={location.pathname.includes('/aboutMe') ? 'nav-link active' : 'nav-link'}
                to="/aboutMe"
                onClick={closeNavbar}>O Meni</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Navbar
