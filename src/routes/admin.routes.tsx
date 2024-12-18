import Account from "../pages/account/Account";
import Categories from "../pages/admin/categories/Categories";
import Orders from "../pages/admin/orders/Orders";
import Products from "../pages/admin/products/Products";
import Users from "../pages/admin/users/Users";

export const adminRoutes = [
  {
    path: "/admin",
    element: <Account />,
    children: [
      {
        path: "/admin/products",
        element: <Products />,
      },
      {
        path: "/admin/orders",
        element: <Orders />,
      },
      {
        path: "/admin/users",
        element: <Users />,
      },
      {
        path: "/admin/categories",
        element: <Categories />,
      },
    ],
  },
];
