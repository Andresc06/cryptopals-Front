import Navbar from "../../components/Navbar";
import Logo from '../../assets/CRYPTOPALS.png';
import './login.css';
import toast, { Toaster } from 'react-hot-toast';
import LoginForm from "../../components/LoginForm";


export function Login({setAuth}) {

    return (
        <div>
            <Navbar />
            <div className="background-login">
                <div className="card-form login">
                    <h1 className="title-form">Login</h1>
                    <img src={Logo} id='logo-login' className='img-fluid d-none d-md-block d-lg-block' alt='CRYPTOPALS logo' />
                    <LoginForm setAuth={setAuth} />
                </div>
            </div>
            <Toaster 
            position="bottom-right"
            reverseOrder={false}
            />
        </div>
    )
}