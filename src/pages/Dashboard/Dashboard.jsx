import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { UserBalanceChart } from '../../components/UserBalanceChart/UserBalanceChart';
import { UserContext } from '../../context/userContext';
import { ActivityLog } from '../../components/ActivityLog/ActivityLog';
import { PieChart } from '../../components/PieChart/PieChart';
import { getData } from '../../services/user.service';
import styles from './Dashboard.module.css';
import Footer from '../../components/Footer/Footer';
import Cryptos from '../../components/Cryptos/Cryptos';
import { RiWallet2Line } from 'react-icons/ri';

export function Dashboard() {
    const [show, setshow] = useState(false);
    const { user, getUser, createDataSets, dataSets } = useContext(UserContext);

    //Use effect para manejar la petición, que es asíncrona
    useEffect(() => {
        getData().then(user => {
            getUser(user);
            createDataSets(user);
        });

        toast(`Hello ${user.name}!!`, {
            icon: '👋',
            style: {
                borderRadius: '5px',
                background: '#333',
                color: '#fff',
                fontSize: '22px',
                fontFamily: 'Shadows Into Light'
            },
            duration: 1000
        });
    }, []);

    const getBalance = async () => {
        //Request
        let email = localStorage.getItem('email');
        const response = await axios.get(
          `https://cryptopals-backend.netlify.app/wallet/balance/${email}`
        );
        let data = response.data.wallet;
    
        setwalletUser({ ...data });
      };
    
      const [walletUser, setwalletUser] = useState({
        USD: 0,
        BUS: 0,
        BNB: 0,
        ETH: 0,
      });
    
      useEffect(() => {
        getBalance();
      }, []);
    
    return (
        <div className={styles.all}>
            <main className={styles.container}>
                {walletUser ? 
                    <div className='card ms-3 text-white bg-dark p-3 border border-5'>
                        <span className='fst-italic text-center d-flex fs-3 ms-4'>Your Wallet <RiWallet2Line className='fs-3 wallet mt-2 ms-2'/></span>
                    <p className='ms-2 mt-3'><strong className='text-warning'>USDT:</strong> {walletUser.USD.toFixed(2)}</p>
                    <p className='ms-2'><strong className='text-danger'>ETH:</strong> {walletUser.ETH.toFixed(2)}</p>
                    <p className='ms-2'><strong className='text-info'>BNB:</strong> {walletUser.BNB.toFixed(2)}</p>
                    <p className='ms-2'><strong className='text-success'>BUSD:</strong> {walletUser.BUS.toFixed(2)}</p>
                    </div>
                : ""}
                <Sidebar show={show} setshow={setshow} user={user} />
                <UserBalanceChart state={show} user={user} userData={dataSets} />
                <PieChart user={user} userData={dataSets} />
            </main>
            <ActivityLog user={user} />

            <Cryptos/>
            <Footer/>

            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
}
