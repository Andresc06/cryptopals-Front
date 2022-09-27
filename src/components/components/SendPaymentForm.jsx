import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { schemaPayment } from "../utils/schema";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ETH from "../assets/eth.svg";
import USDT from "../assets/usdt.svg";
import BNB from "../assets/bnb.png";
import BUSD from "../assets/busd.png";
import axios from "axios";

export function SendPaymentForm({setAuth}) {

    let navigate = useNavigate();

  const [input, setInput] = useState({
    quantity: "",
    taxes: false,
  });

  // Destructurar input y tomar cada variable
  const { quantity } = input;

  const [walletUser, setwalletUser] = useState({
    USD: 0,
    BUS: 0,
    BNB: 0,
    ETH: 0,
  });

  let email = localStorage.email;

  const getData = async () => {
    //Request
    const response = await axios.get(
      `https://cryptopals-backend.netlify.app/wallet/balance/${email}`
    );
    //Con esta función estoy extrayendo el objeto data de la respuesta, y a su vez extrayendo el objeto user y a ese objeto le estoy extrayendo el array "assets", que es el que contiene la información que me interesa
    let data = response.data.wallet;

    setwalletUser({ ...data });

    toast('Send money whenever you want!!', {
      icon: "💰",
      style: {
        borderRadius: "5px",
        background: "#fff",
        color: "#333",
        fontSize: "22px",
        fontFamily: "Shadows Into Light",
      },
      duration: 1000
    })
  };

  useEffect(() => {
    getData();
  }, []);

  const [loading, setloading] = useState(false);
  const [check, setcheck] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaPayment),
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleCheck = (e) => {
    e.target.checked ? setcheck(true) : setcheck(false);
    setInput({
      ...input,
      [e.target.name]: e.target.checked ? quantity * 0.03 : 0,
    });
  };

  const onSubmit = async (data, evt, errors) => {
    try {
      data.quantity = tax();

      if(currentCurrency == "") return toast('Please select a Crypto', {
                                  icon: "❓",
                                  style: {
                                    borderRadius: "5px",
                                    background: "#fff",
                                    color: "#333",
                                    fontSize: "22px",
                                    fontFamily: "Shadows Into Light",
                                  },
                                });

      data.currency = currentCurrency;
      data.email = email;

      setloading(true);

      // se hace el fetch para la comunicacion con el backend
      const res = await fetch("https://cryptopals-backend.netlify.app/wallet/payment", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      // Se parsea y queda como un objeto
      const parseRes = await res.json();

      setloading(false);

      if (parseRes != "payment successful") {
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
        toast(data.currency.slice(0, 3) + " sent successfully", {
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

  let total = 0;

  function tax() {
    if (check) {
      total = Number(quantity) + Number(quantity) * 0.03;
      return total;
    } else {
      total = Number(quantity);
      return total;
    }
  }

  let [currentCurrency, setcurrentCurrency] = useState("");

  const handleCrypto = (e) => {
    let element = e.target;

    if (element.checked) setcurrentCurrency(element.value);
  };

  let link = `https://cryptopals-backend.netlify.app/wallet/msgsend/${email}`

    return (
        <div className="m-4">
        <p className="h4 text-center text-white">Transactions</p>
        <div className="row">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-4 bg-dark p-1 rounded">
              <div className="d-flex text-white justify-content-between">
                <p>Subtotal</p>
                <p>
                  {quantity}
                </p>
              </div>
              <div className="d-flex text-warning justify-content-between">
                <p>Taxes</p>
                <p>
                  +<span className="px-1"></span>
                  {check ? quantity * 0.03 : 0}
                </p>
              </div>
              <div className="d-flex text-danger justify-content-between">
                <p className="fw-bold">Total</p>
                <div className="d-flex align-text-top ">
                  <span className="mt-1 pe-1 fs-14 "></span>
                  <span className="h4">{check ? (tax()).toFixed(4) : quantity}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="row bg-light rounded m-3">
                <div className="px-4 my-4">
                  <label className="fw-bold text-primary">Payment details</label>
                </div>
                <div className="px-4">
                  <div className="mb-4">

                    <div className="mb-1">
                      
                      <label className="text-muted">Temporal Code</label>
                      <div className="d-flex mb-2">
                      <input
                        className="form-control w-75"
                        {...register("code")}
                        name="code"
                        placeholder="XXXXXX"
                      />
                      <a className="btn btn-outline-warning w-50 ms-3" href={link} target="_blank" role="button">Get Code</a>
                      </div>
                      <Link to='/dashboard/changephone' className='text-decoration-none text-danger mt-2'>Do you need to change your phone number?</Link><br/>
                

                      <label className="text-muted mt-3">Email Receiver</label>
                      <input
                        className="form-control form-pay"
                        {...register("receiver")}
                        name="receiver"
                        placeholder="Write the receiver email"
                      />
                    </div>

                    {errors.receiver && (
                      <p className="text-danger fst-italic fw-bold m-1 mb-2 payment">
                        {errors.receiver.message}
                      </p>
                    )}

                    <div className="col text-center mt-4">
                      <div className="form-check form-check-inline ms-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="crypto"
                          value="USD"
                          onChange={handleCrypto}
                        />
                        <label className="form-check-label">USDT</label>
                        <img className="img-fluid currency ms-2" src={USDT} />
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="crypto"
                          value="ETH"
                          onChange={handleCrypto}
                        />
                        <label className="form-check-label">ETH</label>
                        <img className="img-fluid currency" src={ETH} />
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
                        <img className="img-fluid currency ms-2" src={BUSD} />
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
                        <img className="img-fluid currency ms-2" src={BNB} />
                      </div>

                      <div className="col m-3">
                        <label className="text-muted me-2">Quantity:</label>
                        <input
                          className="form-control form-control3"
                          step={
                            currentCurrency == "USD" || currentCurrency == "BUS"
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
                        <span className="ms-2 wallet">
                        {walletUser[currentCurrency] <= quantity && total == 0 ? `The total is ${quantity} ${currentCurrency}. You have ` : "" }
                        {walletUser[currentCurrency] <= quantity && total != 0 ? `The total is ${total.toFixed(4)} ${currentCurrency}${currentCurrency}. You have ` : "" }
                          <span className={total != 0 ? walletUser[currentCurrency] > total.toFixed(4) ? "text-success" : "text-danger" : walletUser[currentCurrency] > quantity ? "text-success" : "text-danger"}>
                          {walletUser[currentCurrency]} {" "}
                          {currentCurrency == "USD"
                            ? "USDT"
                            : currentCurrency == "BUS"
                            ? "BUSD"
                            : currentCurrency}</span>{walletUser[currentCurrency] <= quantity ? " in your wallet. Insufficient funds" : ""}
                        </span>
                      </div>
                    </div>

                    <div className="form-check">
                      <label>FastPay</label>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        {...register("taxes")}
                        name="taxes"
                        onChange={handleCheck}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-warning rounded p-2 mb-3 fst-italic text-center">
                <small>
                  <span className="fw-bold">Warning:</span> The payment will
                  arrive to the receiver within aprox 20-45 min. You can use{" "}
                  <span className="text-danger">FastPay</span> and the
                  payment will arrive immediately, but you will pay a fee of 3%
                </small>
              </div>

              <div className="row d-grid">
                <button className="btn btn-success text-white fs-4 mb-2">
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Send Payment"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
            <Toaster 
            position="bottom-right"
            reverseOrder={false}
            />
        </div>
    )
}