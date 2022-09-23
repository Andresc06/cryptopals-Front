import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useState } from "react";
import { schemaLogin } from '../utils/schema';
import { UserContext } from '../context/userContext';

const LoginForm = ({setAuth}) => {

    const [loading, setloading] = useState(false);

    const { getUser } = useContext(UserContext)

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

            const { user } = parseRes;
    
            
            if(parseRes.token) {
                // Se busca el atributo token
                localStorage.setItem("token", parseRes.token);
                localStorage.setItem("email", parseRes.email);
                // Se autoriza el user
                setAuth(true);
                getUser(user);
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
                    fontSize: '22px',
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
                    fontSize: '22px',
                    fontFamily: 'Shadows Into Light'
                },
            });
            toast('Did you verify your account?', {
                icon: '🤔',
                style: {
                    borderRadius: '5px',
                    background: '#fff',
                    color: '#333',
                    fontSize: '22px',
                    fontFamily: 'Shadows Into Light',
                },
            });
        }

        
      };

    return (
        <div>
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
        </div>
    )
}

export default LoginForm;