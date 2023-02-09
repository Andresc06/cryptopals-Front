import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from "react";
import Navbar from "../../components/Navbar";
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaLogin } from '../../utils/schema';
import toast, { Toaster } from 'react-hot-toast';
import './forgotPassword.css';

export function ForgotPassword() {

    const [loading, setloading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schemaLogin) });

    

    const onSubmit = async (data, evt, errors) => {

        
        try {

            evt.preventDefault();
            setloading(true);

            const res = await fetch('https://cryptopals-backend.netlify.app/auth/changePassword', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });

            const parseRes = await res.json();
                
            if(parseRes.error) {
                seterror(true)
            }

            setloading(false);

            toast('Error with the server', {
                icon: '❌',
                style: {
                    borderRadius: '5px',
                    background: '#333',
                    color: '#fff',
                    fontSize: '20px',
                    fontFamily: 'Shadows Into Light'
                },
            });


        } catch (error) {

            setloading(false);

            toast("If your email is in our DB we've sent you a link", {
                icon: '📩',
                style: {
                    borderRadius: '5px',
                    background: '#333',
                    color: '#fff',
                    fontSize: '20px',
                    fontFamily: 'Shadows Into Light'
                }

            });

        }
    };
    return (
        <div>
            <Navbar />
            <div className="p-5 background-forgot">
                <div className="card-change p-2">
                    <h3 className="title-forgot">¿Olvidaste tu contraseña?</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        
                        <label>Email</label>
                        {errors.email && 
                        <span className="text-danger mess">
                            {errors.email.message}
                        </span>}
                        <input className="form-control my-2" {...register('email')} placeholder='Write your email here' />
                        
                        
                        
                        
                        <label className="mt-3">Your new password</label>
                        {errors.password && (
                        <span className="text-danger mess">
                            {errors.password.message}
                        </span>
                        )}
                        <br/>
                        <small className='small text-info'>Remember that it is private for your security</small>
                        <input className="form-control my-2" type='password' placeholder='Write your password here' {...register('password')} name='password' />
                        
                        
                        

                        <div className="center-btn">
                        <button className="btn btn-light fs-4 fw-bold fst-italic submit-btn">
                        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Change Password"}
                        </button>
                        </div>
                    </form>
                </div>
            </div>

            <Toaster 
            position="bottom-right"
            reverseOrder={false}
            />
        </div>
    );
}
