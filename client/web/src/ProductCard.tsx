type ProductCardProps = {
  name: string;
  ean: string;
  price: number;
};

export function ProductCard(props: ProductCardProps) {
  // Show human readable presentation of order total sum in summary
  const price = new Intl.NumberFormat([], {
    style: "currency",
    currency: "EUR",
  }).format(props.price);

  return (
    <div>
      <h3>{props.name}</h3>
      <p>EAN: {props.ean}</p>
      <p>Price: {price}</p>
    </div>
  );
}
