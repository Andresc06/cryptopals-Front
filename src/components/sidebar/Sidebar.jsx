import React, { useState } from 'react';
import { MdSupervisedUserCircle, MdOutlineHistory, MdOutlinePayment, MdCached, MdMenu } from 'react-icons/md';
import { RiCoinsFill } from 'react-icons/ri'
import { Link } from 'react-router-dom';
import styles from './sidebar.module.css';


export function Sidebar({ show, setshow, user }) {
    const links = [
        {
            name: 'Dashboard',
            icon: <MdSupervisedUserCircle />,
            address: '/dashboard'
        },
        {
            name: 'Buy/Sell Cryptos',
            icon: <RiCoinsFill />,
            address: '/dashboard/order'
        },
        {
            name: 'Movements',
            icon: <MdOutlineHistory />,
            address: '/dashboard/movements'
        },
        {
            name: 'Send Payments',
            icon: <MdOutlinePayment />,
            address: '/dashboard/sendPayment'
        },
        {
            name: 'Load Account',
            icon: <MdCached />,
            address: '/dashboard/loadAccount'
        },
    ];

    const handleToggle = () => {
        setshow(!show);
        console.log(show);
    };

    return (
        <>
            <aside className={styles.topbar}>
                <div className={styles.toggleContainer} onClick={handleToggle}>
                    <MdMenu className={styles.toggle} />
                    <h3>CRYPTOPALS</h3>
                </div>
                {<h3>Hello, {user.name}</h3>}
            </aside>
            <aside className={`${styles.sidebar} ${show ? styles.show : styles.hidde}`}>
                <ul className={styles.sidebarNav}>
                    {links.map(link => {
                        return (
                            <li key={link.name} className={styles.link}>
                                <Link to={link.address}>
                                    {link.icon}
                                    <span>{link.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </aside>
        </>
    );
}
