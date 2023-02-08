import React from 'react';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { BsArrowBarDown, BsInstagram, BsTwitter, BsLinkedin, BsTelephoneInboundFill } from 'react-icons/bs';
import { MdEmail, MdLocationPin } from 'react-icons/md';
import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar';
import './homePage.css'
import me from '../../assets/me.jpeg'
import jose from '../../assets/jose.jpg'


export function HomePage() {
    
    return (
    <div>
      
      <Navbar/>

      {/* WELCOME SECTION */}
      <section className='title-section'>
        <h1>Better Solutions For Your Money</h1>
        <h2>We are developers who are fans of cryptos and we made this amazing wallet called Cryptopals</h2>
        <div className='btn-title'>
          <span id="btn-get-started"><RiMoneyDollarCircleFill className='mb-1 me-2 text-white'/><Link to='/register'>Get Started</Link></span>
          <a href="#why-us" id="btn-why">Why us?</a>
        </div>
      </section>

      {/* WHY US SECTION */}
      <section id='why-us' className="why-us">
        <div className="why-prg">
          <h3>We are not only a platform to save digital money... We also offer <strong className='fst-italic text-info'>Crypto Trading, FastPay, and an easy platform for your parents</strong> 😉</h3>
          <p className='mt-4'>
            Here we have some of the important features of Cryptopals
          </p>
        </div>

        <div className="accordion-list">
          <ul>

            <li>
              <a data-bs-toggle="collapse" className="collapse" data-bs-target="#security"><span>01</span> Security&nbsp; <BsArrowBarDown className="icon-show me-0"/></a>
              <div id="security" className="collapse show" data-bs-parent=".accordion-list">
                <p className='fst-italic'>
                We have one of the most security systems in the world. Our Backend was rigorously developed and reviewed, so you don't have to worry about your money.
                </p>
              </div>
            </li>

            <li>
              <a data-bs-toggle="collapse" data-bs-target="#fastpay" className="collapsed"><span>02</span> FastPay&nbsp; <BsArrowBarDown className="icon-show me-0"/></a>
              <div id="fastpay" className="collapse" data-bs-parent=".accordion-list">
                <p className='fst-italic'>
                  FastPay is an unique feature whose purpose is to provide a fast and trusted way to send money between our users.<sub>There is a fee for using it</sub>
                </p>
              </div>
            </li>

            <li>
              <a data-bs-toggle="collapse" data-bs-target="#taxes" className="collapsed"><span>03</span> &lt;0.002% in taxes &nbsp; <BsArrowBarDown className="icon-show me-0"/></a>
              <div id="taxes" className="collapse" data-bs-parent=".accordion-list">
                <p className='fst-italic'>
                  Our Platform not only provides an excellent service, it also has a cheap tax policy for buying Cryptos to our customers, if you are new in the CryptoWorld our wallet can be the beginning!!
                </p>
              </div>
            </li>

          </ul>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="team">
        <h3>Team</h3>
        <p className='fst-italic fs-4'>Despite the obstacles encountered in development, these two developers managed to create this great tool.</p>

        <div className="member-cards">

          <div className="member">
            <article className='member-details'>
            <div className="pic"><img src={me} className="img-fluid" alt="Andres Contreras Portrait"/></div>
            <div className="member-info">
              <h4>Andres Contreras</h4>
              <span>Developer</span>
              <p>In charge of the Backend and Frontend of Cryptopals</p>
              <div className="social">
                <a href="https://www.instagram.com/andres_066/"  target="blank" className='bg-info'><BsInstagram /></a>
                <a href="https://twitter.com/andresc_066" target="blank" className='bg-info'><BsTwitter /></a>
                <a href="https://www.linkedin.com/in/andresc06/" target="blank" className='bg-info'><BsLinkedin /> </a>
              </div>
            </div>
            </article>
          </div>

          <div className="member">
            <article className='member-details'>
            <div className="pic"><img src={jose} className="img-fluid" alt="Jose Salazar Portrait"/></div>
            <div className="member-info">
              <h4>Jose Salazar</h4>
              <span>Developer</span>
              <p>In charge of the Frontend of Cryptopals</p>
              <div className="social">
                <a href="" target="blank" className='bg-info'><BsInstagram /></a>
                <a href="" target="blank" className='bg-info'><BsTwitter /></a>
                <a href="https://www.linkedin.com/in/jos%C3%A9-andr%C3%A9s-salazar-5b500b241/" target="blank" className='bg-info'><BsLinkedin /> </a>
              </div>
            </div>
            </article>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact">

        <h3>Contact Us</h3>
        <p className='fst-italic fs-4 m-4'>For us is important to maintain the communication between our costumers. That's why you have many ways to contact us, here are the most relevant ones:</p>s

        <div className="contact-card">
          <div className="address">
            <MdLocationPin className='fs-2'/>
            <span className='ms-4'>Location:</span>
            <p className='text-warning'>Bella Vista Av., Maracaibo, VE 4001</p>
          </div>

          <div className="email">
            <MdEmail className='fs-2'/>
            <span className='ms-4'>Email:</span>
            <p className='text-warning'>cryptopalsteam@gmail.com</p>
          </div>

          <div className="phone">
            <BsTelephoneInboundFill className='fs-4'/>
            <span className='ms-4'>Call:</span>
            <p className='text-warning'>+58 412 686 9854</p>
          </div>

          <iframe className='border border-3 border-success' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.766689062762!2d-71.6106944852671!3d10.675209292390235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e899988b4e8c42b%3A0xa8eb84fb4811274f!2sAIRTEK!5e0!3m2!1ses!2sve!4v1664154603534!5m2!1ses!2sve" width="100%" height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>

      <footer className="panel-footer">
          <div className="container">
            <div className="row">
              <div id="testimonials" className="col-sm-12 col-md-6 fst-italic">
                <h5 className='text-center mb-3 text-info'>Testimonials</h5>
                <p className='lh-lg'>"With Cryptopals you can easily exchange between cryptocoins fastly nad with security" <br/>-- Andres Contreras <sub>CEO of Cryptopals</sub></p>
                <p className='lh-lg'>"Amazing web app! Couldn't ask for more security!" <br/>-- Jose Salazar <sub>Client</sub></p>
                <hr className="visible-xs"/>
              </div>
              <div id="address" className="col-xs-6 col-md-6">
                <h5 className='fst-italic mb-3 text-info'>Principal Webpage:</h5>
                <nav className="footer-links">
                <Link to='/home' className='lnk'>Home</Link><br/>
                <Link to='/login' className='lnk'>Login</Link><br/>
                <Link to='/register' className='lnk'>Register new Account</Link><br/>
                <hr className="visible-xs"/>
                </nav>
              </div>
            </div>
            <div className="text-center">&copy; Copyright Cryptopals 2022</div>
          </div>
        </footer>

    </div>
    )
}