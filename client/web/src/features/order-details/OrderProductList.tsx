import { Box, List, Text, Title } from "@mantine/core";
import { getFormattedCurrency } from "../../utils/get-formatted-currency";

interface OrderProductListProps {
  products:
    | {
        ean: string;
        amount: number;
        price: number;
        name?: string;
        imageUrl?: string;
      }[]
    | undefined
    | null;
}

export function OrderProductList({ products = [] }: OrderProductListProps) {
  return (
    <Box>
      <Title order={3}>Products in order</Title>
      <List mt="sm">
        {products?.map((product) => (
          <List.Item key={product.ean}>
            <Text>
              {product.name} ({product.ean})
            </Text>
            <List withPadding>
              <List.Item>Amount: {product.amount}</List.Item>
              <List.Item>
                Unit price: {getFormattedCurrency(product.price)}
              </List.Item>
              <List.Item>
                Total price:{" "}
                {getFormattedCurrency(product.price * product.amount)}
              </List.Item>
            </List>
          </List.Item>
        ))}
      </List>
    </Box>
  );
}
