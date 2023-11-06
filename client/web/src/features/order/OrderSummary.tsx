import { Order } from "../../../../generated/graphql";

type OrderSummaryProps = Pick<Order, "timestamp" | "totalSum">;

export function OrderSummary(props: OrderSummaryProps) {
  // Show human readable presentation of order timestamp in summary
  const timestamp = new Intl.DateTimeFormat([], {
    timeStyle: "short",
    dateStyle: "medium",
  }).format(Date.parse(props.timestamp));

  // Show human readable presentation of order total sum in summary
  const totalSum = new Intl.NumberFormat([], {
    style: "currency",
    currency: "EUR",
  }).format(props.totalSum);

  return (
    <div>
      <h3>Order</h3>
      <p>Order time: {timestamp}</p>
      <p>Total: {totalSum}</p>
    </div>
  );
}
