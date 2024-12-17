import { Form, Formik, FormikValues } from "formik";
import FormikInput from "../../components/Formik/FormikInput";
import { Button } from "@material-tailwind/react";
import { setUser, TUser, useCurrentUser } from "../../redux/slices/auth";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../redux/features/user";
import { TErrorResponse, TUserDB } from "../../types";
import { toast } from "sonner";
import Loader from "../../components/shared/Loader";

const Account = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  const { data, isLoading } = useGetUserByIdQuery(user?.id);
  const [updateUserFunc] = useUpdateUserMutation();
  const userData = data?.data as TUserDB;
  const dispatch = useAppDispatch();
  const initialValues = {
    name: userData?.name,
    email: userData?.email,
    city: userData?.city,
    address: userData?.address,
  };
  const handleSubmit = async (values: FormikValues) => {
    const toastId = toast.loading("Profile info updating!");
    try {
      const res = await updateUserFunc({
        id: user?.id,
        userData: values,
      }).unwrap();
      console.log(res);
      if (res.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
        dispatch(setUser({ user: { ...user, name: res?.data?.name } }));
      }
    } catch (error) {
      console.log("error:", error);
      const err = error as TErrorResponse;
      toast.error(err?.data?.message, { id: toastId, duration: 2000 });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white p-10">
      <div className="">
        <p className="text-xl font-semibold">About you</p>
        <p className="text-base">
          Tell us about yourself to help us make it easy for you to shop with us
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ dirty }) => {
          return (
            <Form className="mt-10 space-y-10">
              <div className="grid grid-cols-2 gap-10">
                <FormikInput name="name" label="Name" />
                <FormikInput name="email" label="Email" />
                <FormikInput name="city" label="City" />
              </div>
              <FormikInput name="address" label="Full Address" />
              {dirty && (
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="capitalize font-medium px-10 bg-primary"
                  >
                    Save
                  </Button>
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Account;
