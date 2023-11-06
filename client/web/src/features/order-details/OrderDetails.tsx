import { Box, Stack, Text, Title } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { getFormattedCurrency } from "../../utils/get-formatted-currency";
import { getFormattedTimestamp } from "../../utils/get-formatted-timestamp";
import { OrderProductList } from "./OrderProductList";
import { useOrderDetails } from "./use-order-details";

export function OrderDetails() {
  const [searchParams] = useSearchParams();
  const { loading, data } = useOrderDetails();

  return (
    <Stack gap="lg">
      <Title order={2}>Order details: {data.orderId}</Title>
      {searchParams.has("isNewOrder") && (
        <Text fw="bold">Thank you for your order!</Text>
      )}
      {loading ? (
        <Text>Loading order...</Text>
      ) : (
        <Stack gap="md">
          <Box>
            <Text>
              Order time:{" "}
              <Text span inherit fw="bold">
                {getFormattedTimestamp(data.timestamp)}
              </Text>
            </Text>
            <Text>
              Total:{" "}
              <Text span inherit fw="bold">
                {getFormattedCurrency(data.totalSum)}
              </Text>
            </Text>
          </Box>
          <OrderProductList products={data.products} />
        </Stack>
      )}
    </Stack>
  );
}
