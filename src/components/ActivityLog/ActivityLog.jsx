import styles from './ActivityLog.module.css';

export function ActivityLog({ user }) {
    return (
        <>
            <article className={styles.activityLog}>
                <h3>Sus últimas operaciones</h3>
                {!user.payments ? (
                    <h2>Cargando..</h2>
                ) : (
                    <ul>
                        <li className={styles.legend}>
                            <p className={styles.date}>Date</p>
                            <p className={styles.user}>From/To</p>
                            <p className={styles.fastpay}>Fastpay</p>
                            <p className={styles.quantity}>Amount</p>
                            <p className={styles.currency}>Currency</p>
                        </li>
                        {user.payments.map(pay => {
                            return (
                                <li key={pay.date} className={styles.row}>
                                    <p className={styles.date}>{pay.date}</p>
                                    <p className={styles.user}>{pay.user}</p>
                                    <p className={styles.fastpay}>{!pay.fastpay ? 'No' : 'Yes'}</p>
                                    <p className={styles.quantity}>{pay.quantity}</p>
                                    <p className={styles.currency}>{pay.currency}</p>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </article>
        </>
    );
}
