// ** React Imports
import { useState } from "react";

// ** MUI Components
import MuiLink from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
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

// ** Icons Imports
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";
import AlertCircle from "mdi-material-ui/AlertCircle";

// ** Third Party Imports
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Hooks
import { signinAPI } from "../../store/auth";
import { useDispatch } from "react-redux";

// ** Layout Import
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import isEmpty from "../../utils/isEmpty";

// ** Demo Imports

const RightWrapper = styled(Box)(() => ({
  width: "100%",

  // [theme.breakpoints.up('md')]: {
  //   maxWidth: 400
  // },
  // [theme.breakpoints.up('lg')]: {
  //   maxWidth: 450
  // }
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

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const defaultValues = {
  password: "",
  email: "",
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // ** Hooks
  const isSubscribed = useSelector((state) => state.auth?.user?.isSubscribed);
  const isLoading = useSelector((state) => state.auth?.isLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  // ** Vars

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("data", data);
    const { error } = await dispatch(signinAPI(data));
    console.log("onSubmit error", error);
    if (!isEmpty(error)) {
      setError(error?.message);
      toast.error(error?.message, {
        position: "bottom-right",
        duration: 5000,
      });

      return;
    }
    toast.success("Login Successful!", {
      position: "bottom-right",
      duration: 5000,
    });
    if (isSubscribed) navigate("/");
    else {
      navigate("/subscription");
    }
  };

  return (
    <Box className="content-right">
      <RightWrapper>
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
                <strong>Please sign-in to your account</strong>
              </Typography>
            </Box>
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
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label="Email"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder="admin@gmail.com"
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
                      onBlur={onBlur}
                      label="Password"
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
                  <FormHelperText sx={{ color: "error.main" }} id="">
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
                Login
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
                  Don't have an account?
                </Typography>
                <Typography>
                  <Link to="/register">
                    <Typography
                      component={MuiLink}
                      sx={{ color: "primary.main" }}
                    >
                      Register here
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

export default Login;
