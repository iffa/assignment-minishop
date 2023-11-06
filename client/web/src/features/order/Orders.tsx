import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { gql } from "../../../../generated";
import { OrderSummary } from "./OrderSummary";

const ordersQuery = gql(`
  query getOrders($customerId: ID!) {
    orders(customerId: $customerId) {
      orderId
      customerId
      timestamp
      products {
        amount
        ean
      }
      totalSum
    }
  }`);

export function Orders() {
  const { loading, data } = useQuery(ordersQuery, {
    variables: { customerId: "customer-1" },
  });

  return (
    <>
      <h1>My order history</h1>
      <Link to="/">Back to shop</Link>
      <h2>Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        data?.orders.map((order) => (
          <OrderSummary
            key={order.orderId}
            timestamp={order.timestamp}
            totalSum={order.totalSum}
          />
        ))
      )}
    </>
  );
}
