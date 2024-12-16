import { FormikValues } from "formik";
import FormikForm from "../../components/Formik/FormikForm";
import { useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentUser } from "../../redux/slices/auth";
import { useCartOptions } from "../../redux/slices/cartSlice";
import FormikInput from "../../components/Formik/FormikInput";
import { useGetUserByIdQuery } from "../../redux/features/user";
import { TUserDB } from "../../types";
import CustomButton from "../../components/ui/CustomButton";

const Checkout = () => {
  const { items, totalPrice, totalDiscountedPrice } =
    useAppSelector(useCartOptions);
  const totalDiscount = totalPrice - totalDiscountedPrice;
  const user = useAppSelector(useCurrentUser) as TUser;
  const { data } = useGetUserByIdQuery(user?.id);
  const userData = data?.data as TUserDB;

  const initialValues = {
    district: userData?.city,
    address: userData?.address,
  };
  const handlePayment = async (values: FormikValues) => {
    console.log(values);
  };

  return (
    <div className="section-gap-xy">
      <h1 className="text-3xl font-bold">Checkout & Delivery</h1>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 mt-10">
        <div>
          <FormikForm initialValues={initialValues} onSubmit={handlePayment}>
            <FormikInput name="district" label="City" required />
            <FormikInput name="address" label="Full address" required />
          </FormikForm>
        </div>
        <div className="bg-gray-50 p-5 rounded-md">
          <p className="text-xl font-bold">Order summery</p>
          <div className="mt-5 ">
            <div className="flex items-center justify-between font-bold">
              <p>Products</p>
              <p>{items.length}</p>
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
            <CustomButton type="submit" label="Order" className="mt-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
