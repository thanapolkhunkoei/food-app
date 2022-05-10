import React from "react";
import Delivery from "./images-food/Delivery.png";
import steakbg2 from "./images-food/steakbg2.jpg";
// import steakbg1 from "./images-food/steakbg1.jpg";
import csG1 from "./images-food/csG1.jpeg";
import prG1 from "./images-food/prG1.jpeg";
import psG1 from "./images-food/psG1.jpeg";
import { ProductData } from "../utils/data";

const HomeContainer = () => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-8"
      id="home"
    >
      <div className="py-20 flex-1 flex flex-col items-start md:items-start justify-center gap-6">
        {/* <div className="flex item-center gap-2 justify-center bg-orange-200 px-2 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 rounded-full overflow-hidden drop-shadow-xl">
            <img
              className="w-full h-full object-contain"
              src={Delivery}
              alt="Delivery"
            />
          </div>
        </div> */}

        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-stone-100">
          DELICIOUS
          <span className="text-red-900 text-[3rem] lg:text-[5rem]"> MENU</span>
        </p>

        <p className="textbase text-stone-100 text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
          consectetur ullam, perferendis debitis alias magnam est ab beatae
          impedit dignissimos cumque. Nisi fugiat tempore voluptatibus beatae,
          aut rem ipsam quia, itaque et possimus perspiciatis quaerat commodi? .
        </p>

        <button
          type="button"
          className="bg-gradient-to-br from-orange-300 to-orange-500 w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 md:w-auto"
        >
          Order Now
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative">
        {/* <img
          className="h-auto w-auto rounded-xl opacity-60"
          src={steakbg2}
          alt=""
        /> */}

        <div className="w-full h-full px-4  md:absolute flex top-0 left-0 items-center justify-center  lg:px-22 2xl:px-32 py-4 gap-4 flex-wrap">
          {ProductData &&
            ProductData.map((p) => (
              <div
                key={p.id}
                className=" lg:mx-1 mx-2 2xl:mx-2 lg:w-190 p-4 bg-cardOverlay backdrop-blur-lg rounded-3xl flex flex-col items-center justify-center text-center"
              >
                <img
                  className="w-20 lg:w-40 -mt-10 lg:-mt-20 rounded-3xl mb-2"
                  src={p.img}
                  alt=""
                />
                <p className="text-base lg:text-md font-semibold mt-2 lg:mt4 text-stone-900">
                  {p.name}
                </p>
                <p className="text-[10px] lg:text-sm text-gray-100 font-semibold my-1 lg:my-2 ">
                  {p.desc}
                </p>
                <p className="text-sm font-semibold text-stone-800">
                  {p.price} <span className="text-xs text-red-600">฿</span>
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
