import { Button, Card, Group, Image, Text, Title } from "@mantine/core";
import { useCartContext } from "./cart/CartContext";

type ProductCardProps = {
  name: string;
  ean: string;
  price: number;
  imageUrl: string;
};

export function ProductCard(props: ProductCardProps) {
  const { addToCart } = useCartContext();

  // Show human readable presentation of order total sum in summary
  const price = new Intl.NumberFormat([], {
    style: "currency",
    currency: "EUR",
  }).format(props.price);

  return (
    <Card withBorder data-product-ean={props.ean}>
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
          <Button
            size="compact-sm"
            onClick={() =>
              addToCart({
                ean: props.ean,
                name: props.name,
                price: props.price,
              })
            }
          >
            Add to cart
          </Button>
        </Group>
      </Card.Section>
      <Text>EAN: {props.ean}</Text>
      <Text>Price: {price}</Text>
    </Card>
  );
}
