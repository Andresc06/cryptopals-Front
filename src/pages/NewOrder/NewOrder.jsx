import toast, { Toaster } from "react-hot-toast";
import { NewBuy } from "../../components/Orders/newBuy";
import { NewSell } from "../../components/Orders/newSell";
import { useState } from "react";
import './newOrder.css'

export function NewOrder({setAuth}) {

  const [side, setside] = useState('')

  const handleSide = (e) => {
    let element = e.target;

    if (element.checked) {
        setside(element.value);
    }
  };

    return (
      <div className="background-order">
        <div className="col text-center pt-5">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="side"
              value="BUY"
              onChange={handleSide}
            />
            <label className="form-check-label">BUY</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="side"
              value="SELL"
              onChange={handleSide}
            />
            <label className="form-check-label">SELL</label>
          </div>
        </div>

        {side == 'SELL' ? <NewSell /> : ""}
        {side == 'BUY' ? <NewBuy /> : ""}
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    );
}