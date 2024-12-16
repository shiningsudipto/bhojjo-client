import { useState } from "react";
import {
  useAddItemIntoPackageMutation,
  useGetAllPackageByUserQuery,
} from "../../../redux/features/package";
import { TErrorResponse, TPackage } from "../../../types";
import CustomButton from "../../../components/ui/CustomButton";
import CustomModal from "../../../components/ui/CustomModal";
import { Form, Formik, FormikValues } from "formik";
import { Radio } from "@material-tailwind/react";
import { toast } from "sonner";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyPackages = ({ id, productId }: { id: String; productId: String }) => {
  const { data } = useGetAllPackageByUserQuery(id);
  const [isPackagesModalOpen, setPackagesModalOpen] = useState(false);
  const [addItemIntoPackageFunc] = useAddItemIntoPackageMutation();
  const handleSubmit = async (values: FormikValues) => {
    setPackagesModalOpen(false);
    const toastId = toast.loading("Product adding processing!");
    const data = {
      quantity: 1,
      product: productId,
      package: values.packageId,
    };

    try {
      const res = await addItemIntoPackageFunc(data).unwrap();
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
      <button
        onClick={() => setPackagesModalOpen(true)}
        className="backdrop-blur-lg p-1"
      >
        <FaRegHeart className="text-xl text-white" />
      </button>
      <CustomModal
        size="xs"
        title="My Collections"
        open={isPackagesModalOpen}
        setOpen={setPackagesModalOpen}
      >
        {data?.data?.length === 0 ? (
          <div>
            <h3 className="text-lg font-bold">Collection not available</h3>
            <Link to={"/account/my-collections"} className=" text-primary">
              Create Collection
            </Link>
          </div>
        ) : (
          <Formik initialValues={{}} onSubmit={handleSubmit} enableReinitialize>
            {({ setFieldValue }) => {
              return (
                <Form className="space-y-3 flex flex-col">
                  {data?.data?.map((item: TPackage) => {
                    return (
                      <Radio
                        value={item?._id}
                        onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                          setFieldValue(
                            "packageId",
                            (e.target as HTMLInputElement).value
                          )
                        }
                        crossOrigin={""}
                        key={item?._id}
                        name="packageId"
                        label={item?.name}
                      />
                    );
                  })}
                  <CustomButton type="submit" label="Add to collection" />
                </Form>
              );
            }}
          </Formik>
        )}
      </CustomModal>
    </div>
  );
};

export default MyPackages;
