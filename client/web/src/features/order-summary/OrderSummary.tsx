import { Anchor, Card, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { Order } from "../../../../generated/graphql";
import { getFormattedCurrency } from "../../utils/get-formatted-currency";
import { getFormattedTimestamp } from "../../utils/get-formatted-timestamp";

type OrderSummaryProps = Pick<Order, "orderId" | "timestamp" | "totalSum">;

export function OrderSummary(props: OrderSummaryProps) {
  const timestamp = getFormattedTimestamp(props.timestamp);
  const totalSum = getFormattedCurrency(props.totalSum);

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
