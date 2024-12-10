import { useParams } from "react-router-dom";

const Products = () => {
  const params = useParams();
  const id = params?.id;
  return (
    <div>
      <p>Hello, Products!</p>
    </div>
  );
};

export default Products;
