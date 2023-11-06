import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Orders } from "./Orders";
import { Store } from "./Store";

const gqlClient = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});
loadDevMessages();
loadErrorMessages();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Store />,
  },
  {
    path: "orders/",
    element: <Orders />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={gqlClient}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
