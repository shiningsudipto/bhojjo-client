import { Button } from "@material-tailwind/react";
import bazarImg from "../../../assets/roadside-bazar.png";
import { TbTruckDelivery, TbDiscount } from "react-icons/tb";
const options = [
  {
    title: "Free Delivery",
    content:
      "We provide free delivery to all locations in Dhaka. No hidden charges involved",
    icon: <TbTruckDelivery />,
  },
  {
    title: "Market Prices",
    content: "We work directly with suppliers to bring you market prices.",
    icon: <TbDiscount />,
  },
  {
    title: "Create personalized order list",
    content:
      "Create and modify your shopping lists, making it easy to shop again.",
    icon: <TbDiscount />,
  },
];
const Delivery = () => {
  return (
    <div className="section-gap-x section-gap-y bg-gray-100">
      <div className="grid grid-cols-2 gap-x-24">
        <div className="space-y-5">
          <h2 className="text-black-100 font-bold text-4xl">
            Free delivery at market prices.
          </h2>
          <p className="text-black-200 font-medium">
            Get your groceries, daily essentials, and other necessities
            delivered for free—always at market prices! Save time by storing
            your favorite grocery lists, making reordering quick and convenient.
            Avoid the hassle of traffic and bad weather—place your order with us
            and enjoy shopping from the comfort of your home.
          </p>
          <Button className="text-base bg-primary hover:bg-primary-500 hover:shadow-none capitalize font-normal">
            Shop Now
          </Button>
        </div>
        <div>
          <img src={bazarImg} alt="bazar" />
        </div>
      </div>
      <div className="grid grid-cols-3 pt-14 gap-x-20">
        {options.map((item, index) => {
          return (
            <div key={index}>
              <p className="text-2xl text-primary mb-5">{item.icon}</p>
              <h3 className="text-xl font-bold text-black-100">{item.title}</h3>
              <p className="text-gray-200 font-medium mt-[15px]">
                {item.content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Delivery;
