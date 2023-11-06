import { useQuery } from "@apollo/client";
import { SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { gql } from "../../../../generated";
import { ProductCard } from "./ProductCard";

const getProductsQuery = gql(`
  query getProducts {
    products {
      ean
      name
      price
      imageUrl
    }
  }
`);

export function Store() {
  const { loading, data } = useQuery(getProductsQuery);

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
      <Title order={2}>Available products</Title>
      {loading ? <Text>Loading products...</Text> : displayData()}
    </Stack>
  );
}
