import React from "react";
import './navbar.css';


const navbar = () => {
    return(
        <div>
            <nav className='navbar navbar-expand-lg bg-white bg-gradient p-3'>
          <div className='container-fluid'>
              <a className='navbar-brand' href='/home'>ProPerties</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>
              <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                  <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                      
                  </ul>
                  <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                    <li className='nav-item mx-1'>
                        <a className='nav-link active' aria-current='page' href='/home'>Home</a>
                    </li>
                    <li className='nav-item mx-1'>
                        <a className='nav-link active' aria-current='page' href='/about'>About</a>
                    </li>
                    <li className='nav-item mx-1'>
                        <a className='nav-link active' aria-current='page' href='/contact'>Contact</a>
                    </li>
                    <li class="nav-item dropdown mx-1">
                          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown
                          </a>
                          <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="login">Login</a></li>
                            <li><a class="dropdown-item" href="signup">Signup</a></li>
                          </ul>
                    </li>
                    <li className='nav-item mx-1'>
                      <a className='nav-link active' aria-current='page' href='/login'>Logout</a>
                    </li>
                  </ul>
              </div>
          </div>
        </nav>
        </div>
    )
}


export default navbar

