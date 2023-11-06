import { Button, Card, Group, Image, Text, Title } from "@mantine/core";

type ProductCardProps = {
  name: string;
  ean: string;
  price: number;
  imageUrl: string;
  readOnly?: boolean;
};

export function ProductCard(props: ProductCardProps) {
  // Show human readable presentation of order total sum in summary
  const price = new Intl.NumberFormat([], {
    style: "currency",
    currency: "EUR",
  }).format(props.price);

  return (
    <Card withBorder>
      <Card.Section withBorder>
        <Image
          alt="Product image"
          src={props.imageUrl}
          height={160}
          fit="contain"
        />
      </Card.Section>
      <Card.Section inheritPadding py="md">
        <Group justify="space-between">
          <Title order={3}>{props.name}</Title>
          {!props.readOnly && <Button size="compact-sm">Add to cart</Button>}
        </Group>
      </Card.Section>
      <Text>EAN: {props.ean}</Text>
      <Text>Price: {price}</Text>
    </Card>
  );
}
