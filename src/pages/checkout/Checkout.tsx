import { Form, Formik, FormikValues } from "formik";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentUser } from "../../redux/slices/auth";
import {
  clearCart,
  TCartItem,
  useCartOptions,
} from "../../redux/slices/cartSlice";
import FormikInput from "../../components/Formik/FormikInput";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../redux/features/user";
import { TErrorResponse, TProduct, TUserDB } from "../../types";
import CustomButton from "../../components/ui/CustomButton";
import Loader from "../../components/shared/Loader";
import { useCreateOrderMutation } from "../../redux/features/order";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Radio } from "@material-tailwind/react";

const Checkout = () => {
  const { items, totalPrice, totalDiscountedPrice } =
    useAppSelector(useCartOptions);
  const dispatch = useAppDispatch();
  const totalDiscount = totalPrice - totalDiscountedPrice;
  const user = useAppSelector(useCurrentUser) as TUser;
  const { data, isLoading } = useGetUserByIdQuery(user?.id);
  const userData = data?.data as TUserDB;
  const [createOrderFunc] = useCreateOrderMutation();
  const [updateUserFunc] = useUpdateUserMutation();
  const navigate = useNavigate();

  const calculateTotalItems = (products: TCartItem[]): number => {
    return products?.reduce((total, product) => total + product.quantity, 0);
  };

  const initialValues = {
    district: userData?.city,
    address: userData?.address,
  };

  const handleProfileUpdate = async (values: FormikValues) => {
    const toastId = toast.loading("Address updating!");
    try {
      const res = await updateUserFunc({
        id: user?.id,
        userData: values,
      }).unwrap();
      console.log(res);
      if (res.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
      }
    } catch (error) {
      console.log("error:", error);
      const err = error as TErrorResponse;
      toast.error(err?.data?.message, { id: toastId, duration: 2000 });
    }
  };

  const handlePayment = async () => {
    const toastId = toast.loading("Order placing, please wait!");
    const orderItems = items.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
    }));
    const payload = {
      order: {
        price: totalDiscountedPrice,
        buyer: user?.id,
      },
      orderItems,
    };
    try {
      const res = await createOrderFunc(payload).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
        dispatch(clearCart());
        navigate("/shop");
      }
    } catch (error) {
      console.log("error:", error);
      const err = error as TErrorResponse;
      toast.error(err?.data?.message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="section-gap-xy">
      <h1 className="text-3xl font-bold">Checkout & Delivery</h1>
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-x-20 gap-10 mt-10">
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <Formik
              initialValues={initialValues}
              onSubmit={handleProfileUpdate}
              enableReinitialize
            >
              {({ dirty }) => {
                return (
                  <Form className="flex flex-col gap-y-6">
                    <h2 className="text-xl font-bold">Address</h2>
                    <FormikInput name="district" label="City" required />
                    <FormikInput name="address" label="Full address" required />
                    {dirty && (
                      <CustomButton type="submit" label="Update Address" />
                    )}
                  </Form>
                );
              }}
            </Formik>
            <div className="mt-8">
              <h3 className="text-xl font-bold">Payment Method</h3>
              <Radio
                crossOrigin={""}
                name=""
                color="red"
                className=""
                label="Cash on delivery"
                defaultChecked
              />
            </div>
          </div>
        )}
        <div className="bg-gray-50 p-5 rounded-md">
          <p className="text-xl font-bold">Order summery</p>
          <div className="mt-5 ">
            <div className="flex items-center justify-between font-bold">
              <p>Products</p>
              <p>{calculateTotalItems(items)}</p>
            </div>
            <div>
              {items?.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <p>
                    {item.quantity} X {item.title}
                  </p>
                  <p>{item?.price}</p>
                </div>
              ))}
              <div className="mt-5 space-y-1">
                <div className="flex justify-between font-semibold">
                  <p>Subtotal:</p>
                  <p>{totalPrice}</p>
                </div>
                <div className="flex justify-between font-bold">
                  <p>Discount:</p>
                  <p>- {totalDiscount.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex text-xl justify-between font-bold mt-5">
                <p>Total:</p>
                <p>{Math.ceil(totalDiscountedPrice)}</p>
              </div>
            </div>
            <CustomButton
              disabled={items.length === 0}
              onclick={() => handlePayment()}
              type="submit"
              label="Order"
              className="mt-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
