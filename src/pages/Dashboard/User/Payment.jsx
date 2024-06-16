import SectionTitle from "../../Shared/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {

    const {subscriptionCost} = useContext(AuthContext);
    console.log(subscriptionCost) 

    return (
        <div>
           <SectionTitle heading="Payment" subHeading="Please pay for the subscription to become a membership holder!"></SectionTitle>
           <Elements stripe={stripePromise}>
                    <CheckoutForm subscriptionCost={subscriptionCost}></CheckoutForm>
            </Elements>

        </div>
    );
};

export default Payment;
