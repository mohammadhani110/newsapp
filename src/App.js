import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import RouterIndex from "./router";
import { theme } from "./utils/theme";
import { store } from "./store";

import "./App.css";
import { useAxiosInterceptor } from "./hooks/useAxiosInterceptor";
import { useEffect } from "react";
// Usage
const App = () => {
  const initializeAxios = useAxiosInterceptor();

  useEffect(() => {
    initializeAxios();
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Toaster />
        <RouterIndex />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
