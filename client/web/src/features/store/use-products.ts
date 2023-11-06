import { useQuery } from "@apollo/client";
import { gql } from "../../../../generated";

const getProductsQuery = gql(`
  query getProducts {
    products {
      ean
      name
      price
      imageUrl
    }
  }
`);

export function useProducts() {
  return useQuery(getProductsQuery);
}
