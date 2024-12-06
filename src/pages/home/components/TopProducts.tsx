// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Button } from "@material-tailwind/react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";
// @ts-ignore
import "swiper/css/navigation";

const products = [
  {
    title: "Fresh Apples",
    price: 29.99,
    img: "https://www.tastingtable.com/img/gallery/the-absolute-best-way-to-keep-apples-fresh/intro-1648153419.webp",
    stock: 15,
  },
  {
    title: "Organic Bananas",
    price: 19.99,
    img: "https://www.heirloomfoods.co.za/cdn/shop/files/Bananna.1_c0ff2530-5990-49e2-968e-1d3ece542413.jpg",
    stock: 25,
  },
  {
    title: "Whole Wheat Bread",
    price: 3.99,
    img: "https://images.getrecipekit.com/20230728144103-md-100-whole-wheat-bread-11-1-of-1-scaled.jpg",
    stock: 50,
  },
  {
    title: "Almond Milk",
    price: 5.49,
    img: "https://i0.wp.com/stephanieleenutrition.com/wp-content/uploads/2022/06/Untitled-design-8-e1654793763569.png",
    stock: 30,
  },
  {
    title: "Brown Rice",
    price: 10.99,
    img: "https://veganfamilykitchen.com/wp-content/uploads/2019/04/how-to-cook-brown-rice-easiest-simplest-healthiest-way-featureimage-1.jpg",
    stock: 20,
  },
  {
    title: "Fresh Tomatoes",
    price: 2.99,
    img: "https://cdn.kqed.org/wp-content/uploads/sites/24/2012/10/IMG_5485.jpg",
    stock: 100,
  },
];

const TopProducts = () => {
  return (
    <div className="section-gap-x section-gap-y">
      <div className="flex justify-between">
        <div>
          <h3 className="section-heading">Products</h3>
          <p className="font-medium">Lorem ipsum dolor sit amet consectetur.</p>
        </div>
        <div>
          <Button
            className="capitalize text-[16px] font-medium bg-primary hover:shadow-none"
            size="sm"
          >
            View all
          </Button>
        </div>
      </div>
      <Swiper
        slidesPerView={4}
        // cssMode={true}
        navigation={true}
        // pagination={true}
        mousewheel={true}
        keyboard={true}
        spaceBetween={30}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="topProducts mt-10"
      >
        {/* Initialize the array with values to enable mapping */}
        {products.map((item, index) => (
          <SwiperSlide key={index} className="bg-white space-y-4">
            <img
              src={item.img}
              alt=""
              className="h-[250px] w-full object-cover rounded-md"
            />
            <div className="flex items-center justify-between text-xl font-semibold">
              <h5>{item.title}</h5>
              <p className="flex items-center">
                {item.price}
                <FaBangladeshiTakaSign className="text-lg" />{" "}
              </p>
            </div>
            <p>
              <span className="font-semibold">{item.stock}</span> Products
              available
            </p>
            <Button
              className="capitalize text-[16px] font-medium bg-primary hover:shadow-none"
              size="sm"
              fullWidth
            >
              Add to cart
            </Button>
            <Button
              className="capitalize text-[16px] font-medium hover:shadow-none bg-transparent"
              size="sm"
              fullWidth
              variant="outlined"
            >
              More details
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopProducts;
