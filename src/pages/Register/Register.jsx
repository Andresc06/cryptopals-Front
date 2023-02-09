import './register.css'
import Navbar from "../../components/Navbar";
import toast, { Toaster } from 'react-hot-toast';
import RegisterForm from "../../components/RegisterForm";


export function Register({setAuth}) {
    
    return (
        <div>
            <Navbar />
            <div className="background-register">
                <div className="card-form register">
                    <h1 className="title-form" id='reg-title'>Register</h1>
                    <RegisterForm setAuth={setAuth} />
                </div>
            </div>
            <Toaster 
            position="bottom-right"
            reverseOrder={false}
            />
        </div>
    )
}