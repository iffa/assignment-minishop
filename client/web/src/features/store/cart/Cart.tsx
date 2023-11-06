import { useMutation } from "@apollo/client";
import { Button, Group, Modal, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { gqlClient } from "../../..";
import { gql } from "../../../../../generated";
import { getFormattedCurrency } from "../../../utils/get-formatted-currency";
import { useAuthContext } from "../../auth/AuthContext";
import { GET_ORDERS_QUERY } from "../../order-summary/use-orders";
import { useCartContext } from "./CartContext";

const createOrderQuery = gql(`
  mutation CreateOrder($customerId: ID!, $products: [CreateOrderProduct!]!) {
    createOrder(customerId: $customerId, products: $products) {
      orderId
    }
  }
`);

export function Cart() {
  const { customerId } = useAuthContext();
  const [opened, { open, close }] = useDisclosure();
  const { cart, addToCart, removeFromCart, clear } = useCartContext();
  const navigate = useNavigate();
  const [createOrder, { loading }] = useMutation(createOrderQuery, {
    variables: {
      customerId,
      products: cart.map((item) => ({
        amount: item.amount,
        ean: item.product.ean,
      })),
    },
  });

  const totalPrice = cart
    .map((item) => item.amount * item.product.price)
    // Reduce array to total sum
    .reduce((a, b) => a + b, 0);

  return (
    <>
      <Modal size="xl" title="Products in cart" opened={opened} onClose={close}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>EAN</Table.Th>
              <Table.Th>Price per unit</Table.Th>
              <Table.Th>Total price</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {cart.length === 0 && (
              <Table.Tr>
                <Table.Td colSpan={999}>Your shopping cart is empty.</Table.Td>
              </Table.Tr>
            )}
            {cart.map((item) => (
              <Table.Tr key={item.product.ean}>
                <Table.Td align="right">{item.amount}</Table.Td>
                <Table.Td>{item.product.name}</Table.Td>
                <Table.Td>{item.product.ean}</Table.Td>
                <Table.Td align="right">
                  {getFormattedCurrency(item.product.price)}
                </Table.Td>
                <Table.Td align="right">
                  {getFormattedCurrency(item.product.price * item.amount)}
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Button
                      variant="light"
                      onClick={() => removeFromCart(item.product.ean)}
                    >
                      -
                    </Button>
                    <Button
                      variant="light"
                      onClick={() => addToCart(item.product)}
                    >
                      +
                    </Button>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Group justify="space-between" mt="md">
          <Text>Total price: {getFormattedCurrency(totalPrice)}</Text>
          <Button
            disabled={cart.length === 0}
            loading={loading}
            onClick={() => {
              // Should ideally handle error states as well, but this is a naive implementation
              // that assumes everything goes well
              void createOrder()
                .then((result) => {
                  // Navigate to order confirmation page on success
                  const createdOrderId = result.data?.createOrder.orderId;
                  if (createdOrderId) {
                    navigate(`/orders/${createdOrderId}?isNewOrder`);
                  }
                })
                .finally(() => {
                  // Clear cart data
                  clear();

                  // Refetch order summary to avoid showing stale data
                  void gqlClient.refetchQueries({
                    include: [GET_ORDERS_QUERY],
                  });
                });
            }}
          >
            Submit order
          </Button>
        </Group>
      </Modal>
      <Button onClick={open}>
        {cart.length} products in cart ({getFormattedCurrency(totalPrice)})
      </Button>
    </>
  );
}
