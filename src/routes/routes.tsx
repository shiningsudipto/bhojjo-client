import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utils/routeGenerator";
import { pageRoutes } from "./page.routes";
import AccountLayout from "../components/layouts/AccountLayout";
import { accountRoutes } from "./account.routes";
import { adminRoutes } from "./admin.routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routeGenerator(pageRoutes),
  },
  {
    path: "/user",
    element: <AccountLayout />,
    children: routeGenerator(accountRoutes),
  },
  {
    path: "/admin",
    element: <AccountLayout />,
    children: routeGenerator(adminRoutes),
  },
  // {
  //   path: "*",
  //   element: "",
  // },
]);
