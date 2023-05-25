import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setSubcsriptionAction } from "../store/subscription";
import { Box, Button, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// import PlanDetails from "./PlanDetails";

// ** Styled Component for the wrapper of whole component
const BoxWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(12, 6, 6),
  borderRadius: theme.shape.borderRadius,
}));

const PricingOption = ({ title, price, selectedPlan, handlePlan }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.auth?.user?._id);
  const email = useSelector((state) => state?.auth?.user?.email);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet, handle error
      console.log("stripe has not loaded");
      return;
    }

    const priceId =
      selectedPlan === "Basic"
        ? process.env.BASIC_PLAN_ID
        : process.env.PRO_PLAN_ID;

    if (!priceId || !email) {
      // Stripe.js has not loaded yet, handle error
      return;
    }
    console.log("priceId:", priceId);

    // Create a PaymentMethod with card details
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: email,
      },
    });

    if (error) {
      console.log("Error creating PaymentMethod:", error);
      // Display error message to the user
      return;
    }

    // Send the PaymentMethod to the server to create a subscription
    const response = await fetch("/api/create-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        email,
        priceId,
        userId,
      }),
    });

    if (response.ok) {
      // Subscription created successfully
      // Display success message or redirect to a success page
      toast.success("Subscription is Successful", {
        position: "bottom-center",
        duration: 5000,
      });
      console.log("data", response.data);
      dispatch(setSubcsriptionAction(response.data));
      const { sessionId } = await response.json();
      stripe.redirectToCheckout({ sessionId });

      navigate("/");
    } else {
      // Error creating subscription
      // Display error message to the user
      toast.error("Subscription us unsuccessful", {
        position: "bottom-center",
        duration: 5000,
      });
      navigate("/subscription");
    }
  };

  return (
    <Card sx={{ maxWidth: 400 }}>
      <BoxWrapper>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" sx={{ mb: 1.5 }}>
            {title}
          </Typography>
          <Box sx={{ mt: 5, mb: 10, position: "relative" }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography
                variant="body2"
                sx={{ mt: 1.6, alignSelf: "flex-start" }}
              >
                $
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 500,
                  color: "primary.main",
                  lineHeight: 1.17,
                }}
              >
                {price}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 1.6, alignSelf: "flex-end" }}
              >
                /month
              </Typography>
            </Box>
          </Box>
        </Box>
        <div>
          {selectedPlan === title && (
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#dc3545",
                    iconColor: "#dc3545",
                  },
                },
              }}
            />
          )}
        </div>
        <Button
          fullWidth
          color={title === "Pro" ? "success" : "primary"}
          variant={title === "Pro" ? "contained" : "outlined"}
          onClick={() => handlePlan(title)}
          type="submit"
        >
          Select
        </Button>
        {selectedPlan === title && (
          <Button onClick={handleSubmit} variant="contained">
            Subscribe
          </Button>
        )}
      </BoxWrapper>
    </Card>
  );
};
const SubscriptionForm = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlan = (plan) => {
    console.log("priceplan", plan);
    setSelectedPlan(plan);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        flexWrap: "wrap",
        marginY: "3rem",
      }}
    >
      <PricingOption
        title="Basic"
        price="5.00"
        selectedPlan={selectedPlan}
        handlePlan={handlePlan}
      />
      <PricingOption
        title="Pro"
        price="14.00"
        selectedPlan={selectedPlan}
        handlePlan={handlePlan}
      />
    </Box>
  );
};

export default SubscriptionForm;
