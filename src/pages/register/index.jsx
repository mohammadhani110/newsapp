"use client";

// ** React Imports
import { useState, Fragment } from "react";

// ** Next Imports

// ** MUI Components
import MuiLink from "@mui/material/Link";
import Button from "@mui/material/Button";
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

// ** Third Party Imports
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

// ** Hooks
import { registerAPI } from "../../store/auth";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// ** Demo Imports

const defaultValues = {
  email: "",
  username: "",
  password: "",
  terms: false,
};

// ** Styled Components

const RightWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: 400,
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: 450,
  },
}));

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("md")]: {
    maxWidth: 400,
  },
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

  // ** Hooks
  const theme = useTheme();
  const dispatch = useDispatch();

  // ** Vars
  const schema = yup.object().shape({
    password: yup.string().min(5).required(),
    username: yup.string().min(3).required(),
    email: yup.string().email().required(),
  });

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const { email, password } = data;

    dispatch(registerAPI(email, password));
    // .then((user) => {
    //   console.log("User created", user);
    // })
    // .catch((err) => {
    //   if (err.email) {
    //     setError("email", {
    //       type: "manual",
    //       message: err.email,
    //     });
    //   }
    //   if (err.username) {
    //     setError("username", {
    //       type: "manual",
    //       message: err.username,
    //     });
    //   }
    // });
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
            <Box
              sx={{
                textAlign: "left",
                mb: 4,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  lineHeight: 1,
                  fontWeight: 700,
                  fontSize: "1.5rem !important",
                }}
              >
                Register
              </Typography>
            </Box>

            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      value={value}
                      onBlur={onBlur}
                      label="Username"
                      onChange={onChange}
                      placeholder="johndoe"
                      error={Boolean(errors.username)}
                    />
                  )}
                />
                {errors.username && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors.username.message}
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

              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{ mb: 7, mt: 2 }}
              >
                Sign up
              </Button>
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
