import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utils/routeGenerator";
import { pageRoutes } from "./page.routes";
import AccountLayout from "../components/layouts/AccountLayout";
import { accountRoutes } from "./account.routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routeGenerator(pageRoutes),
  },
  {
    path: "/account",
    element: <AccountLayout />,
    children: routeGenerator(accountRoutes),
  },
  // {
  //   path: "*",
  //   element: "",
  // },
]);
