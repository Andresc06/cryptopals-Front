import styles from './ActivityLog.module.css';

export function ActivityLog({ user }) {

    
    return (
        <div className='d-none d-sm-block mb-5'>
            <article className={styles.activityLog}>
                <h3 className='text-center p-3 fs-1 fst-italic'>Your lastest transactions</h3>
                {!user.payments ? (
                    <h2>Loading..</h2>
                ) : (
                    <ul>
                        <li className={styles.legend}>
                            <p className={styles.date}>Date</p>
                            <p className={styles.user}>From/To</p>
                            <p className={styles.fastpay}>Fastpay</p>
                            <p className={styles.quantity}>Amount</p>
                            <p className={styles.currency}>Currency</p>
                        </li>
                        {user.payments.map((pay, key) => {
                        if (key >= user.payments.length - 5) {
                            return (
                            <li key={pay.date} className={styles.row}>
                                <p className={styles.date}>{pay.date.slice(0, 10)} {pay.date.slice(11, 19)}</p>
                                <p className={styles.user}>{pay.user}</p>
                                <p className={styles.fastpay}>{!pay.fastpay ? 'No' : 'Yes'}</p>
                                <p className={styles.quantity}>{pay.quantity}</p>
                                <p className={styles.currency}>{pay.currency}</p>
                            </li>
                            );
                        }
                        })}
                    </ul>
                )}
            </article>
        </div>
    );
}
