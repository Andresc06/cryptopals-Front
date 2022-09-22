import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';


export function Dashboard() {
    return (
        <div><h1>Dashboard</h1>


            <Toaster 
            position="bottom-right"
            reverseOrder={false}
            />
            <Link to='/dashboard/sendPayment' className="text-decoration-none loginLink">Payment</Link>
            <Link to='/dashboard/movements' className="text-decoration-none loginLink">Movements</Link>
            <Link to='/dashboard/loadAccount' className="text-decoration-none loginLink">Load Account</Link>
            <Link to='/dashboard/order' className="text-decoration-none loginLink">New Order</Link>
        </div>
    )
}