import Sidebar from "./components/Sidebar";

const Products = () => {
  return (
    <div className="section-gap-xy flex gap-10">
      <div className="bg-gray-50 w-[25%] p-5 rounded-md">
        <Sidebar />
      </div>
      <div className="bg-gray-50 w-[75%] p-5 rounded-md">
        <p>Products</p>
      </div>
    </div>
  );
};

export default Products;
