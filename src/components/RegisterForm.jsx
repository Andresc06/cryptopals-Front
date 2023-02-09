import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";
import { schema } from '../utils/schema';
import { Link } from 'react-router-dom';

const RegisterForm = ({setAuth}) => {

    const [loading, setloading] = useState(false);

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async(data, evt, errors) => {
    
        try {
    
            evt.preventDefault();

            setloading(true);

            // se hace el fetch para la comunicacion con el backend
            const res = await fetch("https://cryptopals-backend.netlify.app/auth/register", {
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
        <form onSubmit={handleSubmit(onSubmit)}>
                        
                        <label className="label-form">Your email</label>
                        <input className="form-control" placeholder='Write your email here' {...register('email')} name='email' />

                        {errors.email && (
                        <p className="text-danger my-2">
                            {errors.email.message}
                        </p>
                        )}
                        
                        <label className="label-form">Your password</label>
                        <input className="form-control" type='password' placeholder='Write your password here (min 8 char.)' {...register('password')} name='password' />
                        
                        {errors.password && (
                        <p className="text-danger my-2">
                            {errors.password.message}
                        </p>
                        )}

                        <label className="label-form">Your Username</label>
                        <input className="form-control" placeholder='Write your full name here' {...register('name')} name='name' />
                        
                        {errors.name && (
                        <p className="text-danger my-2">
                            {errors.name.message}
                        </p>
                        )}

                        <label className="label-form">Your Phone Number <sub>Ex: +017894561234</sub></label>
                        <input className="form-control" placeholder='+01XXXXXXXXXX' {...register('phone')} name='phone' />
                        
                        {errors.phone && (
                        <p className="text-danger my-2">
                            {errors.phone.message}
                        </p>
                        )}

                        <Link to='/login' className="text-decoration-none loginLink">Have already an account?</Link>

                        <div className="center-btn">
                        <button className="btn btn-warning submit-btn">
                        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Register"}
                        </button>
                        </div>
            </form>
        </div>
    )
}

export default RegisterForm;