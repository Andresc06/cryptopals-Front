import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import styles from './UserBalanceChart.module.css';

export function UserBalanceChart({ state, user, userData }) {
    //No se que hace esta funcion, pero hay que usarlo :v
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    //Con esto estoy configurando algunos aspectos visuales del grafico
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '',
            },
        },
    };

    //Aquí configuro la información que va ser representada en el gráfico
    const dataSets = {
        labels: [''],
        datasets: userData,
    };

    return (
        <div className={styles.wrapper}>
            {/* <h1>hola {userState.user.name}</h1> */}
            <div id='chartContainer' className={`${styles.chartContainer} ${state ? '' : styles.chartFull} text-center fst-italic`}>
                <h5 className={styles.chartHeader}>Your Graphic Balance</h5>
                <Bar options={options} data={dataSets} />;
            </div>
        </div>
    );
}
