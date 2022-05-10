import React, { useEffect, useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { motion } from "framer-motion";
import { IoIosRefresh } from "react-icons/io";

import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import emptyCart from "./images-food/empty-cart.png";
import CartItem from "./CartItem";

const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [tot, setTot] = useState(0);
  const [flag, setFlag] = useState(0);

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
    console.log(tot);
  }, [tot, flag]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });
    localStorage.setItem("cartitems", JSON.stringify([]));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between p-6 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineArrowBackIos className="text-2xl" />
        </motion.div>
        <p className=" text-lg font-semibold">Cart</p>

        <motion.p
          onClick={clearCart}
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-black rounded-md hover:shadow-md  cursor-pointer text-white text-base"
        >
          Clear
          <IoIosRefresh />
        </motion.p>
      </div>
      {/* bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-black rounded-t-[2rem] flex flex-col">
          {/* Cart items section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* Cart item */}
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  setFlag={setFlag}
                  flag={flag}
                />
              ))}
          </div>

          {/* cart total */}
          <div className="w-full flex-1 bg-gray-200 rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            {/* <div className="w-full flex items-center justify-center">
              <p className="text-lg text-white">Sub Total </p>
              <p className="text-lg"> ฿ {tot}</p>
            </div> */}
            {/* <div className="w-full flex items-center justify-center">
              <p className="text-lg">Delivery</p>
              <p className="text-lg">฿ 174</p>
            </div> */}
            <div className="w-full border-b bg-gray-700 my-2"></div>
            <div className="w-full flex items-center justify-between">
              <p className="text-stone-900 text-xl font-semibold">Total</p>
              <p className="text-stone-900 text-xl font-semibold">฿ {tot}</p>
            </div>

            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-black text-white text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out"
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-orange-400 text-black text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out"
              >
                Login to Checkout
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-5">
          <img src={emptyCart} alt="" className="w-300" />
          <p className="text-xl font-semibold"></p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
