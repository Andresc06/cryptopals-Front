import Logo from '../../assets/CRYPTOPALS.png';
import './register.css'
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import RegisterForm from "../../components/RegisterForm";


export function Register({setAuth}) {
    
    




    return (
        <div>
            <Navbar />
            <div className="p-5 background-register">
                <div className="card col-sm-6 ro col-lg-3 p-3 mx-auto mt-5">
                    <h1 className="text-center title">Register</h1>
                    <img src={Logo} className='img-fluid mx-auto w-50 mb-0 d-none d-lg-block' alt='CRYPTOPALS logo' />
                    <RegisterForm setAuth={setAuth} />
                    <Link to='/login' className="text-decoration-none loginLink">Have already an account?</Link>
                </div>
            </div>
            <Toaster 
            position="bottom-right"
            reverseOrder={false}
            />
        </div>
    )
}