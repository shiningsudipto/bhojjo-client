import CustomButton from "../../components/ui/CustomButton";
import {
  useDeletePackageMutation,
  useGetAllPackageByUserQuery,
} from "../../redux/features/package";
import { useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentUser } from "../../redux/slices/auth";
import CreatePackage from "./components/Createpackage";
import { format } from "date-fns";
import PackageDetails from "./components/PackageDetails";
import { TErrorResponse, TPackage } from "../../types";
import Loader from "../../components/shared/Loader";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import CustomModal from "../../components/ui/CustomModal";
import { toast } from "sonner";

const Collections = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  const { data, isLoading } = useGetAllPackageByUserQuery(user?.id);
  const [deleteCollectionFunc] = useDeletePackageMutation();
  const [isDeleteCollectionModalOpen, setDeleteCollectionModalOpen] =
    useState(false);
  const [selectedCollection, setSelectedCollection] = useState<TPackage>();
  const handleCollectionDelete = async () => {
    setDeleteCollectionModalOpen(false);
    const toastId = toast.loading("Collection deleting please wait...!");
    try {
      const res = await deleteCollectionFunc({
        id: selectedCollection?._id,
      }).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId });
      }
    } catch (error) {
      console.log("error:", error);
      const err = error as TErrorResponse;
      toast.error(err.data.message, { id: toastId });
    }
  };
  return (
    <>
      <div className="bg-white p-10 rounded-md">
        {/* header */}
        <div className="flex justify-between items-baseline">
          <div>
            <p className="text-xl font-semibold">
              Collections {data?.data?.length}
            </p>
            <p className="text-base">
              Tell us about yourself to help us make it easy for you to shop
              with us
            </p>
          </div>
          <div>
            <CreatePackage />
          </div>
        </div>
        {/* content */}
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-3 gap-5 mt-10">
            {data?.data?.map((item: TPackage) => {
              return (
                <div
                  key={item?._id}
                  className="p-5 border border-gray-200 rounded-md space-y-3 relative "
                >
                  <button
                    onClick={() => {
                      setSelectedCollection(item);
                      setDeleteCollectionModalOpen(true);
                    }}
                    className="absolute top-1 right-1 bg-gray-100 hover:bg-primary hover:text-white p-1 rounded-md"
                  >
                    <RiDeleteBin6Line className="text-lg" />
                  </button>
                  <h2 className="text-xl font-bold">{item?.name}</h2>
                  <p className="text-lg font-medium">
                    Total items:{item?.totalItems}
                  </p>
                  <p>
                    Last edit:{" "}
                    {format(new Date(item?.updatedAt), "dd-MMM-yyyy")}
                  </p>
                  <CustomButton label="Buy Now" />
                  <PackageDetails id={item?._id} />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <CustomModal
        open={isDeleteCollectionModalOpen}
        setOpen={setDeleteCollectionModalOpen}
        title="Delete Collection"
        size="xs"
        footer
        onClick={handleCollectionDelete}
      >
        <h2 className="text-xl font-medium">Are you sure?</h2>
        <p className="text-lg">
          You want to delete{" "}
          <span className="text-xl font-bold">{selectedCollection?.name}?</span>
        </p>
      </CustomModal>
    </>
  );
};

export default Collections;
