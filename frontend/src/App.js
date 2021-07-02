import React from "react";
import { BrowserRouter } from "react-router-dom";
import GetProducts from "./Components/GetProducts";
import { Stack } from "@chakra-ui/react";
import Header from "./Components/Header";
import "./index.css";
import LoadingSkeleton from "./Components/LoadingSkeleton";

const App = () => {
  return (
    <BrowserRouter>
      <Stack bgColor="rgb(226, 230, 227)">
        <Header />
        <LoadingSkeleton bgColor="black" />
        <GetProducts />
      </Stack>
    </BrowserRouter>
  );
};

export default App;
