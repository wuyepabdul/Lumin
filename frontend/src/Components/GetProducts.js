import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_PRODUCTS } from "../Graphql/Queries";
import { Grid, useMediaQuery } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import LoadingSkeleton from "./LoadingSkeleton";

const GetProducts = () => {
  const { loading, data } = useQuery(LOAD_PRODUCTS);
  const [products, setProducts] = useState([]);
  const [isLargerThan768] = useMediaQuery("(min-width:768px)");

  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
  }, [data]);
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
          <ProductCard key={product.title} product={product} />
        ))
      )}
    </Grid>
  );
};

export default GetProducts;
