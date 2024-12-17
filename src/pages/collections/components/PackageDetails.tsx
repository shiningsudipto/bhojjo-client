import { useState } from "react";
import CustomModal from "../../../components/ui/CustomModal";
import CustomButton from "../../../components/ui/CustomButton";
import {
  useDeletePackageItemMutation,
  useGetPackageItemsByPackageQuery,
  useUpdatePackageItemMutation,
} from "../../../redux/features/package";
import { TErrorResponse, TPackageItem } from "../../../types";
import { Form, Formik, FormikValues } from "formik";
import { toast } from "sonner";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const PackageDetails = ({ id }: { id: String }) => {
  const [isDetailsPackageModalOpen, setDetailsPackageModalOpen] =
    useState(false);
  const { data } = useGetPackageItemsByPackageQuery(id);
  const [updatePackageItemFunc] = useUpdatePackageItemMutation();
  const [deletePackageItemFunc] = useDeletePackageItemMutation();

  const handleItemDelete = async (id: string) => {
    const toastId = toast.loading("Item deleting please wait...!");
    try {
      const res = await deletePackageItemFunc({ id: id }).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId });
      }
    } catch (error) {
      console.log("error:", error);
      const err = error as TErrorResponse;
      toast.error(err.data.message, { id: toastId });
    }
  };

  const handleSubmit = async (values: FormikValues) => {
    const toastId = toast.loading("Collection item updating!");
    try {
      const res = await updatePackageItemFunc(values).unwrap();
      console.log({ res });
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
    <div>
      <CustomButton
        onclick={() => setDetailsPackageModalOpen(true)}
        label="See Details"
        variant="outlined"
      />
      <CustomModal
        size="xs"
        title="Package items"
        open={isDetailsPackageModalOpen}
        setOpen={setDetailsPackageModalOpen}
      >
        <h3 className="text-lg font-bold">
          {data?.data?.length === 0 && "Items not available"}
        </h3>
        <div className="space-y-4">
          {data?.data?.map((item: TPackageItem) => (
            <div key={item?._id} className="flex justify-between">
              <div className="flex gap-5 items-center">
                <img
                  src="https://pqina.nl/pintura/static/assets/picture.svg"
                  alt=""
                  className="size-16"
                />
                <div>
                  <h2 className="text-lg font-bold text-black-300">
                    {item?.product?.title}
                  </h2>
                  <div className="flex  gap-5">
                    <p className="text-black-100">
                      Price: {item?.product?.price}
                    </p>
                    <Formik
                      initialValues={{ quantity: item.quantity, id: item?._id }}
                      onSubmit={handleSubmit}
                    >
                      {({ setFieldValue, values, dirty }) => {
                        return (
                          <Form className="flex items-center gap-3">
                            <p>Quantity: </p>
                            <button
                              type="button"
                              onClick={() =>
                                setFieldValue("quantity", values.quantity + 1)
                              }
                            >
                              <FiPlusCircle className="text-xl" />
                            </button>
                            <p>{values.quantity}</p>
                            <button
                              disabled={values.quantity == 1}
                              type="button"
                              onClick={() =>
                                setFieldValue("quantity", values.quantity - 1)
                              }
                            >
                              <FiMinusCircle className="text-xl" />
                            </button>
                            {dirty && (
                              <button
                                type="submit"
                                className="bg-gray-100 text-black-300 py-1 px-6 rounded-md font-medium border border-green-700 hover:bg-green-600 hover:text-white"
                              >
                                Save
                              </button>
                            )}
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  handleItemDelete(item?._id);
                }}
                className=" bg-gray-100 hover:bg-primary hover:text-white px-2 rounded-md"
              >
                <RiDeleteBin6Line className="text-lg" />
              </button>
            </div>
          ))}
        </div>
      </CustomModal>
    </div>
  );
};

export default PackageDetails;
