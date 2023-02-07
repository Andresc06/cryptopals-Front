import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './cryptos.css'

const Cryptos = () => {

    const [ethPrices, setethPrices] = useState('')
    const [bnbPrices, setbnbPrices] = useState('')
    const [btcPrices, setbtcPrices] = useState('')

    let stocketh, stockbnb, stockBtc;

  useEffect(
    () => {
      let eth = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@ticker');
      let bnb = new WebSocket('wss://stream.binance.com:9443/ws/bnbusdt@ticker');
      let btc = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');
      
    eth.onmessage = (event) => {
      stocketh = JSON.parse(event.data);
      setethPrices(parseFloat(stocketh.b).toFixed(2));
    }

    bnb.onmessage = (event) => {
      stockbnb = JSON.parse(event.data);
      setbnbPrices(parseFloat(stockbnb.b).toFixed(2));
    }

    btc.onmessage = (event) => {
      stockBtc = JSON.parse(event.data);
      setbtcPrices(parseFloat(stockBtc.b).toFixed(2));
    }
    
    return () => {
      eth.close();
      bnb.close();
      btc.close();
    }
    },
    []
  )

    return (
    <div>
        <div className="row p-5">
            <h2 className='text-white fst-italic text-center mb-3'>Actual Cryptos' Prices</h2>
            <div className="col-sm-4">
                <div className="card shadow-lg p-3 mb-5 bg-body rounded">
                <div className="card-body">
                    <h5 className="card-title">ETHEREUM</h5>
                    <span className='text-info'>{ethPrices ? ethPrices + ' USD' : ""}</span>
                    <p className="card-text descr">Among cryptocurrencies, ether is second only to bitcoin in market capitalization.</p>
                    <Link to='/dashboard/order'><a href="#" className="btn btn-primary">Buy ETH</a></Link>
                </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="card shadow-lg p-3 mb-5 bg-body rounded">
                <div className="card-body">
                    <h5 className="card-title">BNB</h5>
                    <span className='text-info'>{bnbPrices ? bnbPrices + ' USD' : ""}</span>
                    <p className="card-text descr">It has multiple forms of utility, essentially being the underlying gas that powers the Binance Ecosystem.</p>
                    <Link to='/dashboard/order'><a href="#" className="btn btn-primary">Buy BNB</a></Link>
                </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="card shadow-lg p-3 mb-5 bg-body rounded">
                <div className="card-body">
                    <h5 className="card-title">BITCOIN</h5>
                    <span className='text-info'>{btcPrices ? btcPrices + ' USD' : ""}</span>
                    <p className="card-text descr">it's a universal currency that's not controlled by any government and it exists in a limited supply.</p>
                    <Link to='/dashboard/order'><button className="btn btn-primary" disabled>Buy BTC</button></Link>
                </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Cryptos;

