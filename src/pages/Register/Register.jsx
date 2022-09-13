import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../utils/schema';
import { useState } from "react";
import Logo from '../../assets/CRYPTOPALS.png';
import './register.css'
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


export function Register({setAuth}) {
    
    const [loading, setloading] = useState(false);

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async(data, evt, errors) => {
    
        try {
    
            evt.preventDefault();

            setloading(true);

            // se hace el fetch para la comunicacion con el backend
            const res = await fetch("http://localhost:8888/auth/register", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
            });
    
            // Se parsea y queda como un objeto
            const parseRes = await res.json();
                
            if(parseRes.error) {
                seterror(true)
            }

            setloading(false);
            toast('Unsuccessful. Maybe you are already registered', {
                icon: '❌',
                style: {
                    borderRadius: '5px',
                    background: '#fff',
                    color: '#333',
                    fontSize: '20px',
                    fontFamily: 'Shadows Into Light'
                },
            });
    
        } catch (error) {
          toast('Sucessful!! We sent you an email to validate your account!', {
            icon: '📩',
            style: {
                borderRadius: '5px',
                background: '#fff',
                color: '#333',
                fontSize: '20px',
                fontFamily: 'Shadows Into Light'
            },
        });
          setloading(false);
        }
    }




    return (
        <div>
            <Navbar />
            <div className="p-5 background-register">
                <div className="card col-sm-6 ro col-lg-3 p-3 mx-auto mt-5">
                    <h1 className="text-center title">Register</h1>
                    <img src={Logo} className='img-fluid mx-auto w-50 mb-0 d-none d-lg-block' alt='CRYPTOPALS logo' />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        
                        <label className="mt-2">Your email</label>
                        <input className="form-control my-2" placeholder='Write your email here' {...register('email')} name='email' />

                        {errors.email && (
                        <p className="text-danger m-0 p-0 mess">
                            {errors.email.message}
                        </p>
                        )}
                        
                        <label className="mt-2">Your password</label>
                        <input className="form-control my-2" type='password' placeholder='Write your password here (min 8 char.)' {...register('password')} name='password' />
                        
                        {errors.password && (
                        <p className="text-danger m-0 p-0 mess">
                            {errors.password.message}
                        </p>
                        )}

                        <label className="mt-2">Your Full Name</label>
                        <input className="form-control my-2" placeholder='Write your full name here' {...register('name')} name='name' />
                        
                        {errors.name && (
                        <p className="text-danger m-0 p-0 mess">
                            {errors.name.message}
                        </p>
                        )}

                        <div className="d-grid col-9 position-absolute bottom-0 mb-4 start-50 translate-middle-x">
                        <button className="btn btn-warning fs-4">
                        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Register"}
                        </button>
                        </div>
                    </form>
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