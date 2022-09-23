import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { schemaOrder } from "../../utils/schema";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ETH from "../../assets/eth-order.png";
import BNB from "../../assets/bnb-order.png";
import BUSD from "../../assets/busd-order.png";
import axios from "axios";

export function NewSell({setAuth}) {

    let navigate = useNavigate();

  const [input, setInput] = useState({
    quantity: ""
  });

  // Destructurar input y tomar cada variable
  const { quantity } = input;

  const [ethPrice, setethPrice] = useState('')
  const [bnbPrice, setbnbPrice] = useState('')
  const [busdPrice, setbusdPrice] = useState('')

  const [walletUser, setwalletUser] = useState({
    USD: 0,
    BUS: 0,
    BNB: 0,
    ETH: 0,
  });

  let stockEth, stockBnb, stockBusd;

  useEffect(
    () => {
      let eth = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@ticker');
      let bnb = new WebSocket('wss://stream.binance.com:9443/ws/bnbusdt@ticker');
      let busd = new WebSocket('wss://stream.binance.com:9443/ws/busdusdt@ticker');
      
    eth.onmessage = (event) => {
      stockEth = JSON.parse(event.data);
      setethPrice(parseFloat(stockEth.b).toFixed(2));
    }

    bnb.onmessage = (event) => {
      stockBnb = JSON.parse(event.data);
      setbnbPrice(parseFloat(stockBnb.b).toFixed(2));
    }

    busd.onmessage = (event) => {
      stockBusd = JSON.parse(event.data);
      setbusdPrice(parseFloat(stockBusd.b).toFixed(2));
    }
    
    return () => {
      eth.close();
      bnb.close();
      busd.close();
    }
    },
    []
  )

  

  

  let email = localStorage.email;

  const getData = async () => {
    //Request
    const response = await axios.get(
      `http://localhost:8888/wallet/balance/${email}`
    );
    let data = response.data.wallet;

    setwalletUser({ ...data });
  };

  useEffect(() => {
    getData();
  }, []);

  const [loading, setloading] = useState(false);
  let [currentCurrency, setcurrentCurrency] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaOrder),
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  let button = document.getElementById('button');

  const handleCrypto = (e) => {
    let element = e.target;

    if (element.checked) {
        setcurrentCurrency(element.value);
    }

    button.removeAttribute('disabled');
  };

  const onSubmit = async (data, evt, errors) => {
    try {
      data.side = 'SELL';
      if(currentCurrency == 'BUS') {
        data.exchange = 'BUSDUSDT';
        data.price = Number(busdPrice);
      }
      else if(currentCurrency == 'BNB') {
        data.exchange = 'BNBUSDT';
        data.price = Number(bnbPrice);
      }
      else {
        data.exchange = 'ETHUSDT';
        data.price = Number(ethPrice);
      }
      
      data.email = email;

      let amount;

      if(currentCurrency == 'ETH') amount = ethPrice * quantity - (ethPrice * quantity * 0.001);
        
      else if(currentCurrency == 'BNB') amount = bnbPrice * quantity - (bnbPrice * quantity * 0.001);
      
      else amount = (quantity / busdPrice) - ((quantity / busdPrice) * 0.001);

      if(amount <= 10) return toast('The total order must be more than 10 USDT', {
                            icon: "❌",
                            style: {
                            borderRadius: "5px",
                            background: "#fff",
                            color: "#333",
                            fontSize: "22px",
                            fontFamily: "Shadows Into Light",
                            },
                        });

      setloading(true);

      // se hace el fetch para la comunicacion con el backend
      const res = await fetch("http://localhost:8888/wallet/order", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });

      // Se parsea y queda como un objeto
      const parseRes = await res.json();

      setloading(false);

      if (parseRes != "Order Completed Successfully") {
        toast(parseRes, {
          icon: "❌",
          style: {
            borderRadius: "5px",
            background: "#fff",
            color: "#333",
            fontSize: "22px",
            fontFamily: "Shadows Into Light",
          },
        });

      } else {
        toast(currentCurrency + " sell Successfully", {
          icon: "💸",
          style: {
            borderRadius: "5px",
            background: "#333",
            color: "#fff",
            fontSize: "22px",
            fontFamily: "Shadows Into Light",
          },
        });

        navigate("/dashboard");
      }
    } catch (errors) {
      setloading(false);
      console.log("error");
    }
  };

  let message;

  if(currentCurrency == "USD") message = "USDT"
  else if (currentCurrency == "BUS") message = "BUSD"
  else message = currentCurrency;

    return (
        <div className="row card new-sell">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="row bg-dark rounded m-3 text-white">
                <div className="px-4 my-4">
                  <h2 className="text-center fst-italic sell">Sell Cryptos to USDT</h2>
                </div>
                <div className="px-4">
                  <div className="mb-4">
                  <p className="fw-bold text-center">ETH: {ethPrice ? ethPrice + ' USDT' : ""}</p>
                  <p className="fw-bold text-center">BNB: {bnbPrice ? bnbPrice + ' USDT' : ""}</p>
                  <p className="fw-bold text-center">BUSD: {busdPrice ? busdPrice + ' USDT' : ""}</p>

                    <div className="col text-center mt-4">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="crypto"
                          value="ETH"
                          onChange={handleCrypto}
                        />
                        <label className="form-check-label">ETH</label>
                        <img className="img-fluid currency ms-2 rounded-circle" src={ETH} />
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="crypto"
                          value="BUS"
                          onChange={handleCrypto}
                        />
                        <label className="form-check-label">BUSD</label>
                        <img className="img-fluid currency ms-2 rounded-circle" src={BUSD} />
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="crypto"
                          value="BNB"
                          onChange={handleCrypto}
                        />
                        <label className="form-check-label">BNB</label>
                        <img className="img-fluid currency ms-2 rounded-circle" src={BNB} />
                      </div>

                      <div className="col m-3">
                      
                        <label className="me-2">Quantity:</label>
                        <div className="input-group">
                        <input
                          className="form-control"
                          step={
                            currentCurrency == "BUS"
                              ? "0.01"
                              : "0.0001"
                          }
                          {...register("quantity")}
                          type="number"
                          name="quantity"
                          min="0"
                          onChange={handleChange}
                          required
                        />
                        <span className="input-group-text">{currentCurrency == 'BUS' ? 'BUSD' : currentCurrency}</span>
                        </div>
                        <p className="my-2">
                        {walletUser[currentCurrency] < quantity ? `The total is ${quantity} ${currentCurrency}. You have ` : "You have "}
                          <span className={quantity != 0 ? walletUser[currentCurrency] >= quantity ? "text-success" : "text-danger" : ""}>
                          {walletUser[currentCurrency]} {" "}{currentCurrency}
                          </span>{walletUser[currentCurrency] < quantity ? " in your wallet. Insufficient funds" : " in your wallet."}
                        </p>
                        <p className="my-2 fst-italic text-success">You will get {currentCurrency == 'ETH' ? (ethPrice * quantity - (ethPrice * quantity * 0.001)).toFixed(4) : currentCurrency == 'BNB' ? (bnbPrice * quantity - (bnbPrice * quantity * 0.001)).toFixed(4) : (quantity - (quantity * 0.001)).toFixed(4)} USDT</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary text-white rounded ms-5 me-5 mb-3 p-2 fst-italic text-center">
                <small>
                  <span className="fw-bold">Warning:</span> The total order must be more than 10 USDT
                </small>
              </div>

              <div className="d-grid m-3 mt-5">
                <button className="btn btn-warning fs-4" id="button" disabled>
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : `Sell ${message}`}
                </button>
              </div>
            </div>
          </form>
            <Toaster 
            position="bottom-right"
            reverseOrder={false}
            />
        </div>
    )
}