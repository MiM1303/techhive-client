import SectionTitle from "../../Shared/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {

    const {subscriptionCost, discountAmount} = useContext(AuthContext);
    
    console.log(subscriptionCost) 

    return (
        <div>
           <SectionTitle heading="Payment" subHeading="Please pay for the subscription to become a membership holder!"></SectionTitle>
           <div>
           <div className="overflow-x-auto mb-10">
                <table className="table">
                    <tbody>
                    {/* Total Price */}
                    <tr className="border-none">
                        <th>Membership Subscription Cost</th>
                        <td className="text-right">{subscriptionCost}</td>
                    </tr>
                    {/* Discount */}
                    <tr className=" border-b-4 border-slate-200">
                        <th>Discount</th>
                        <td className="text-right">{discountAmount}</td>
                    </tr>
                    {/* Total */}
                    <tr>
                        <th>Total Cost</th>
                        <td className="text-right">{subscriptionCost-discountAmount}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
           </div>
           <Elements stripe={stripePromise}>
                    <CheckoutForm subscriptionCost={subscriptionCost}></CheckoutForm>
            </Elements>

        </div>
    );
};

export default Payment;
