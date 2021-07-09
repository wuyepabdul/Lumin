import React from "react";
import { Grid, useMediaQuery } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import LoadingSkeleton from "./LoadingSkeleton";

const GetProducts = ({ rates, currencyList, products, loading }) => {
  const [isLargerThan768] = useMediaQuery("(min-width:768px)");

  return (
    <Grid
      templateColumns={isLargerThan768 ? "repeat(3, 1fr)" : "repeat(2, 1fr)"}
      gap={4}
      p="5"
    >
      {loading ? (
        <LoadingSkeleton />
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
