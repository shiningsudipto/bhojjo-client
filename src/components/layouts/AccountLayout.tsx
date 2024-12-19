import { NavLink, Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import NavMenu from "../shared/NavMenu";
import { useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentUser } from "../../redux/slices/auth";
import { userRole } from "../../constants";

const userRoutes = [
  {
    path: "/user/details",
    label: "Account Details",
  },
  {
    path: "/user/order-history",
    label: "Order History",
  },
  {
    path: "/user/my-collections",
    label: "My Collections",
  },
];
const adminRoutes = [
  {
    path: "/admin/details",
    label: "Account Details",
  },
  {
    path: "/admin/products",
    label: "Products",
  },
  {
    path: "/admin/orders",
    label: "Orders",
  },
  {
    path: "/admin/categories",
    label: "Categories",
  },
  {
    path: "/admin/users",
    label: "Users",
  },
];

const AccountLayout = () => {
  const user = useAppSelector(useCurrentUser) as TUser;

  let sidebarItems: { path: string; label: string }[] = [];

  switch (user!.role) {
    case userRole.ADMIN:
      sidebarItems = adminRoutes;
      break;
    case userRole.USER:
      sidebarItems = userRoutes;
      break;
    default:
      break;
  }

  return (
    <main>
      <NavMenu />
      <div className="section-gap-xy grid grid-cols-4 bg-gray-50">
        <div className="">
          {/* <img
            src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png"
            alt=""
            className="size-[175px] object-cover"
          /> */}
          <div className="space-y-2">
            <p className="text-xl font-bold">
              {user?.name ? user?.name : "Your name!"}
            </p>
            <p className="font-semibold">{user?.phone}</p>
          </div>
          <div className="mt-10 flex flex-col gap-y-2">
            {sidebarItems.map((item, index) => {
              return (
                <NavLink
                  key={index}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary border-b border-primary text-lg font-medium w-fit"
                      : "inActive text-lg"
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        </div>
        <div className="col-span-3">
          <Outlet />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default AccountLayout;
