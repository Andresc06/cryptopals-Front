import React, { useState } from 'react';
import { MdSupervisedUserCircle, MdOutlineHistory, MdOutlinePayment, MdCached, MdMenu } from 'react-icons/md';
import { RiCoinsFill } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom';
import styles from './sidebar.module.css';
import Log from '../../assets/nav-bar_crypto.png'


export function Sidebar({ show, setshow, user }) {

    let navigate = useNavigate();

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
        }
    ];

    const handleToggle = () => {
        setshow(!show);
    };

    return (
        <>
            <aside className={styles.topbar}>
                <div className={styles.toggleContainer} onClick={handleToggle}>
                    <MdMenu className={styles.toggle} />
                    <h3 className='pt-2'>CRYPTOPALS</h3>
                    <img src={Log} className="log" alt='CRYPTOPALS logo' />
                </div>
                <span className='d-flex'>
                <h3 className='d-none d-lg-block d-md-block d-xl-block d-xxl-block'>Hello, {user.name}</h3>
                <Link to="/login"><button className='btn btn-danger me-3'>Log Out</button></Link>
                </span>
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
