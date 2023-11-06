import { Order } from "../generated/graphql";

export const orders: Order[] = [
  {
    orderId: "order-1",
    timestamp: "2023-08-22T15:05:10+0000",
    customerId: "customer-1",
    totalSum: 14.68,
    products: [
      { ean: "2000570800008", amount: 3, price: 0.5 },
      { ean: "2000609200007", amount: 1, price: 1.91 },
      { ean: "2000632900004", amount: 7, price: 1.61 },
    ],
  },
  {
    orderId: "order-2",
    timestamp: "2023-08-25T13:08:16+0000",
    customerId: "customer-2",
    totalSum: 4.0,
    products: [
      { ean: "2000559900002", amount: 12, price: 0.2 },
      { ean: "2005029300009", amount: 10, price: 0.16 },
    ],
  },
  {
    orderId: "order-3",
    timestamp: "2023-08-28T10:01:16+0000",
    customerId: "customer-1",
    totalSum: 8.47,
    products: [
      { ean: "2000519200005", amount: 8, price: 0.5 },
      { ean: "2000503700009", amount: 6, price: 0.37 },
      { ean: "2000632900004", amount: 1, price: 1.61 },
      { ean: "2005029300009", amount: 4, price: 0.16 },
    ],
  },
];
