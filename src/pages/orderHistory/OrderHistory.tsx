import Loader from "../../components/shared/Loader";
import CustomTable from "../../components/ui/CustomTable";
import { useGetOrdersByUserQuery } from "../../redux/features/order";
import { useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentUser } from "../../redux/slices/auth";
import { format } from "date-fns";
import { TUserOrderHistory } from "../../types/order.types";

const tableHead = [
  "SL No.",
  "Date",
  "Total price",
  "Status",
  "Total products",
  "Product titles",
];

const OrderHistory = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  const { data, isLoading } = useGetOrdersByUserQuery(user?.id);
  return (
    <div className="bg-white p-5">
      <h1 className="text-2xl font-bold mb-5">Order History</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <CustomTable tableHead={tableHead}>
          {data?.data?.length === 0 ? (
            <p className="text-xl font-bold py-5">No order found</p>
          ) : (
            data?.data?.map((item: TUserOrderHistory, index: number) => {
              return (
                <tr key={item?._id}>
                  <td className="td-style">{index + 1}</td>
                  <td className="td-style ">
                    {format(
                      new Date(item?.createdAt || Date.now()),
                      "dd-MMM-yyyy"
                    )}
                  </td>
                  <td className="td-style">{item?.price}</td>
                  <td className="td-style capitalize">{item?.status}</td>
                  <td className="td-style">{item?.totalProducts}</td>
                  <td className="td-style">
                    {item?.items?.map((product, index) => (
                      <p>
                        {index + 1}/ {product?.productId?.title} -
                        {product?.quantity}
                      </p>
                    ))}
                  </td>
                </tr>
              );
            })
          )}
        </CustomTable>
      )}
    </div>
  );
};

export default OrderHistory;
