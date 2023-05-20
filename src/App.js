import { ThemeProvider } from "@mui/material";
import RouterIndex from "./router";
import { theme } from "./utils/theme";
import { Provider } from "react-redux";
import { store } from "./store";
import "./App.css";
// Usage
const App = () => {
  // Implement your authentication check logic

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterIndex />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
