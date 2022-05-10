import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
let items = [];

const CartItem = ({ item, setFlag, flag }) => {
  const [qty, setQty] = useState(item.qty);
  // const [items, setItems] = useState([]);
  const [{ cartItems }, dispatch] = useStateValue();

  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
  };

  const updateQty = (action, id) => {
    if (action == "add") {
      setQty(qty + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag + 1);
        }
      });
      cartDispatch();
    } else {
      if (qty == 1) {
        items = cartItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setQty(qty - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(flag + 1);
          }
        });
        cartDispatch();
      }
    }
  };

  useEffect(() => {
    items = cartItems;
  }, [qty, items]);

  return (
    <div className="w-full p-1 px-2 rounded-2xl bg-gray-300 flex items-center gap-2">
      <img
        className="w-20 h-20 max-w-[60px]  rounded-2xl object-contain"
        src={item?.imageURL}
        alt=""
      />
      {/* item name */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-900">{item?.title}</p>
        <p className="text-sm block font-semibold ">
          ฿ {parseFloat(item?.price) * qty}
        </p>
      </div>
      {/* button */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", item?.id)}
        >
          <BiMinus />
        </motion.div>
        <p className="w-5 h-5 rounded-sm  text-black flex items-center justify-center">
          {qty}
        </p>
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", item?.id)}
        >
          <BiPlus />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
