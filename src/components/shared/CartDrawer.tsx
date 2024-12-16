import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
  useCartOptions,
} from "../../redux/slices/cartSlice";
import { IoClose } from "react-icons/io5";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { RxCrossCircled } from "react-icons/rx";
import { TUser, useCurrentUser } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";
const CartDrawer = () => {
  const [openRight, setOpenRight] = useState(false);
  const { items, totalPrice } = useAppSelector(useCartOptions);
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser) as TUser;
  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);
  const navigate = useNavigate();
  return (
    <div>
      <div className="fixed top-[50%] right-0">
        <Button
          onClick={openDrawerRight}
          className="bg-primary text-2xl p-2 flex flex-col items-center gap-2"
        >
          <HiOutlineShoppingCart />
          <p className="text-base capitalize">
            {" "}
            {items.length} {items.length < 2 ? "Item" : "Items"}{" "}
          </p>
        </Button>
      </div>
      <Drawer
        overlay={false}
        size={400}
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4"
      >
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="mb-6 flex items-center justify-between">
              <Typography variant="h5" color="blue-gray">
                My cart
              </Typography>
              <IconButton
                variant="text"
                color="blue-gray"
                onClick={closeDrawerRight}
              >
                <IoClose className="text-xl" />
              </IconButton>
            </div>
            <div className="space-y-4">
              {items?.map((item) => {
                return (
                  <div key={item?.id} className="grid grid-cols-4 gap-3">
                    <img
                      src={`https://pqina.nl/pintura/static/assets/picture.svg`}
                      alt=""
                      className="h-full object-cover col-span-1 rounded-md"
                    />
                    <div className="flex flex-col col-span-2 justify-between">
                      <p>{item.title}</p>
                      <p>Got discount: {item.discount}%</p>
                      <div className="flex items-center gap-3">
                        <p>Quantity:</p>
                        <button
                          onClick={() => dispatch(increaseQuantity(item.id))}
                        >
                          <FiPlusCircle className="text-xl" />
                        </button>
                        <p>{item.quantity}</p>
                        <button
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                        >
                          <FiMinusCircle className="text-xl" />
                        </button>
                      </div>
                    </div>
                    <div className="col-span-1 flex flex-col items-end justify-between">
                      {(item.quantity * item.price).toFixed(2)} TK
                      <button
                        onClick={() => dispatch(removeProduct(item.id))}
                        title="remove product"
                        className="bg-blue-gray-50 p-1 rounded-md hover:bg-primary hover:text-white "
                      >
                        <RxCrossCircled className="text-xl" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between items-center text-lg font-bold">
              <p>Total price:</p>
              <p>{totalPrice.toFixed(2)} TK</p>
            </div>
            <Button
              disabled={!user || items.length === 0}
              onClick={() => navigate("/checkout")}
              className="capitalize text-[16px] font-medium bg-primary hover:shadow-none mt-5"
              size="sm"
              fullWidth
            >
              Checkout
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default CartDrawer;
