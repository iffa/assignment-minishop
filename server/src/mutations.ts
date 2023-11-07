import { GraphQLError } from "graphql";
import { nanoid } from "nanoid";
import { orders } from "./db/order.db.js";
import { products } from "./db/product.db.js";
import {
  MutationResolvers,
  Order,
  OrderedProduct,
} from "./generated/graphql.js";

export const mutations: MutationResolvers = {
  createOrder: (_parent, args) => {
    console.debug(
      "Creating order for customer with products",
      args.customerId,
      args.products
    );

    const orderProducts = args.products.map((orderProduct) => {
      const product = products.find(
        (product) => product.ean === orderProduct.ean
      );

      // If given product in order request is invalid, abort
      if (!product) {
        throw new GraphQLError("Invalid product in order", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      // If given product has invalid amount, abort
      if (orderProduct.amount < 1) {
        throw new GraphQLError("Product amount is invalid", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      return {
        ...orderProduct,
        // Include current price as it may change in the future
        price: product.price,
      } satisfies OrderedProduct;
    });

    const totalSum = orderProducts
      // Calculate total amount per product
      .map((product) => product.amount * product.price)
      // Reduce array to total sum
      .reduce((a, b) => a + b, 0);

    const order = {
      orderId: nanoid(),
      customerId: args.customerId,
      timestamp: new Date().toISOString(),
      products: orderProducts,
      totalSum,
    } satisfies Order;

    orders.push(order);

    return order;
  },
};
