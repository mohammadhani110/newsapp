// ** MUI Imports
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Card, Chip } from "@mui/material";

// ** Icons Imports
import CircleOutline from "mdi-material-ui/CircleOutline";
import { CardElement } from "@stripe/react-stripe-js";

// ** Styled Component for the wrapper of whole component
const BoxWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(12, 6, 6),
  borderRadius: theme.shape.borderRadius,
}));

// ** Styled Component for the wrapper of all the features of a plan
const BoxFeature = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(5),
  "& > :not(:first-of-type)": {
    marginTop: theme.spacing(4),
  },
}));

const renderFeatures = ({ data }) => {
  return data?.description.map((item, index) => (
    <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
      <CircleOutline
        sx={{ mr: 2.5, fontSize: "0.875rem", color: "text.secondary" }}
      />
      <Typography variant="body2">{item}</Typography>
    </Box>
  ));
};

const PricingCard = (props) => {
  // ** Props
  const { data, handlePriceId } = props;

  return (
    <Card sx={{ maxWidth: 400 }}>
      <BoxWrapper
        sx={{
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        {data?.subheader ? (
          <Chip
            sx={{
              top: 16,
              right: 24,
              position: "absolute",
              "& .MuiChip-label": {
                px: 2.5,
                fontSize: "0.8125rem",
              },
            }}
          />
        ) : null}

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" sx={{ mb: 1.5 }}>
            {data?.title}
          </Typography>
          <Typography variant="body2">{data?.subtitle}</Typography>
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
                {data?.price}
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
        <BoxFeature>{renderFeatures(data)}</BoxFeature>
        <div>
          <CardElement
            options={
              {
                /* Add your own styling options here */
              }
            }
          />
        </div>

        <Button
          fullWidth
          color={data?.buttonVariant ? "success" : "primary"}
          variant={
            data?.buttonVariant === "contained" ? "contained" : "outlined"
          }
          onClick={() => handlePriceId(data?.id)}
          type="submit"
        >
          {data?.buttonText}
        </Button>
      </BoxWrapper>
    </Card>
  );
};

const PlanDetails = ({ handlePriceId }) => {
  const tiers = [
    {
      title: "Basic",
      price: "5",
      id: process.env.BASIC_PLAN_ID || "price_1N92GWHwtlKAVQlbsvh1QhNp",
      description: [
        "10 categories included",
        "50 articles to per month",
        "Help center access",
        "Email support",
      ],
      buttonText: "Sign up now",
      buttonVariant: "outlined",
    },
    {
      title: "Pro",
      subheader: "Most popular",
      price: "14",
      id: process.env.PRO_PLAN_ID || "price_1N92GXHwtlKAVQlbI90UkgtZ",
      description: [
        "unlimited categories",
        "unlimited articles to per month",
        "Help center access",
        "Priority email support",
      ],
      buttonText: "Get started",
      buttonVariant: "contained",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        flexWrap: "wrap",
        marginBottom: "3rem",
      }}
    >
      {tiers.map((option, index) => (
        <PricingCard key={index} data={option} handlePriceId={handlePriceId} />
      ))}
    </Box>
  );
};

export default PlanDetails;
