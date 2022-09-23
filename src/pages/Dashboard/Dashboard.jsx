import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { UserBalanceChart } from '../../components/UserBalanceChart/UserBalanceChart';
import { UserContext } from '../../context/userContext';
import { ActivityLog } from '../../components/ActivityLog/ActivityLog';
import { PieChart } from '../../components/PieChart/PieChart';


export function Dashboard() {

    const [show, setshow] = useState(false);
    const { user, getUser, createDataSets, dataSets } = useContext(UserContext);

    //Use effect para manejar la petición, que es asíncrona
    useEffect(() => {
        getData();
    }, []);

    //Función para traer los datos desde el backend (es un callback para el useEffect)
    const getData = async () => {
        const email = localStorage.getItem('email');

        //Request
        const response = await axios.post('http://localhost:8888/auth/dashboard', {
            email,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });

        const {
            data: { user },
        } = response;

        getUser(user);
        createDataSets(user);
    };

    const styles = {
        container: {
            backgroundColor: '#f6f9ff',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
        },
    };

    return (
        <div>
            <main style={styles.container}>
                <Sidebar show={show} setshow={setshow} user={user} />
                <UserBalanceChart state={show} user={user} userData={dataSets} />
                <PieChart user={user} userData={dataSets} />
            </main>
            <ActivityLog user={user} />

            <Toaster 
            position="bottom-right"
            reverseOrder={false}
            />
            
        </div>
    )
}