import { useQuery } from "@apollo/client";
import { Text, Title } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { gql } from "../../../../generated";
import { useAuthContext } from "../auth/AuthContext";

const orderQuery = gql(`
  query getOrder($customerId: ID!, $orderId: ID!) {
    order(customerId: $customerId, orderId: $orderId) {
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

export function OrderDetails() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { customerId } = useAuthContext();
  const { loading, data } = useQuery(orderQuery, {
    variables: { customerId, orderId: orderId! },
    skip: !orderId,
    onCompleted(data) {
      // No data found for this order, possibly invalid, navigate to order summary page
      if (!data.order) {
        navigate("/orders");
      }
    },
  });

  return (
    <>
      <Title order={2}>Order details</Title>
      {loading ? (
        <Text>Loading order...</Text>
      ) : (
        <pre>{JSON.stringify(data?.order, null, 2)}</pre>
      )}
    </>
  );
}
