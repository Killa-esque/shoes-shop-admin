import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className='container-fluid'>
          <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation"></button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
              </li>
            </ul>
            <ul className="navbar-nav mt-2 mt-lg-0" style={{ margin: '0 100px' }}>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Vinh
                </a>
                <ul className="dropdown-menu me-4" aria-labelledby="navbarDropdown">
                  <li>
                    <button className="dropdown-item">Logout</button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  );
}

export default Header;
