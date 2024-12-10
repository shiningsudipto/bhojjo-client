import Account from "../pages/account/Account";
import Collections from "../pages/collections/Collections";
import OrderHistory from "../pages/orderHistory/OrderHistory";

export const accountRoutes = [
  {
    path: "/account",
    element: <Account />,
    children: [
      {
        path: "/account/details",
        element: <Account />,
      },
      {
        path: "/account/order-history",
        element: <OrderHistory />,
      },
      {
        path: "/account/my-collections",
        element: <Collections />,
      },
    ],
  },
];
