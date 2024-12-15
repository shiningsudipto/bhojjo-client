import { useState } from "react";
import CustomModal from "../../components/ui/CustomModal";
import FormikForm from "../../components/Formik/FormikForm";
import FormikInput from "../../components/Formik/FormikInput";
import { FormikValues } from "formik";
import CustomButton from "../../components/ui/CustomButton";
import { Button } from "@material-tailwind/react";
import { useSendOTPMutation } from "../../redux/features/user";

const Login = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [OTP, setOTP] = useState();
  const [sendOtpFunc] = useSendOTPMutation();

  const handleSendOtp = async (values: FormikValues) => {
    try {
      const res = await sendOtpFunc(values).unwrap();
      console.log({ res });
    } catch (error) {
      console.log("error:", error);
    }
  };
  return (
    <>
      <Button
        onClick={() => setLoginModalOpen(true)}
        variant="outlined"
        color="black"
        size="sm"
        className="text-base font-medium capitalize py-1 h-[40px]"
      >
        Log In
      </Button>
      <CustomModal
        size="xs"
        title="Login form"
        open={isLoginModalOpen}
        setOpen={setLoginModalOpen}
      >
        <FormikForm
          initialValues={{ phone: "" }}
          onSubmit={handleSendOtp}
          className="p-5"
        >
          <FormikInput name="phone" label="Phone" />
          <CustomButton label="Send OTP" type="submit" />
        </FormikForm>
      </CustomModal>
    </>
  );
};

export default Login;
