import { useState } from "react";
import CustomModal from "../../../components/ui/CustomModal";
import CustomButton from "../../../components/ui/CustomButton";
import { useGetPackageItemsByPackageQuery } from "../../../redux/features/package";
import { TPackageItem } from "../../../types";

const PackageDetails = ({ id }: { id: String }) => {
  const [isDetailsPackageModalOpen, setDetailsPackageModalOpen] =
    useState(false);
  const { data } = useGetPackageItemsByPackageQuery(id);
  console.log(data);
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
            <div key={item?._id} className="flex gap-5 items-center">
              <img
                src="https://pqina.nl/pintura/static/assets/picture.svg"
                alt=""
                className="size-16"
              />
              <div>
                <h2 className="text-lg font-bold text-black-300">
                  {item?.product?.title}
                </h2>
                <p className="text-black-100">Price: {item?.product?.price}</p>
              </div>
            </div>
          ))}
        </div>
      </CustomModal>
    </div>
  );
};

export default PackageDetails;
