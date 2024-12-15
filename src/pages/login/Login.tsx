import { useState } from "react";
import CustomModal from "../../components/ui/CustomModal";
import FormikForm from "../../components/Formik/FormikForm";
import FormikInput from "../../components/Formik/FormikInput";
import { FormikValues } from "formik";
import CustomButton from "../../components/ui/CustomButton";
import { Button } from "@material-tailwind/react";
import {
  useLoginMutation,
  useSendOTPMutation,
} from "../../redux/features/user";
import { toast } from "sonner";
import { verifyToken } from "../../utils/verifyToken";
import { setUser, TUser, useCurrentUser } from "../../redux/slices/auth";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import OTPInput from "react-otp-input";

const Login = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isOTPSent, setOTPSent] = useState(false);
  const [OTP, setOTP] = useState("");
  const [userOTP, setUserOTP] = useState("");
  const [phone, setPhone] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);

  const [sendOtpFunc] = useSendOTPMutation();
  const [loginFunc] = useLoginMutation();

  // Handle sending OTP
  const handleSendOtp = async (values: FormikValues) => {
    setPhone(values.phone);
    try {
      const res = await sendOtpFunc({ phone: values.phone }).unwrap();
      if (res?.success) {
        setOTP(res?.data?.otp);
        setOTPSent(true);
        toast.success("OTP sent successfully!");
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.log("error:", error);
      toast.error("Error occurred while sending OTP.");
    }
  };

  // Handle OTP verification and login
  const matchOtpAndLogin = async () => {
    if (userOTP != OTP) {
      toast.error("OTP not matched!");
      return;
    }

    try {
      const res = await loginFunc({ phone }).unwrap();
      if (res?.success) {
        const user = verifyToken(res.token) as TUser;
        dispatch(setUser({ user: user, token: res.token }));
        setOTP(res?.data?.otp);
        toast.success("Logged in successfully!");
        setLoginModalOpen(false);
        setOTPSent(false);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.log("error:", error);
      toast.error("Error occurred during login.");
    }
  };

  return (
    <>
      {user ? (
        <Button
          onClick={() => dispatch(setUser({ user: null, token: null }))}
          variant="outlined"
          color="black"
          size="sm"
          className="text-base font-medium capitalize py-1 h-[40px]"
        >
          Logout
        </Button>
      ) : (
        <Button
          onClick={() => setLoginModalOpen(true)}
          variant="outlined"
          color="black"
          size="sm"
          className="text-base font-medium capitalize py-1 h-[40px]"
        >
          Log In
        </Button>
      )}

      {/* Custom Modal for Login */}
      <CustomModal
        size="xs"
        title="Login Form"
        open={isLoginModalOpen}
        setOpen={setLoginModalOpen}
      >
        {/* Conditional Form Rendering */}
        {!isOTPSent ? (
          // Form to Send OTP
          <FormikForm
            initialValues={{ phone: "" }}
            onSubmit={handleSendOtp}
            className="p-5"
          >
            <FormikInput name="phone" label="Phone" />
            <CustomButton label="Send OTP" type="submit" />
          </FormikForm>
        ) : (
          // Form to Verify OTP
          <div className="space-y-5">
            <OTPInput
              value={userOTP}
              onChange={setUserOTP}
              numInputs={4}
              containerStyle="otp-input-container gap-5"
              inputStyle="otp-input"
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
            <CustomButton
              onclick={() => matchOtpAndLogin()}
              disabled={userOTP.length < 3}
              label="Submit OTP"
              type="submit"
            />
          </div>
        )}
      </CustomModal>
    </>
  );
};

export default Login;
