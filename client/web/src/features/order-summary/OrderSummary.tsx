import { Anchor, Card, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { Order } from "../../../../generated/graphql";

type OrderSummaryProps = Pick<Order, "orderId" | "timestamp" | "totalSum">;

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
    <Card withBorder>
      <Card.Section inheritPadding py="md">
        <Title order={3}>Order: {props.orderId}</Title>
      </Card.Section>
      <Text>
        Order time:{" "}
        <Text span inherit fw="bold">
          {timestamp}
        </Text>
      </Text>
      <Text>
        Total:{" "}
        <Text span inherit fw="bold">
          {totalSum}
        </Text>
      </Text>
      <Anchor component={Link} to={`/orders/${props.orderId}`} mt="sm">
        View order details
      </Anchor>
    </Card>
  );
}
