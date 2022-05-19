import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import theme from "./theme/index";
import { AppProvider } from "./context/AppContext";
import "./theme/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
    <AppProvider>
      <App />
    </AppProvider>
  </ChakraProvider>,
);
