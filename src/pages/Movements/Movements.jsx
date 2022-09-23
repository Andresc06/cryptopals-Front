import axios from 'axios';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../../components/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import './movements.css';
import { UserContext } from "../../context/userContext";
import { useContext } from 'react';


export function Movements({setAuth}) {

    let email = localStorage.email;
    const [show, setshow] = useState(false);
    const { user } = useContext(UserContext);

    const [payments, setPayments] = useState([])

    const getData = async () => {
        //Request
        const response = await axios.get(
          `http://localhost:8888/wallet/payments/${email}`
        );
        
        let data = response.data.reverse();
        setPayments(data)

        toast('Here you have your movements', {
            icon: "🧐",
            style: {
              borderRadius: "5px",
              background: "#fff",
              color: "#333",
              fontSize: "25px",
              fontFamily: "Shadows Into Light",
            }
        })
    
    };

    useEffect(() => {
        getData();
    }, []);
    

    return (
        <div>
            <Sidebar show={show} setshow={setshow} user={user} />
            <div className="p-5 background-movements mt-2">
            <h1 className='display-4 text-center text-white position-relative movements my-3'>Movements</h1>
            <div className='card my-4 tab'>
                <div className='-block d-sm-none mobile'>
                    
                    {
                            
                            payments.map( (payment) =>  {

                                function time(el) {
                                    let data =  el.slice(11,19);
                                    return data;
                                }

                                function date(el) {
                                    let data = el.slice(0, 10);
                                    return data;
                                }

                                return(<div className={payment.quantity > 0 ? "bg-success bg-opacity-25 row border" : "bg-danger bg-opacity-25 row"}><div className='content'>
                                        <div className='d-flex flex-column'><p>Date: {date(payment.date)}</p><p>Time: {time(payment.date)}</p><p className={payment.quantity > 0 ? "text-success" : "text-danger"}>Amount: {payment.quantity}</p><p>Currency: {payment.currency == 'USD' ? 'USDT' : payment.currency == 'BUS' ? 'BUSD' : payment.currency}</p><p>{payment.fastpay == 'N/A' ? 'FastPay: N/A' : payment.fastpay ? "FastPay: YES" : "FastPay: NO"}</p><p>FROM/TO: {payment.user}</p>
                                        </div></div></div>)
                            })
                        }
                    
                </div>
            <div className='d-none d-sm-block'>
            <table className="table table-dark m-0 text-center table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Time</th>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Currency</th>
                        <th scope="col">Fastpay</th>
                        <th scope='col'>From/To</th>
                    </tr>
                </thead>

                <tbody>
                        {
                            
                            payments.map((payment, key) =>  {

                                function date(el) {
                                    let data =  el.slice(11,19);
                                    return data;
                                }

                                function hour(el) {
                                    let data = el.slice(0, 10);
                                    return data;
                                }

                                return(<tr className={payment.quantity > 0 ? "table-success" : "table-danger"}>
                                        <th scope="row">{key+1}</th>
                                        <td>{date(payment.date)}</td>
                                        <td>{hour(payment.date)}</td>
                                        <td className={payment.quantity > 0 ? "text-success" : "text-danger"}>{payment.quantity}</td>
                                        <td>{payment.currency == 'USD' ? 'USDT' : payment.currency == 'BUS' ? 'BUSD' : payment.currency}</td>
                                        <td>{payment.fastpay == 'N/A' ? 'N/A' : payment.fastpay ? "YES" : "NO"}</td>
                                        <td>{payment.user}</td>
                                        </tr>)
                            })
                        }
                </tbody>
            </table>
            </div>
            </div>
            </div>
            <Toaster 
            position="bottom-right"
            reverseOrder={false}
            />
        </div>
    )
}