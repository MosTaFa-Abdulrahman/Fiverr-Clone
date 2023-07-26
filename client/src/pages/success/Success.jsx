import "./success.css";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethod";

function Success() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await publicRequest.put("order/confirm", { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, [navigate, payment_intent]);

  return (
    <div className="success">
      <div className="carddd">
        <div className="containeerr">
          <i className="checkmark">✓</i>
        </div>
        <h1 className="successTitle">Success</h1>
        <p className="successDesc">
          We received your purchase request
          <br /> You must wait 4s 🥰 😉!
        </p>
      </div>
    </div>
  );
}

export default Success;
