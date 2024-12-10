import Account from "../pages/account/Account";
import Home from "../pages/home/Home";
import Products from "../pages/products/Products";

export const pageRoutes = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "account",
        element: <Account />,
      },
    ],
  },
];
