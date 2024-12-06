import { Button } from "@material-tailwind/react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="section-gap-x py-10 bg-white">
      <div className="flex justify-between">
        <div className="text-black-100 space-y-2">
          <h3 className="text-xl font-bold">
            Get faster, free delivery at market prices
          </h3>
          <p className="">Get the best </p>
        </div>
        <Button className="text-base font-medium bg-primary hover:bg-primary-500 capitalize">
          Call 01611777085 for support
        </Button>
      </div>
      <div className="flex justify-between items-center mt-10 text-black-100">
        <p className="font-medium">All right reserved by @Bhojjo ;)</p>
        <div className="flex items-center text-2xl gap-3 text-primary">
          <a href="/">
            <FaFacebook />{" "}
          </a>
          <a href="/">
            <FaInstagram />{" "}
          </a>
          <a href="/">
            <FaTwitter />{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
