// ** MUI Imports
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Card, Chip } from "@mui/material";

// ** Icons Imports
import CircleOutline from "mdi-material-ui/CircleOutline";

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

const PlanDetails = (props) => {
  // ** Props
  const { plan, data } = props;

  const renderFeatures = () => {
    return data?.planBenefits.map((item, index) => (
      <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
        <CircleOutline
          sx={{ mr: 2.5, fontSize: "0.875rem", color: "text.secondary" }}
        />
        <Typography variant="body2">{item}</Typography>
      </Box>
    ));
  };

  return (
    <Card>
      <BoxWrapper
        sx={{
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        {data?.popularPlan ? (
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
                {data?.monthlyPrice}
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
        <BoxFeature>{renderFeatures()}</BoxFeature>
        <Button
          fullWidth
          color={data?.currentPlan ? "success" : "primary"}
          variant={data?.popularPlan ? "contained" : "outlined"}
        >
          {data?.currentPlan ? "Your Current Plan" : "Upgrade"}
        </Button>
      </BoxWrapper>
    </Card>
  );
};

export default PlanDetails;
