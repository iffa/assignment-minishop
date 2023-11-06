import { useQuery } from "@apollo/client";
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

const orderProductDetailsQuery = gql(`
  query getProductsForOrder($eans: [ID!]!) {
    products(eans: $eans) {
      ean
      name
      imageUrl
    }
  }
`);

/**
 * @returns Order details for current user, if found. Navigates to /orders if order data is not found (invalid user or order id)
 */
export function useOrderDetails() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { customerId } = useAuthContext();

  const order = useQuery(orderQuery, {
    variables: { customerId, orderId: orderId! },
    skip: !orderId,
    onCompleted(data) {
      // No data found for this order, possibly invalid, navigate to order summary page
      if (!data.order) {
        navigate("/orders");
      }
    },
  });

  const orderProducts = order.data?.order?.products;

  const productDetails = useQuery(orderProductDetailsQuery, {
    variables: { eans: (orderProducts ?? []).map((product) => product.ean) },
    skip: !orderProducts,
  });

  const enrichedProducts = orderProducts?.map((product) => ({
    ...product,
    ...productDetails.data?.products.find((x) => x.ean === product.ean),
  }));

  return {
    loading: order.loading || productDetails.loading,
    data: {
      ...order.data?.order,
      products: enrichedProducts,
    },
  } as const;
}
