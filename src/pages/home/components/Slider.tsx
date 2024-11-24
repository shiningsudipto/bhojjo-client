import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperInstance } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { stepOptions } from "../helper";
import { TStepOption } from "../../../types";

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  console.log(activeIndex);
  const swiperRef = useRef<SwiperInstance | null>(null);

  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
      setActiveIndex(index);
    }
  };

  return (
    <div className="grid grid-cols-2 py-10">
      {/* left side */}
      <div>
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={false}
          // navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          <SwiperSlide className="flex justify-center">
            <img src="slider/s1.png" alt="" />
          </SwiperSlide>
          <SwiperSlide className="flex justify-center">
            <img src="slider/s2.png" alt="" />
          </SwiperSlide>
          <SwiperSlide className="flex justify-center">
            <img src="slider/s3.png" alt="" />
          </SwiperSlide>
          <SwiperSlide className="flex justify-center">
            <img src="slider/s4.png" alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
      {/* right side */}
      <div className="flex flex-col items-center gap-[10px] justify-center w-full">
        {stepOptions.map((item: TStepOption, index) => {
          const idx = index + 1;
          const isActiveIndexIncreased = activeIndex >= index;
          const isIndexMatched = activeIndex === index;
          return (
            <div className="flex items-start gap-[20px]">
              <div key={index} className="flex flex-col items-center">
                <p
                  className={`w-[35px] h-[35px] flex items-center justify-center ${
                    isActiveIndexIncreased ? "bg-primary" : "bg-gray-300"
                  } rounded-full text-white text-[1rem] ${
                    isIndexMatched && "activeStep"
                  }`}
                >
                  {idx}
                </p>
                {idx <= 3 && (
                  <>
                    <div
                      className={`w-[2px] h-[50px] ${
                        activeIndex > index ? "bg-primary" : "bg-gray-300"
                      }  mt-[10px]`}
                    ></div>
                  </>
                )}
              </div>

              <div>
                <h3
                  onClick={() => goToSlide(index)}
                  className={`text-[1.1rem] font-bold ${
                    isActiveIndexIncreased ? "text-primary" : "text-gray-700"
                  }`}
                >
                  {item.title}
                </h3>
                <p className="text-[0.9rem] text-gray-500">{item.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Slider;
