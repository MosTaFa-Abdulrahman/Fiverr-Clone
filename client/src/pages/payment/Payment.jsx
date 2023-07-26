import "./payment.scss";
import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethod";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51LNo35G2b2rR7T8ZgNtXkYAQ3SdWMwlY9wMMDcn6wRghAB4nMCucWbqEC92XBwpb2JpDiwT7TQBrPWtriMQrL1ol002mQNkCs0"
);

function Payment() {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const makePay = async () => {
      try {
        const res = await publicRequest.post(
          `order/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.log(error.message);
      }
    };
    makePay();
  }, [id]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="payment">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
