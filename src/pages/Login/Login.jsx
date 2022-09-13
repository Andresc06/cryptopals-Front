import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Logo from '../../assets/CRYPTOPALS.png';
import { schemaLogin } from '../../utils/schema';
import './login.css';
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


export function Login({setAuth}) {
    
    const [loading, setloading] = useState(false);

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schemaLogin)
    });

    const onSubmit = async(data, evt, errors) => {
    
        try {

            evt.preventDefault();
            setloading(true);

            // se hace el fetch para la comunicacion con el backend
            const res = await fetch("http://localhost:8888/auth/login", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            
    
            // Se parsea y queda como un objeto
            const parseRes = await res.json();
    
            
            if(parseRes.token) {
                // Se busca el atributo token
                localStorage.setItem("token", parseRes.token);
                // Se autoriza el user
                setAuth(true);
            } 

            
            
            else {

                // Se dice que el user no esta autorizado
                setAuth(false);
                seterror(true);
            }

            setloading(false);

            toast('Hello Cryptopal!!', {
                icon: '👋',
                style: {
                    borderRadius: '5px',
                    background: '#333',
                    color: '#fff',
                    fontSize: '20px',
                    fontFamily: 'Shadows Into Light'
                },
            });
            
    
        } catch (errors) {
            setloading(false);
            toast('Password or Email Incorrect', {
                icon: '❌',
                style: {
                    borderRadius: '5px',
                    background: '#fff',
                    color: '#333',
                    fontSize: '20px',
                    fontFamily: 'Shadows Into Light'
                },
            });
            toast('Did you verify your account?', {
                icon: '🤔',
                style: {
                    borderRadius: '5px',
                    background: '#fff',
                    color: '#333',
                    fontSize: '20px',
                    fontFamily: 'Shadows Into Light',
                },
            });
        }

        
      };



    return (
        <div>
            <Navbar />
            <div className="p-5 background-login">
                <div className="card lo col-sm-6 col-lg-3 p-3 mx-auto mt-5">
                    <h1 className="text-center title">Login</h1>
                    <img src={Logo} className='img-fluid mx-auto w-50 mb-4 d-none d-lg-block' alt='CRYPTOPALS logo' />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        
                        <label className="mt-2">Your email</label>
                        <input className="form-control my-2" placeholder='Write your email here' {...register('email')} name='email' />

                        {errors.email && (
                        <p className="text-danger m-0 p-0 mess">
                            {errors.email.message}
                        </p>
                        )}
                        
                        <label className="mt-2">Your password</label>
                        <input className="form-control my-2" type='password' placeholder='Write your password here' {...register('password')} name='password' />
                        
                        {errors.password && (
                        <p className="text-danger m-0 p-0 mess">
                            {errors.password.message}
                        </p>
                        )}

                        <div className="d-grid col-9 position-absolute bottom-0 mb-4 start-50 translate-middle-x">
                        <button className="btn btn-primary fs-4">
                        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Login"}
                        </button>
                        </div>
                    </form>
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