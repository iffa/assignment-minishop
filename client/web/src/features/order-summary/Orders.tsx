import { useQuery } from "@apollo/client";
import { Stack, Text, Title } from "@mantine/core";
import { gql } from "../../../../generated";
import { useAuthContext } from "../auth/AuthContext";
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
        price
      }
      totalSum
    }
  }`);

export function Orders() {
  const { customerId } = useAuthContext();
  const { loading, data } = useQuery(ordersQuery, {
    variables: { customerId },
  });

  return (
    <Stack gap="lg">
      <Title order={2}>My order history</Title>
      {loading && <Text>Loading orders...</Text>}
      {data && (
        <Stack gap="md">
          {data.orders.length === 0 && <Text>No orders found.</Text>}
          {data.orders.map((order) => (
            <OrderSummary
              key={order.orderId}
              orderId={order.orderId}
              timestamp={order.timestamp}
              totalSum={order.totalSum}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
