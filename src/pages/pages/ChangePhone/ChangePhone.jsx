import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { schemaPhone } from "../../utils/schema";
import { Sidebar } from '../../components/sidebar/Sidebar';
import { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { UserContext } from '../../context/userContext';


export function ChangePhone({setAuth}) {

    let navigate = useNavigate();

    const [show, setshow] = useState(false);
    const { user } = useContext(UserContext);
    
    const [loading, setloading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schemaPhone) });

    

    const onSubmit = async (data, evt, errors) => {

        
        try {

            evt.preventDefault();
            setloading(true);

            const res = await fetch('https://cryptopals-backend.netlify.app/wallet/changephone', {
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

            navigate("/dashboard/orders");


        } catch (error) {

            setloading(false);

            toast("You have changed your phone number successfully!", {
                icon: '📞',
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
            <Sidebar show={show} setshow={setshow} user={user} />
            <div className="p-5 background-forgot">
                <div className="card col-sm-6 so col-lg-3 p-3 mx-auto mt-5">
                    <h1 className="text-center title">Change Phone Number</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <label className="mt-3">Your new phone number</label>
                        
                        {errors.phone && (
                        <span className="text-danger m-0 p-0 mess">
                            {errors.phone.message}
                        </span>
                        )}

                        <input className="form-control my-2" placeholder='+584240000000' {...register('phone')} name='phone' />
                        
                        
                        

                        <div className="d-grid col-9 position-absolute bottom-0 mb-4 start-50 translate-middle-x">
                        <button className="btn btn-success fs-4">
                        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Change Phone Number"}
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
    )
}