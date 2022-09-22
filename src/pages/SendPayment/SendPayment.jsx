import Navbar from "../../components/Navbar";
import './sendPayment.css';
import toast, { Toaster } from 'react-hot-toast';
import { SendPaymentForm } from "../../components/SendPaymentForm";


export function SendPayment({setAuth}) {

    return (
        <div>
            <Navbar/>
            <div className="p-5 background-sendPayment">
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