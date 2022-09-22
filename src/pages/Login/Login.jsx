import Navbar from "../../components/Navbar";
import Logo from '../../assets/CRYPTOPALS.png';
import './login.css';
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import LoginForm from "../../components/LoginForm";


export function Login({setAuth}) {

    return (
        <div>
            <Navbar />
            <div className="p-5 background-login">
                <div className="card lo col-sm-6 col-lg-3 p-3 mx-auto mt-5">
                    <h1 className="text-center title">Login</h1>
                    <img src={Logo} className='img-fluid mx-auto w-50 mb-4 d-none d-lg-block' alt='CRYPTOPALS logo' />
                    <LoginForm setAuth={setAuth} />
                    <Link to='/forgotPassword' className="text-decoration-none text-danger">Forgot your password?</Link>
                    <Link to='/register' className="text-decoration-none text-warning">Don't have an account?</Link>
                </div>
            </div>
            <Toaster 
            position="bottom-right"
            reverseOrder={false}
            />
        </div>
    )
}