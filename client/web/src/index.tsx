import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { AuthProvider } from "./features/auth/AuthContext";
import { OrderDetails } from "./features/order-details/OrderDetails";
import { Orders } from "./features/order-summary/Orders";
import { Store } from "./features/store/Store";
import { CartProvider } from "./features/store/cart/CartContext";

export const gqlClient = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

loadDevMessages();
loadErrorMessages();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Store />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/orders/:orderId",
        element: <OrderDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ApolloProvider client={gqlClient}>
        <CartProvider>
          <MantineProvider theme={createTheme({ primaryShade: 8 })}>
            <RouterProvider router={router} />
          </MantineProvider>
        </CartProvider>
      </ApolloProvider>
    </AuthProvider>
  </React.StrictMode>
);
