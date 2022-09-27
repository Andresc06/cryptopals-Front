import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaLoadAccount } from '../../utils/schema';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import USDT from "../../assets/usdt.svg";
import BUSD from "../../assets/busd.png"
import './loadAccount.css';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { UserContext } from "../../context/userContext";
import { useContext } from 'react';
import { useEffect } from 'react';
import Footer from '../../components/Footer/Footer';

export function LoadAccount() {

    let navigate = useNavigate();
    const [show, setshow] = useState(false);
    const { user } = useContext(UserContext);

    const getToast = () => {

    
        toast('You must transfer USDT/BUSD to our Binance account', {
          icon: "🪙",
          style: {
            borderRadius: "5px",
            background: "#fff",
            color: "#333",
            fontSize: "22px",
            fontFamily: "Shadows Into Light",
          },
          duration: 2000
        })

        toast('Then, fill out this form with its data', {
            icon: "📝",
            style: {
              borderRadius: "5px",
              background: "#fff",
              color: "#333",
              fontSize: "22px",
              fontFamily: "Shadows Into Light",
            },
            duration: 2000
          })
      };
    
      useEffect(() => {
        getToast();
      }, []);

    const [loading, setloading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schemaLoadAccount) });

    let email = localStorage.email;

    let [crypto, setCrypto] = useState("");

    const handleCrypto = (e) => {
        let element = e.target;
    
        if (element.checked) setCrypto(element.value);
    };

    const onSubmit = async (data, evt, errors) => {

        
        try {

            let date = data.date
            let time = data.time
            let partsDate = date.split('-');
            let partsTime = time.split(':');
            data.year = partsDate[0];
            data.month = partsDate[1];
            data.day = partsDate[2];
            data.hour = partsTime[0];
            data.minute = partsTime[1];
            data.second = partsTime[2];
            data.email = email;
            data.crypto = crypto;

            evt.preventDefault();
            setloading(true);

            const res = await fetch('https://cryptopals-backend.netlify.app/wallet/loadaccount', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });

            const parseRes = await res.json();
            
            setloading(false);

            if(parseRes != "payment verified sucessfully") {

                toast(parseRes, {
                    icon: '❌',
                    style: {
                        borderRadius: '5px',
                        background: '#333',
                        color: '#fff',
                        fontSize: '22px',
                        fontFamily: 'Shadows Into Light'
                    }
    
                });
            }

           
            else { 
                
                toast("Payment Verified Successfully", {
                icon: '✅',
                style: {
                    borderRadius: '5px',
                    background: '#333',
                    color: '#fff',
                    fontSize: '22px',
                    fontFamily: 'Shadows Into Light'
                }

                });

                navigate("/dashboard");
            }

        } catch (errors) {

            setloading(false);

            console.log(errors)

            

        }
    };


    return (
        <div>
            <Sidebar show={show} setshow={setshow} user={user} />
            <div className="p-5 background-load">
                <div className="card bg-dark col-sm-6 col-lg-3 p-3 mx-auto mt-5">
                    <h1 className="text-center load">Loading Account Form</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        
                    <p>In order to load your account you need to transfer to the following <span className='text-warning'>Binance Pay account:</span></p>
                    <p className='text-info text-center fst-italic'><bold>Email:</bold> andrescontreras370@gmail.com</p>

                    <p>Then, you will have to fill out this form to verify your payment</p>


                        <div className='align-items-center'>
                        <label>Amount:</label>
                        <input
                          className="form-control"
                          {...register("quantity")}
                          type="number"
                          name="quantity"
                          min="0"
                          step="0.01"
                          required
                        />
                        </div>

                        <div className="col text-center mt-2">
                            <div className="form-check form-check-inline ms-2">
                                <input
                                className="form-check-input"
                                type="radio"
                                name="crypto"
                                value="USDT"
                                onChange={handleCrypto}
                                />
                                <img className="img-fluid currency me-2" src={USDT} />
                                <label className="form-check-label">USDT</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                className="form-check-input"
                                type="radio"
                                name="crypto"
                                value="BUSD"
                                onChange={handleCrypto}
                                />
                                <img className="img-fluid currency me-2 bg-light rounded-circle" src={BUSD} />
                                <label className="form-check-label">BUSD</label>
                            </div>
                      </div>
                        
                        <label>Date of the payment</label>
                        {errors.date && 
                        <span className="text-danger m-0 p-0 mess">
                            {errors.date.message}
                        </span>}
                        <input className="form-control" type="date" id="date" name="date" {...register('date')}
                        min="2021-01-01" max="2030-12-31"/>

                        <label>Time</label>
                        {errors.time && 
                        <span className="text-danger m-0 p-0 mess">
                            {errors.time.message}
                        </span>}
                        <input className="form-control" type="time" id="time" step="1" {...register('time')}/>
                        

                        <div className="d-grid my-3">
                        <button className="btn btn-warning fs-4">
                        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Load Account"}
                        </button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer/>

            <Toaster 
            position="bottom-right"
            reverseOrder={false}
            />
        </div>
    );
}