import { Stack, Text, Title } from "@mantine/core";
import { OrderSummary } from "./OrderSummary";
import { useOrders } from "./use-orders";

export function Orders() {
  const { loading, data } = useOrders();

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
