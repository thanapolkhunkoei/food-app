import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";

const MenuContainer = () => {
  const [filter, setFilter] = useState("steak");

  const [{ foodItems }, dispatch] = useStateValue();

  return (
    <section className="w-full my-6" id="menu">
      <div className="flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold capitalize text-white relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-4 before:left-0 before:bg-gradient-to-r from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          Our Hot dishes
        </p>
        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category.id}
                className={`group  ${
                  filter === category.urlParaName ? "bg-red-500" : "bg-white"
                } w-24 min-w-[94px] pt-3 h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-items-start hover:bg-red-500 `}
                onClick={() => setFilter(category.urlParaName)}
              >
                <div
                  className={`w-10 h-10  rounded-full shadow-lg ${
                    filter === category.urlParaName ? "bg-white" : "bg-red-500"
                  } group-hover:bg-white flex items-center justify-center`}
                >
                  <IoFastFood
                    className={`${
                      filter === category.urlParaName
                        ? "text-black"
                        : "text-white"
                    } group-hover:text-black text-lg`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === category.urlParaName
                      ? "text-white"
                      : "text-black"
                  } group-hover:text-white text-center`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>
        <div className="w-full ">
          <RowContainer
            flag={false}
            data={foodItems?.filter((n) => n.category === filter)}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
