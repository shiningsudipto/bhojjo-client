import { NavLink, Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import NavMenu from "../shared/NavMenu";

const userNavLinks = [
  {
    path: "/account/details",
    label: "Account Details",
  },
  {
    path: "/account/order-history",
    label: "Order History",
  },
  {
    path: "/account/my-collections",
    label: "My Collections",
  },
];

const AccountLayout = () => {
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
            <p className="text-xl font-bold">User Name</p>
            <p className="font-semibold">01711111111</p>
          </div>
          <div className="mt-10 flex flex-col gap-y-2">
            {userNavLinks.map((item, index) => {
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
