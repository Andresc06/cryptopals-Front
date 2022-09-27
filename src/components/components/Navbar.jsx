import React from 'react';
import { Link } from "react-router-dom";
import './navbar.css';
import Log from '../assets/nav-bar_crypto.png'



const Navbar = () => {

    return (
        <div>
        <header>
            <nav  className="fixed-top d-flex align-items-center navbar navbar-expand-lg" id='header'>

            <div className="container-fluid">
                
                <div className="logo">
                    <h1 className="text-light"><Link className="nav-link" to='/home'><img src={Log} className="log" alt='CRYPTOPALS logo' /><span className='mt-3 ms-3'>Cryptopals</span></Link></h1>
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="navbar-nav collapse navbar-collapse" id="navbarNavAltMarkup">

                    <Link className="nav-link" to='/home'>Home</Link>

                    <button className='btn btn-primary pt-0 pb-0'>
                    <Link className="nav-link fw-bold" to='/login'>Sign in</Link>
                    </button>

                    <button className='btn btn-success pt-0 pb-0'>
                    <Link className="nav-link fw-bold" to='/register'>Sign up</Link>
                    </button>
                </div>
            </div>
            </nav>
        </header>
        </div>
    )
}

export default Navbar;

