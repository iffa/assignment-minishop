import { orders } from "./db/order.db.js";
import { products } from "./db/product.db.js";
import { QueryResolvers } from "./generated/graphql.js";

export const queries: QueryResolvers = {
  orders: (_parent, args) => {
    console.debug("Getting orders for user", args.customerId);

    return (
      [...orders]
        // Return only orders for given customer
        .filter((order) => order.customerId === args.customerId)
        // Sort by timestamp descending (latest first)
        .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
    );
  },
  order: (_parent, args) => {
    console.debug(
      "Getting order by id for user",
      args.orderId,
      args.customerId
    );

    return (
      orders.find(
        (order) =>
          order.customerId === args.customerId && order.orderId === args.orderId
      ) ?? null
    );
  },
  products: (_parent, args) => {
    console.debug("Getting available products", args.eans);

    // Return all products as-is if no EAN listing provided to query
    if (!args.eans) {
      return products;
    }

    // Return filtered product set based on given EAN list
    return products.filter((product) => args.eans?.includes(product.ean));
  },
};
