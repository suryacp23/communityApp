import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "../src/components/ui/provider.jsx";
import {ChakraProvider} from '@chakra-ui/react'
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    
      <Provider>

        <App />
     
      </Provider>

   
    </BrowserRouter>
  </StrictMode>
);
