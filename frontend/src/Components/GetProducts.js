import React, { useEffect, useState, Fragment } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_PRODUCTS } from "../Graphql/Queries";
import { Card } from "antd";

const { Meta } = Card;

const GetProducts = () => {
  const { error, loading, data } = useQuery(LOAD_PRODUCTS);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
  }, [data]);
  return (
    <Stack>
      {!loading &&
        products.map((product) => (
          <div class="card">
            <div>
              <img src={product.image_url} alt="Avatar" className="image" />
            </div>
            <div class="card-container text-center">
              <h4>
                <b>Jane Doe</b>
              </h4>
              <p>Interior Designer</p>
              <button>Add to Cart</button>{" "}
            </div>
          </div>
        ))}
    </Stack>
  );
};

export default GetProducts;
