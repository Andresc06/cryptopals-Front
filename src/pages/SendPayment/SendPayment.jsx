import './sendPayment.css';
import toast, { Toaster } from 'react-hot-toast';
import { SendPaymentForm } from "../../components/SendPaymentForm";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { UserContext } from "../../context/userContext";
import { useContext, useState } from 'react';
import Footer from '../../components/Footer/Footer';


export function SendPayment({setAuth}) {

    const [show, setshow] = useState(false);
    const { user } = useContext(UserContext);

    return (
        <div>
            <Sidebar show={show} setshow={setshow} user={user} />
            <div className="p-5 background-sendPayment">
                <div className="my-1 card-payment">
                    <SendPaymentForm setAuth={setAuth} className="payments"/>
                </div>
            </div>
            <Footer/>
            <Toaster 
            position="bottom-right"
            reverseOrder={false}
            />
        </div>
    )
}