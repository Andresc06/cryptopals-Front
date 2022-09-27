import toast, { Toaster } from "react-hot-toast";
import { NewBuy } from "../../components/Orders/newBuy";
import { NewSell } from "../../components/Orders/newSell";
import { useEffect, useState } from "react";
import './newOrder.css'
import { Sidebar } from "../../components/sidebar/Sidebar";
import { UserContext } from "../../context/userContext";
import { useContext } from 'react';
import Footer from "../../components/Footer/Footer";

export function NewOrder({setAuth}) {

  const [side, setside] = useState('')
  const [show, setshow] = useState(false);
  const { user } = useContext(UserContext);

  const handleSide = (e) => {
    let element = e.target;

    if (element.checked) {
        setside(element.value);
    }
  };

  const getToast = () => {

    toast('Buy and Sell Cryptos easily!!', {
        icon: "💱",
        style: {
          borderRadius: "5px",
          marginRight: "25px",
          background: "#fff",
          color: "#333",
          fontSize: "25px",
          fontFamily: "Shadows Into Light",
        },
        duration: 1000
    })

};

useEffect(() => {
    getToast();
}, []);

    return (
      <div>
        <Sidebar show={show} setshow={setshow} user={user} />
      <div className={side ? "background-order2 row d-flex justify-content-between": "background-order row m-0 d-flex justify-content-between"}>
        <div className="col orders d-flex text-center text-white">
          <div className="form-check form-check-inline d-flex">
            <input
              className="form-check-input"
              type="radio"
              name="side"
              value="BUY"
              onChange={handleSide}
            />
            <label className="form-check-label ps-2">Buy</label>
          </div>
          <div className="form-check form-check-inline d-flex">
            <input
              className="form-check-input"
              type="radio"
              name="side"
              value="SELL"
              onChange={handleSide}
            />
            <label className="form-check-label ps-2">Sell</label>
          </div>
        </div>
          <div className="col d-flex mt-5 mb-5">
          {side == 'SELL' ? <NewSell /> : ""}
          {side == 'BUY' ? <NewBuy /> : ""}
          </div>
          {side ? <Footer/> : ""}
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
      </div>
    );
}