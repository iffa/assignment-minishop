import { orders } from "./db/order.db.js";
import { products } from "./db/product.db.js";
import { QueryResolvers } from "./generated/graphql.js";

export const queries: QueryResolvers = {
  orders: (_parent, args) => {
    console.debug("Getting orders for user", args.customerId);

    // Return only orders for given customer
    return orders.filter((order) => order.customerId === args.customerId);
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
  products: () => {
    return products;
  },
};
