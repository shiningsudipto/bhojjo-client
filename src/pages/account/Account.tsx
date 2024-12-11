import { Form, Formik, FormikValues } from "formik";
import FormikInput from "../../components/Formik/FormikInput";
import { Button } from "@material-tailwind/react";

const Account = () => {
  const initialValues = {
    name: "User Name",
    email: "user@gmail.com",
    district: "Dhaka",
    address: "Mirpur 2/3, Chowdhury villa, Dhaka",
  };
  const handleSubmit = async (values: FormikValues) => {
    console.log(values);
  };
  return (
    <div className="bg-white p-10">
      <div className="">
        <p className="text-xl font-semibold">About you</p>
        <p className="text-base">
          Tell us about yourself to help us make it easy for you to shop with us
        </p>
      </div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ dirty }) => {
          return (
            <Form className="mt-10 space-y-10">
              <div className="grid grid-cols-2 gap-10">
                <FormikInput name="name" label="Name" />
                <FormikInput name="email" label="Email" />
                <FormikInput name="district" label="District" />
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
