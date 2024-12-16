import { Button } from "@material-tailwind/react";

interface CustomButtonProps {
  label: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "outlined" | "filled";
  onclick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  type = "button",
  variant = "filled",
  disabled = false,
  onclick,
}) => {
  return (
    <Button
      size="sm"
      disabled={disabled}
      onClick={onclick}
      type={type}
      fullWidth
      variant={variant}
      className={` font-medium ${
        variant === "filled"
          ? "bg-primary hover:bg-primary-500"
          : "text-primary border-primary font-semibold"
      } hover:shadow-none text-base capitalize`}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
