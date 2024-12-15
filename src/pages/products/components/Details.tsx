import { Carousel } from "@material-tailwind/react";
import { TProduct } from "../../../types";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { AiOutlinePercentage } from "react-icons/ai";

const Details = ({ details }: { details?: TProduct }) => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <div>
        <Carousel
          // autoplay={true}
          loop={true}
          className="z-0"
        >
          {details?.images?.map((item, index) => {
            console.log(item);
            return (
              <div key={index} className="w-full z-0">
                <img
                  // src={`http://localhost:5000${item}`}
                  src={`https://pqina.nl/pintura/static/assets/picture.svg`}
                  alt="image 1"
                  className="h-[300px] w-full object-cover rounded-md"
                />
              </div>
            );
          })}
        </Carousel>
      </div>
      <div>
        <h2 className="text-xl font-bold text-black-200">{details?.title}</h2>
        <p className="flex items-center text-black-100 font-semibold text-lg">
          Price {details?.price}
          <FaBangladeshiTakaSign className="text-base" />{" "}
        </p>
        <p className="flex items-center text-black-100">
          Purchased price: {details?.purchasePrice}
          <FaBangladeshiTakaSign className="text-xs text-black-300" />{" "}
        </p>
        {details?.discount && details?.discount > 0 && (
          <p className="text-black-100 font-normal flex items-center gap-1">
            <span className="text-black-300 font-medium">Discount:</span>{" "}
            {details?.discount} <AiOutlinePercentage />
          </p>
        )}
        <p className="text-black-100 font-normal">
          <span className="text-black-300 font-medium">Available:</span>{" "}
          {details?.quantity}
        </p>
        <p className="text-black-100 font-normal">
          <span className="text-black-300 font-medium">Brand:</span>{" "}
          {details?.brand}
        </p>
        <p className="text-black-100 font-normal">
          <span className="text-black-300 font-medium">Sold:</span>{" "}
          {details?.sold}
        </p>
        <p className="text-black-100 font-normal">
          <span className="text-black-300 font-medium">Details:</span>
        </p>
        <p className="text-black-100 font-normal">{details?.details}</p>
      </div>
    </div>
  );
};

export default Details;
