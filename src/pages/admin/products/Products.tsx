import { toast } from "sonner";
import CustomTable from "../../../components/ui/CustomTable";
import {
  useDeleteProductMutation,
  useGetAllProductForAdminQuery,
} from "../../../redux/features/product";
import { TErrorResponse, TProduct } from "../../../types";
import CreateProduct from "./components/CreateProduct";

const tableHead = [
  "SL No.",
  "Title",
  "Brand",
  "Price",
  "A. quantity",
  "Discount",
  "Category",
  "Action",
];

const Products = () => {
  const [deleteProductFunc] = useDeleteProductMutation();
  const { data } = useGetAllProductForAdminQuery("");
  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Product deleting, please wait!");
    try {
      const res = await deleteProductFunc({ id: id }).unwrap();
      console.log({ res });
      toast.success(res.message, { id: toastId, duration: 2000 });
    } catch (error) {
      const apiError = error as TErrorResponse;
      toast.error(apiError?.data?.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <div>
      <div className="flex justify-end mb-5">
        <CreateProduct />
      </div>
      <CustomTable tableHead={tableHead}>
        {data?.data?.length === 0 ? (
          <p className="text-xl font-bold py-5">No order found</p>
        ) : (
          data?.data?.map((item: TProduct, index: number) => {
            return (
              <tr key={item?._id}>
                <td className="td-style">{index + 1}</td>
                <td className="td-style">{item?.title}</td>
                <td className="td-style">{item?.brand}</td>
                <td className="td-style capitalize">{item?.price}</td>
                <td className="td-style">{item?.quantity}</td>
                <td className="td-style">{item?.discount}</td>
                <td className="td-style">{item?.category}</td>
                <td className="td-style flex gap-3">
                  <button onClick={() => handleDelete(item?._id)}>
                    Delete
                  </button>
                  <button>Update</button>
                </td>
              </tr>
            );
          })
        )}
      </CustomTable>
    </div>
  );
};

export default Products;
