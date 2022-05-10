import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { RiShoppingCartLine } from "react-icons/ri";
import notfound from "../components/images-food/not-found.png";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();

  const [items, setItems] = useState([]);

  const [{ cartItems }, dispatch] = useStateValue();

  const addToCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    addToCart();
  }, [items]);

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-4 my-12 px-6 bg-black rounded-3xl scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item.id}
            className=" w-300 h-[340px] min-w-[300px] md:w-340  md:min-w-[340px]  flex flex-col items-center justify-between my-10 bg-white   rounded-lg p-4 backdrop-blur-xl drop-shadow-lg hover:drop-shadow-xl"
          >
            <div className="w-full flex items-center  justify-between">
              <motion.div
                className="w-40  h-40 flex drop-shadow-2xl"
                whileHover={{ scale: 1.1 }}
              >
                <img
                  src={item?.imageURL}
                  alt=""
                  className="w-full object-contain rounded-2xl"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center cursor-pointer hover:shadow-md"
                onClick={() => setItems([...cartItems, item])}
              >
                <RiShoppingCartLine className="text-white" />
              </motion.div>
            </div>
            <div className="w-full flex flex-col gap-4 pt-4 opacity-80 items-end justify-end">
              <p className="text-black font-semibold md:text-lg text-base">
                {item.title}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                {item.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-black font-semibold">
                  <span className="text-sm text-red-500">฿</span> {item.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center p-4">
          <img className="h-225 mt-4" src={notfound} alt="" />
          <p className=" text-xl font-semibold mt-4">Items Not Found</p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
