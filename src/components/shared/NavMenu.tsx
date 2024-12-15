import { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Button,
  IconButton,
  List,
  ListItem,
  Popover,
  PopoverHandler,
  PopoverContent,
  Input,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import { TfiWorld } from "react-icons/tfi";
import Search from "./Search";
import Login from "../../pages/login/Login";
import { useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentUser } from "../../redux/slices/auth";

const categoryMenu = [
  {
    path: "/rice",
    label: "Rice",
  },
  {
    path: "/lentils",
    label: "Lentils",
  },
];

function NavList() {
  return (
    <List className="mb-6 mt-4 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1">
      {categoryMenu.map((item, index) => {
        return (
          <ListItem
            key={index}
            className="flex items-center justify-center px-0 pe-6 py-2 w-fit text-white text-base hover:bg-transparent"
          >
            <Link to={item.path}>{item.label}</Link>
          </ListItem>
        );
      })}
    </List>
  );
}

const profileLinks = [
  {
    path: "/account/details",
    label: "Account",
  },
  {
    path: "/",
    label: "Past Orders",
  },
  {
    path: "/",
    label: "Saved Collections",
  },
];

const NavMenu = () => {
  const [openNav, setOpenNav] = useState(false);
  const user = useAppSelector(useCurrentUser) as TUser;

  const userPopoverMenu = (
    <>
      <Popover placement="bottom">
        <PopoverHandler>
          <Button className="bg-transparent shadow-none text-black-100 capitalize hover:shadow-none flex items-center gap-2 text-base font-medium px-0">
            {/* {user?.name ? user?.name : "Account"}  */}
            {user?.phone}
            <FaAngleDown />
          </Button>
        </PopoverHandler>
        <PopoverContent className="flex flex-col p-0 rounded-none">
          {profileLinks?.map((item, index) => {
            return (
              <Link
                to={item.path}
                key={index}
                className="hover:bg-primary hover:text-white px-4 py-2 text-black-100"
              >
                {item.label}
              </Link>
            );
          })}
        </PopoverContent>
      </Popover>
    </>
  );

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <>
      <div className="section-gap-x py-2 flex items-center justify-between">
        <div>
          <img src="bhojjo.png" alt="" className="w-[120px]" />
        </div>
        <div className="flex items-center gap-2">
          <div className="lg:flex hidden flex-row items-center gap-x-5">
            <Link to="/shop">Shop</Link>
            <button className="flex items-center gap-2">
              <TfiWorld />
              BN
            </button>
            {userPopoverMenu}
            <Login />
          </div>
          <div className="lg:hidden block">{userPopoverMenu}</div>
        </div>
      </div>
      <Navbar className="section-gap-x py-1 bg-primary text-white rounded-none">
        <div className="flex items-center justify-between text-white">
          <div className="hidden lg:block">
            <NavList />
          </div>
          <div className="hidden gap-2 lg:flex items-center">
            <div className="relative">
              <Search />
            </div>
          </div>
          <IconButton
            variant="text"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
            <Login />
          </div>
        </Collapse>
      </Navbar>
    </>
  );
};

export default NavMenu;
