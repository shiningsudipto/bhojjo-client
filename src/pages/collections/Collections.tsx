import CustomButton from "../../components/ui/CustomButton";
import { useGetAllPackageByUserQuery } from "../../redux/features/package";
import { useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentUser } from "../../redux/slices/auth";
import CreatePackage from "./components/Createpackage";
import { format } from "date-fns";
import PackageDetails from "./components/PackageDetails";
import { TPackage } from "../../types";

const Collections = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  console.log(user?.id);
  const { data } = useGetAllPackageByUserQuery(user?.id);
  console.log({ data });
  return (
    <div className="bg-white p-10 rounded-md">
      {/* header */}
      <div className="flex justify-between items-baseline">
        <div>
          <p className="text-xl font-semibold">
            Collections {data?.data?.length}
          </p>
          <p className="text-base">
            Tell us about yourself to help us make it easy for you to shop with
            us
          </p>
        </div>
        <div>
          <CreatePackage />
        </div>
      </div>
      {/* content */}
      <div className="grid grid-cols-3 gap-5 mt-10">
        {data?.data?.map((item: TPackage) => {
          return (
            <div
              key={item?._id}
              className="p-5 border border-gray-200 rounded-md space-y-3"
            >
              <h2 className="text-xl font-bold">{item?.name}</h2>
              <p className="text-lg font-medium">
                Total items:{item?.totalItems}
              </p>
              <p>
                Last edit: {format(new Date(item?.updatedAt), "dd-MMM-yyyy")}
              </p>
              <CustomButton label="Buy Now" />
              <PackageDetails id={item?._id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Collections;
