import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { gql } from "../../generated";
import { Order } from "../../generated/graphql";

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

type OrderSummaryProps = Pick<Order, "timestamp" | "totalSum">;

function OrderSummary(props: OrderSummaryProps) {
  // Show human readable presentation of order timestamp in summary
  const timestamp = new Intl.DateTimeFormat([], {
    timeStyle: "short",
    dateStyle: "medium",
  }).format(Date.parse(props.timestamp));

  // Show human readable presentation of order total sum in summary
  const totalSum = new Intl.NumberFormat([], {
    style: "currency",
    currency: "EUR",
    currencyDisplay: "",
  }).format(props.totalSum);

  return (
    <div>
      <h3>Order</h3>
      <p>Order time: {timestamp}</p>
      <p>Total: {totalSum}</p>
    </div>
  );
}
