import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosJWT } from "../hooks/useAxiosInterceptor";
import { getSubscription } from "../store/subscription";
import { getUser } from "../store/auth";
import { toast } from "react-hot-toast";

const SubscriptionPlan = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.auth?.user?._id);
  const email = useSelector((state) => state?.auth?.user?.email);

  const handleSubscription = async () => {
    if (!stripe || !elements || !selectedPlan) {
      // Stripe.js or Elements has not loaded yet or no plan selected, handle error
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      // Error creating payment method, display error message
      console.error("Error creating payment method:", error.message);
      return;
    }

    // const response = await fetch("/api/create-subscription", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     paymentMethodId: paymentMethod.id,
    //     priceId: selectedPlan,
    //     userId,
    //     email,
    //   }),
    // });

    const response = await dispatch(
      getSubscription({
        paymentMethodId: paymentMethod.id,
        priceId: selectedPlan,
        userId,
        email,
      })
    );

    console.log("response", response);
    const {
      requiresAction,
      clientSecret,
      success,
      error: Err,
    } = response.payload;

    if (requiresAction) {
      // Payment requires additional action, handle accordingly (e.g., 3D Secure)
      const { error: stripeError } = await stripe.confirmCardPayment(
        clientSecret
      );

      if (stripeError) {
        // Error confirming card payment, display error message
        console.error("Error confirming card payment:", stripeError.message);
      } else {
        // Card payment successfully confirmed
        console.log("Card payment confirmed");
      }
    } else if (success) {
      // Subscription and payment were successful
      console.log("Subscription and payment successful");
      await dispatch(getUser({ id: userId }));
      toast.success("Payment is Successful", {
        duration: 3000,
        position: "bottom-center",
      });
      navigate("/");
    } else {
      // Other payment status or error, display error message
      console.error("Payment failed:", Err);
      toast.error("Payment failed", {
        duration: 3000,
        position: "bottom-center",
      });
    }
  };

  return (
    <div>
      <h2>Select a Subscription Plan</h2>
      <div>
        <label>
          <input
            type="radio"
            name="Basic"
            value="price_1N92GWHwtlKAVQlbsvh1QhNp"
            checked={selectedPlan === "price_1N92GWHwtlKAVQlbsvh1QhNp"}
            onChange={() => setSelectedPlan("price_1N92GWHwtlKAVQlbsvh1QhNp")}
          />
          Basic - $5/month
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="Pro"
            value="price_1N92GXHwtlKAVQlbI90UkgtZ"
            checked={selectedPlan === "price_1N92GXHwtlKAVQlbI90UkgtZ"}
            onChange={() => setSelectedPlan("price_1N92GXHwtlKAVQlbI90UkgtZ")}
          />
          Pro - $14/month
        </label>
      </div>
      <div>
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>
      <button onClick={handleSubscription}>Subscribe</button>
    </div>
  );
};

export default SubscriptionPlan;
