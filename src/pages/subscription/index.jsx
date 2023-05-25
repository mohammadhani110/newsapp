import React from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import SubscriptionForm from "../../components/SubscriptionForm";
import SubscriptionPlan from "../../components/SubscriptionPlan";

const stripePromise = loadStripe(
  process.env.STRIPE_PUBLISH_KEY ||
    "pk_test_51MNM2vHwtlKAVQlbi3pRmBpNn06dBW3AvCZOK5kIDUrKVIZMp9G8jqeYMVFOkoISopjllvJuxcz3ENNYk2ozf6ux00zVVg0Ud1"
);

const Subscription = () => {
  return (
    <>
      {stripePromise && (
        <Elements stripe={stripePromise}>
          <SubscriptionPlan />
        </Elements>
      )}
    </>
  );
};

export default Subscription;
