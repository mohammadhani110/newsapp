import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosJWT } from "../hooks/useAxiosInterceptor";
import { getSubscription } from "../store/subscription";
import { getUser } from "../store/auth";
import { toast } from "react-hot-toast";
import { Box, Button, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
// import PlanDetails from "./PlanDetails";

// ** Styled Component for the wrapper of whole component
const BoxWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(12, 6, 6),
  borderRadius: theme.shape.borderRadius,
}));

const SubscriptionPlan = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.auth?.user?._id);
  const email = useSelector((state) => state?.auth?.user?.email);

  const handleSubscription = async () => {
    if (!stripe || !elements || !selectedPlan) {
      // Stripe.js or Elements has not loaded yet or no plan selected, handle error
      return;
    }
    setLoading(true);
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      // Error creating payment method, display error message
      console.error("Error creating payment method:", error?.message);
      toast.error(error?.message, {
        duration: 5000,
        position: "bottom-center",
      });
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
    setLoading(false);
  };

  return (
    <Box p={2}>
      <Typography
        component="h4"
        variant="h2"
        sx={{ mb: 1.5, textAlign: "center", fontSize: "3rem" }}
      >
        Select a Subscription Plan
      </Typography>
      {/* <div>
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
      </div> */}

      {!selectedPlan && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
            marginY: "3rem",
          }}
        >
          <PriceCard
            title="Basic"
            price="5.00"
            setSelectedPlan={setSelectedPlan}
            priceId={"price_1N92GWHwtlKAVQlbsvh1QhNp"}
          />
          <PriceCard
            title="Pro"
            price="14.00"
            setSelectedPlan={setSelectedPlan}
            priceId={"price_1N92GXHwtlKAVQlbI90UkgtZ"}
          />
        </Box>
      )}
      {selectedPlan && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
            marginY: "3rem",
            backgroundColor: "#292f75",
            height: "400px",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              maxWidth: 400,
              mx: "auto",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#292f75",
                    backgroundColor: "white",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                    height: "400px", // Adjust the height as needed
                    padding: "2rem",
                  },
                  invalid: {
                    color: "#dc3545",
                    iconColor: "#dc3545",
                  },
                },
                hidePostalCode: true,
              }}
            />
            <LoadingButton
              onClick={handleSubscription}
              variant="contained"
              color="secondary"
              loading={loading}
              disabled={loading}
            >
              Subscribe
            </LoadingButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SubscriptionPlan;

const PriceCard = ({ title, setSelectedPlan, price, priceId }) => {
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

        <Button
          fullWidth
          color={title === "Pro" ? "success" : "primary"}
          variant={title === "Pro" ? "contained" : "outlined"}
          onClick={() => setSelectedPlan(priceId)}
        >
          Select
        </Button>
      </BoxWrapper>
    </Card>
  );
};
