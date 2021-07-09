import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { LOAD_PRODUCTS } from "../src/Graphql/Queries";
import GetProducts from "./Components/GetProducts";
import { Stack } from "@chakra-ui/react";
import Header from "./Components/Header";
import "./index.css";
import LoadingSkeleton from "./Components/LoadingSkeleton";
import { getCurrencyData } from "./api/currencyApi";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "./redux/actions/productActions";

const App = () => {
  const { data } = useQuery(LOAD_PRODUCTS);
  const [rates, setRates] = useState({});
  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getProducts);
  const { loading: productsLoading, products } = getProducts;

  useEffect(() => {
    let items = [];
    if (data !== undefined) {
      data.products.forEach((product) => {
        items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          convertedPrice: product.price,
          image_url: product.image_url,
          currency: "NGN",
          convertedCurrency: "NGN",
        });
      });
      dispatch(getProductsAction(items));
    }
  }, [dispatch, data]);

  useEffect(() => {
    getCurrencyData()
      .then((res) => setRates(res.rates))
      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <Stack bgColor="rgb(226, 230, 227)">
        <Header />
        <LoadingSkeleton bgColor="black" />
        <GetProducts
          rates={rates}
          products={products}
          loading={productsLoading}
        />
      </Stack>
    </BrowserRouter>
  );
};

export default App;
