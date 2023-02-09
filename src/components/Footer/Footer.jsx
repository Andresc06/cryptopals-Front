import React from 'react';
import { Link } from "react-router-dom";
import './footer.css'


const Footer = () => {

    return (
        <footer className="panel-footer">
		<div className="container">
	      <div className="row">

          <div id="testimonials" class="col-sm-12 col-md-6 fst-italic">
            <h5 className='text-center mb-3 text-info'>Testimonials</h5>
	          <p className='lh-lg'>"With Cryptopals you can easily exchange between cryptocoins fastly nad with security" <br/>-- Andres Contreras <sub>CEO of Cryptopals</sub></p>
	          <p className='lh-lg'>"Amazing web app! Couldn't ask for more security!" <br/>-- Jose Salazar <sub>Client</sub></p>
	          <hr className="visible-xs"/>
	      </div>
	        <div id="address" className="col-xs-6 col-md-3">
	          <h5 className='fst-italic mb-3 text-info'>Principal Webpage:</h5>
	          <nav className="footer-links">
	          <Link to='/home' className='lnk'>Home</Link><br/>
	          <Link to='/login' className='lnk'>Login</Link><br/>
	          <Link to='/register' className='lnk'>Register new Account</Link><br/>
	          <hr className="visible-xs"/>
              </nav>
	        </div>
	        <div id="links" class="col-xs-6 col-md-3">
	        <h5 className='fst-italic mb-3 text-info'>Useful Links:</h5>
	          <nav className="footer-links">
	          <Link to='/dashboard/loadAccount' className='lnk'>Load Wallet</Link><br/>
	          <Link to='/dashboard/order' className='lnk'>Buy/Sell Cryptos</Link><br/>
	          <Link to='/dashboard/sendPayment' className='lnk'>Send Payment</Link><br/>
	          <Link to='/dashboard/movements' className='lnk'>Movements</Link>
	          <hr className="visible-xs"/>
	          </nav>
	        </div>
	      </div>
	      <div class="text-center">&copy; Copyright Cryptopals 2022</div>
	       
    	  </div>
    </footer>
    )
}

export default Footer;

