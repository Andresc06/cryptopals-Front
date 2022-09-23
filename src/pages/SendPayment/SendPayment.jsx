import './sendPayment.css';
import toast, { Toaster } from 'react-hot-toast';
import { SendPaymentForm } from "../../components/SendPaymentForm";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { UserContext } from "../../context/userContext";
import { useContext, useState } from 'react';


export function SendPayment({setAuth}) {

    const [show, setshow] = useState(false);
    const { user } = useContext(UserContext);

    return (
        <div>
            <Sidebar show={show} setshow={setshow} user={user} />
            <div className="p-5 background-sendPayment mt-3">
                <div className="my-5 card card-payment col-sm-6 col-lg-6 p-3 mx-auto">
                    <SendPaymentForm setAuth={setAuth} className="payments"/>
                </div>
            </div>
            <Toaster 
            position="bottom-right"
            reverseOrder={false}
            />
        </div>
    )
}