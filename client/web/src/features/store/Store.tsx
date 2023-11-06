import { Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { ProductCard } from "./ProductCard";
import { Cart } from "./cart/Cart";
import { useProducts } from "./use-products";

export function Store() {
  const { loading, data } = useProducts();

  const displayData = () => {
    if (!data) {
      return <Text>No products available.</Text>;
    }

    return (
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
        {data.products.map((product) => (
          <ProductCard
            key={product.ean}
            name={product.name}
            ean={product.ean}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </SimpleGrid>
    );
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={2}>Available products</Title>
        <Cart />
      </Group>
      {loading ? <Text>Loading products...</Text> : displayData()}
    </Stack>
  );
}
