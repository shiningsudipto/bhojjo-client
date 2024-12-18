import Account from "../pages/account/Account";
import Collections from "../pages/collections/Collections";
import OrderHistory from "../pages/orderHistory/OrderHistory";

export const accountRoutes = [
  {
    path: "/user",
    element: <Account />,
    children: [
      {
        path: "/user/details",
        element: <Account />,
      },
      {
        path: "/user/order-history",
        element: <OrderHistory />,
      },
      {
        path: "/user/my-collections",
        element: <Collections />,
      },
    ],
  },
];
