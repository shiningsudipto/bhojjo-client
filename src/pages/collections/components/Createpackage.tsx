import { useState } from "react";
import { FormikValues } from "formik";
import { Button } from "@material-tailwind/react";
import { useAppSelector } from "../../../redux/hooks";
import CustomModal from "../../../components/ui/CustomModal";
import FormikForm from "../../../components/Formik/FormikForm";
import FormikInput from "../../../components/Formik/FormikInput";
import CustomButton from "../../../components/ui/CustomButton";
import { TUser, useCurrentUser } from "../../../redux/slices/auth";
import { toast } from "sonner";
import { useCreatePackageMutation } from "../../../redux/features/package";
import { TErrorResponse } from "../../../types";

const CreatePackage = () => {
  const [isCreatePackageModalOpen, setCreatePackageModalOpen] = useState(false);
  const user = useAppSelector(useCurrentUser) as TUser;
  const [createPackageFunc] = useCreatePackageMutation();

  // Handle sending OTP
  const handleCreatePackage = async (values: FormikValues) => {
    setCreatePackageModalOpen(false);
    const toastId = toast.loading("Login processing!");
    const data = {
      buyer: user?.id,
      name: values?.name,
    };
    try {
      const res = await createPackageFunc(data).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
      }
    } catch (error) {
      console.log("error:", error);
      const err = error as TErrorResponse;
      toast.error(err?.data?.message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <>
      <Button
        onClick={() => setCreatePackageModalOpen(true)}
        variant="filled"
        color="black"
        size="sm"
        className="text-base font-medium capitalize bg-primary hover:bg-primary-500 hover:shadow-none"
      >
        Create package
      </Button>

      {/* Custom Modal for Login */}
      <CustomModal
        size="xs"
        title="Create package"
        open={isCreatePackageModalOpen}
        setOpen={setCreatePackageModalOpen}
      >
        <FormikForm
          initialValues={{ name: "" }}
          onSubmit={handleCreatePackage}
          className="p-5"
        >
          <FormikInput name="name" label="Package name" />
          <CustomButton label="Create" type="submit" />
        </FormikForm>
      </CustomModal>
    </>
  );
};

export default CreatePackage;
