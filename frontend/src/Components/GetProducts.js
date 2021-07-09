import React from "react";
import { useQuery } from "@apollo/client";
import { LOAD_PRODUCTS } from "../Graphql/Queries";
import { Grid, useMediaQuery } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import LoadingCard from "./LoadingSkeleton";

const GetProducts = ({ rates, currencyList, products }) => {
  const { loading } = useQuery(LOAD_PRODUCTS);
  const [isLargerThan768] = useMediaQuery("(min-width:768px)");

  return (
    <Grid
      templateColumns={isLargerThan768 ? "repeat(3, 1fr)" : "repeat(2, 1fr)"}
      gap={4}
      p="5"
    >
      {loading ? (
        <LoadingCard />
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.title}
            product={product}
            currencyList={currencyList}
            rates={rates}
          />
        ))
      )}
    </Grid>
  );
};

export default GetProducts;
