import { gql } from "@apollo/client";

export const LOAD_PRODUCTS = gql`
  query {
    products {
      id
      title
      image_url
      price(currency: NGN)
    }
  }
`;

/* export const LOAD_CURRENCY = gql`
  query {
    currency
  }
`; */
