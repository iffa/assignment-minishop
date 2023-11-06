import { useQuery } from "@apollo/client";
import { gql } from "../../../../generated";
import { useAuthContext } from "../auth/AuthContext";

const ordersQuery = gql(`
  query getOrders($customerId: ID!) {
    orders(customerId: $customerId) {
      orderId
      customerId
      timestamp
      products {
        amount
        ean
        price
      }
      totalSum
    }
  }`);

export const GET_ORDERS_QUERY = "getOrders";

export function useOrders() {
  const { customerId } = useAuthContext();
  return useQuery(ordersQuery, {
    variables: { customerId },
  });
}
