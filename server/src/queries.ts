import { orders } from "./db/order.db.js";
import { products } from "./db/product.db.js";
import { QueryResolvers } from "./generated/graphql.js";

export const queries: QueryResolvers = {
  orders: (_parent, _args, context) => {
    console.debug("Getting orders for user", context.username);

    return (
      orders
        // Use username from context to filter orders by customer
        .filter((order) => order.customerId === context.username)
    );
  },
  order: (_parent, args, context) => {
    console.debug(
      "Getting order by id for user",
      args.orderId,
      context.username
    );

    return (
      orders.find(
        (order) =>
          order.customerId === context.username &&
          order.orderId === args.orderId
      ) ?? null
    );
  },
  products: () => {
    return products;
  },
};
