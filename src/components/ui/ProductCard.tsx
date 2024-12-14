import { Button } from "@material-tailwind/react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { TProduct } from "../../types";
import { useState } from "react";
import CustomModal from "./CustomModal";
import Details from "../../pages/products/components/Details";

const ProductCard = ({ products }: { products: TProduct[] }) => {
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [productDetails, setProductDetails] = useState<TProduct>();
  return (
    <>
      <div className="grid grid-cols-3 gap-x-5 gap-y-10">
        {products?.map((item) => {
          return (
            <div key={item?._id} className="space-y-2">
              <img
                src={`http://localhost:5000${item.images[0]}`}
                alt=""
                className="h-[250px] w-full object-cover rounded-md"
              />
              <h5 className="text-xl font-semibold">{item.title}</h5>
              <p className="flex items-center text-black-100 font-semibold text-lg">
                {item.price}
                <FaBangladeshiTakaSign className="" />{" "}
              </p>
              <Button
                className="capitalize text-[16px] font-medium bg-primary hover:shadow-none"
                size="sm"
                fullWidth
              >
                Add to cart
              </Button>
              <Button
                onClick={() => {
                  setProductDetails(item);
                  setDetailsModalOpen(true);
                }}
                className="capitalize text-[16px] font-medium hover:shadow-none bg-transparent"
                size="sm"
                fullWidth
                variant="outlined"
              >
                More details
              </Button>
            </div>
          );
        })}
      </div>
      <CustomModal open={isDetailsModalOpen} setOpen={setDetailsModalOpen}>
        <Details details={productDetails} />
      </CustomModal>
    </>
  );
};

export default ProductCard;
