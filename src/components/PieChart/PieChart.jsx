import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { colors, borederColors } from '../../helpers/colors.helper';
import { labels } from '../../helpers/labels.helper';
import styles from './PieChart.module.css';

export function PieChart({ user, userData }) {
    ChartJS.register(ArcElement, Tooltip, Legend);

    //Se mapea la información que viene del user, para que coincida con el formato que está esperando la librería que hace el gráfico
    const mappedData = userData.map(coin => coin.data[0]);

    const data = {
        labels,
        datasets: [
            {
                label: 'thing',
                data: mappedData,
                backgroundColor: colors,
                borederColors: borederColors,
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <aside className={styles.pieContainer}>
                <h4 className={styles.pieHeader}>Graphic Representation of your actives</h4>
                <Pie data={data}/>
            </aside>
        </>
    );
}
