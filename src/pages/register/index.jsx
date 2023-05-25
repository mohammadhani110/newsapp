"use client";

// ** React Imports
import { useState, Fragment } from "react";

// ** Next Imports

// ** MUI Components
import MuiLink from "@mui/material/Link";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import useMediaQuery from "@mui/material/useMediaQuery";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled, useTheme } from "@mui/material/styles";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import MuiFormControlLabel from "@mui/material/FormControlLabel";

// ** Icons Imports
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";
import AlertCircle from "mdi-material-ui/AlertCircle";

// ** Third Party Imports
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

// ** Hooks
import { registerAPI } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LoadingButton } from "@mui/lab";

// ** Demo Imports

const defaultValues = {
  email: "",
  name: "",
  password: "",
  terms: false,
};

// ** Styled Components

const RightWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  // [theme.breakpoints.up("md")]: {
  //   maxWidth: 400,
  // },
  // [theme.breakpoints.up("lg")]: {
  //   maxWidth: 450,
  // },
}));

const BoxWrapper = styled(Box)(({ theme }) => ({
  maxWidth: 400,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: "0.18px",
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: { marginTop: theme.spacing(8) },
}));

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  "& .MuiFormControlLabel-label": {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
}));
const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const isSubscribed = useSelector((state) => state.auth?.user?.isSubscribed);
  const isLoading = useSelector((state) => state.auth?.isLoading);

  // ** Hooks
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ** Vars
  const schema = yup.object().shape({
    password: yup.string().min(5).required(),
    name: yup.string().min(3).required(),
    email: yup.string().email().required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("data", data);

    const { error } = await dispatch(registerAPI(data));
    console.log("onSubmit error", error);
    if (error?.name === "Error" && error?.message?.length > 0) {
      setError(error?.message);
      toast.error(error?.message, {
        position: "bottom-right",
        duration: 5000,
      });

      return;
    }
    toast.success("Registration is Successful!", {
      position: "bottom-right",
      duration: 5000,
    });
    if (isSubscribed) navigate("/");
    else {
      navigate("/subscription");
    }
  };

  return (
    <Box className="content-center">
      <RightWrapper sx={{ mx: "auto" }}>
        <Box
          sx={{
            p: 7,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "background.paper",
          }}
        >
          <BoxWrapper>
            <Box sx={{ mb: 6 }}>
              <TypographyStyled variant="h5">{`Welcome to Newsapp! 👋🏻`}</TypographyStyled>
              <Typography variant="body2">
                <strong>Register your account here</strong>
              </Typography>
              {error.length > 0 && error && (
                <Alert
                  icon={<AlertCircle />}
                  sx={{
                    alignItems: "center",
                    py: 3,
                    mb: 6,
                    backgroundColor: "error.secondary",
                    "& .MuiAlert-message": { p: 0 },
                    "& .MuiAlert-icon": { color: "error.main" },
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ mb: 0, display: "block", color: "error.main" }}
                  >
                    <strong>{error}</strong>
                  </Typography>
                </Alert>
              )}
            </Box>

            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      value={value}
                      onBlur={onBlur}
                      label="name"
                      onChange={onChange}
                      placeholder="johndoe"
                      error={Boolean(errors.name)}
                    />
                  )}
                />
                {errors.name && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors.name.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      value={value}
                      label="Email"
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder="user@email.com"
                    />
                  )}
                />
                {errors.email && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors.email.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth>
                <InputLabel
                  htmlFor="auth-login-v2-password"
                  error={Boolean(errors.password)}
                >
                  Password
                </InputLabel>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      label="Password"
                      onBlur={onBlur}
                      onChange={onChange}
                      id="auth-login-v2-password"
                      error={Boolean(errors.password)}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{ mb: 7, mt: 2 }}
                loading={isSubmitting || isLoading}
                disabled={isSubmitting || isLoading}
              >
                Sign up
              </LoadingButton>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ mr: 2, color: "text.secondary" }}>
                  Already have an account?
                </Typography>
                <Typography>
                  <Link to="/login">
                    <Typography
                      component={MuiLink}
                      sx={{ color: "primary.main" }}
                    >
                      Sign in instead
                    </Typography>
                  </Link>
                </Typography>
              </Box>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  );
};

export default Register;
