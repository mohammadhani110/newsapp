import { createTheme } from "@mui/material/styles";
const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

export let theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#292F75",
    },
    secondary: {
      main: "#ff443b",
      contrastText: "rgba(236,230,230,0.87)",
    },
    blue: {
      main: "#0052FF",
    },
    blueSecondary: createColor("#253B80"),
    greyLight: "#292f754d",
    black: createColor("#000"),
    green: createColor("#00A046"),
    success: {
      main: "#00BFA6",
      secondary: "#dcfffa",
    },
    error: {
      main: "#d32f2f",
      secondary: "#ffe3e3",
    },
    background: {
      default: "#fff",
      // default: '#f5f5f5',
    },
    text: {
      primary: "#303642",
    },
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    // htmlFontSize: 10,
    fontFamily: ["Poppins", "sans-serif"].join(","),
    fontWeightBold: 800,
    h1: {
      fontWeight: 800,
      letterSpacing: 1,
      fontSize: "4rem",
      textTransform: "uppercase",
      lineHeight: "4.2rem",
      "@media (max-width:1000px)": {
        fontSize: "3rem",
        lineHeight: "3.2rem",
      },
      "@media (max-width:500px)": {
        fontSize: "2.5rem",
        lineHeight: "2.5rem",
      },
    },
    h2: {
      fontWeight: 800,
      letterSpacing: 1,
      // fontSize: "3.5rem",
      fontSize: "3.5rem",
      lineHeight: "4.2rem",
      textTransform: "uppercase",
      "@media (max-width:1200px)": {
        fontSize: "2.5rem",
        lineHeight: "2.5rem",
      },
      "@media (max-width:500px)": {
        fontSize: "2.25rem",
        lineHeight: "2.25rem",
      },
    },
    body1: {
      fontWeight: 400,
      lineHeight: "36px",
      fontSize: "1.125rem",
    },
    button: {
      fontWeight: 700,
      fontSize: "1rem",
      letterSpacing: "2%",
    },
  },
});

theme = createTheme(theme, {
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          // Note that you can customize other properties here, like padding, color, .etc.
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // padding:"20px 32px",
          maxWidth: "200px",
          width: "100%",
          height: "56px",
        },
      },
    },
  },
});
