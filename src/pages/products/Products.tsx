import { useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useGetAllProductQuery } from "../../redux/features/product";

const Products = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Extract query parameters
  const category = searchParams.get("category") || "";
  const maxPrice = searchParams.get("maxPrice") || "2000";
  const sortOrder = searchParams.get("sortOrder") || "asc";
  const searchTerm = searchParams.get("searchTerm") || "";

  // Construct query string dynamically
  const query = {
    category,
    searchTerm,
    sortOrder,
    maxPrice,
  };

  const { data, isLoading, error } = useGetAllProductQuery(query);
  const productData = data?.data;

  console.log(productData);

  return (
    <div className="section-gap-xy flex gap-10">
      <div className="bg-gray-50 w-[25%] p-5 rounded-md">
        <Sidebar />
      </div>
      <div className="bg-gray-50 w-[75%] p-5 rounded-md">
        {productData?.map((item) => (
          <div key={item?._id}>
            <h2>{item?.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
