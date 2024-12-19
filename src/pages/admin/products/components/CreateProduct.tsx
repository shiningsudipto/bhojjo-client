import { useState } from "react";
import CustomModal from "../../../../components/ui/CustomModal";
import CustomButton from "../../../../components/ui/CustomButton";
import FormikInput from "../../../../components/Formik/FormikInput";
import { Form, Formik, FormikValues } from "formik";
import ImgUpload from "../../../../components/Formik/ImgUpload";
import { toast } from "sonner";
import { useCreateProductMutation } from "../../../../redux/features/product";
import { TCategory, TErrorResponse } from "../../../../types";
import { useGetAllCategoryQuery } from "../../../../redux/features/category";
import { transformCategoriesIntoOptions } from "../../../../utils";
import FormikDropdown from "../../../../components/Formik/FormikDropdown";
import { useAppSelector } from "../../../../redux/hooks";
import { TUser, useCurrentUser } from "../../../../redux/slices/auth";

const initialValues = {
  title: "",
  weight: "",
  quantity: "",
  brand: "",
  price: "",
  purchasePrice: "",
  discount: "",
  details: "",
  images: [], // Updated to match the multiple image upload logic
  category: "",
};

const CreateProduct = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  const [isOpened, setIsOpened] = useState(false);
  const [createProductFunc, { isLoading, error }] = useCreateProductMutation();
  console.log(error);
  const { data, isLoading: isCategoriesLoading } = useGetAllCategoryQuery("");

  const categoryOptions = data?.data
    ? transformCategoriesIntoOptions(data.data as TCategory[])
    : [];

  const handleSubmit = async (values: FormikValues) => {
    setIsOpened(false);
    const toastId = toast.loading("Creating product, please wait!");

    const productData = {
      title: values.title,
      weight: values.weight,
      quantity: values.quantity,
      brand: values.brand,
      price: values.price,
      purchasePrice: values.purchasePrice,
      discount: values.discount,
      details: values.details,
      category: values.category,
      adminId: user?.id,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(productData));

    if (values.images && Array.isArray(values.images)) {
      values.images.forEach((image: File) => {
        formData.append("images", image);
      });
    }

    try {
      const res = await createProductFunc(formData).unwrap();
      toast.success(res.message, { id: toastId, duration: 2000 });
    } catch (err) {
      const apiError = err as TErrorResponse;
      toast.error(apiError?.data?.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div>
      <CustomButton
        label="Create Product"
        onclick={() => setIsOpened(true)}
        disabled={isCategoriesLoading}
      />
      <CustomModal title="Create Product" open={isOpened} setOpen={setIsOpened}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ setFieldValue, values }) => (
            <Form className="space-y-5">
              <div className="space-y-5">
                <FormikInput required name="title" label="Title" />
                <div className="grid grid-cols-2 gap-5">
                  <FormikInput
                    required
                    name="weight"
                    type="number"
                    label="Weight"
                  />
                  <FormikInput
                    required
                    name="quantity"
                    type="number"
                    label="Quantity"
                  />
                  <FormikInput required name="brand" label="Brand" />
                  <FormikInput
                    required
                    name="price"
                    type="number"
                    label="Price"
                  />
                  <FormikInput
                    name="purchasePrice"
                    type="number"
                    label="Purchased Price"
                  />
                  <FormikInput name="discount" type="number" label="Discount" />
                  <FormikDropdown
                    name="category"
                    options={categoryOptions}
                    label="Category"
                  />
                </div>
                <FormikInput name="details" label="Details" />
                <ImgUpload
                  required
                  setFieldValue={setFieldValue}
                  values={values}
                  name="images"
                  multiple={true}
                />
                <CustomButton
                  label={isLoading ? "Creating..." : "Create"}
                  type="submit"
                  disabled={isLoading}
                />
              </div>
            </Form>
          )}
        </Formik>
      </CustomModal>
    </div>
  );
};

export default CreateProduct;
