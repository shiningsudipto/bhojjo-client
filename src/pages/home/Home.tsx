import { Button } from "@material-tailwind/react";
import Slider from "./components/Slider";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import CartDrawer from "../../components/shared/CartDrawer";

const Home = () => {
  return (
    <div>
      <div className="section-gap-x banner py-[100px] grid grid-cols-2">
        <div className="space-y-8">
          <h1 className="text-5xl font-bold leading-[72px]">
            রিটেইল ব্যবসার পরিপূর্ণ সমাধান
          </h1>
          <h2 className="text-2xl font-medium">
            বিশাল পণ্য সম্ভার | প্রতিদিন ডেলিভারি | বাকিতে পণ্য
          </h2>
          <Button className="text-base bg-primary hover:bg-primary-500">
            ব্যবসা শুরু করুন
          </Button>
        </div>
      </div>
      <Slider />
      <Contact />
      <FAQ />
      <CartDrawer />
    </div>
  );
};

export default Home;
