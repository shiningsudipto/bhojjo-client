import { Input } from "@material-tailwind/react";
import { ErrorMessage, Field, FieldProps } from "formik";

interface InputProps {
  name: string;
  label?: string;
  type?: string;
  required?: boolean;
  readOnly?: boolean;
}

const FormikInput = ({
  name,
  label,
  type = "text",
  required = false,
  readOnly = false,
}: InputProps) => {
  return (
    <div>
      <Field name={name}>
        {({ field }: FieldProps) => (
          <>
            <Input
              readOnly={readOnly}
              className="px-3"
              {...field}
              type={type}
              variant="standard"
              label={label}
              placeholder={label}
              crossOrigin={undefined}
              required={required}
              id={name}
            />
          </>
        )}
      </Field>
      <ErrorMessage name={name} component="p" className="text-danger" />
    </div>
  );
};

export default FormikInput;
