import React, { useState, useRef, useEffect } from "react";
import logo from "./images-food/logo.png";
import { RiShoppingCartLine } from "react-icons/ri";
import { MdAdd, MdLogout } from "react-icons/md";
import avatar from "./images-food/avatar.png";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const ref = useRef();
  const [isMenu, setIsMenu] = useState(false);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenu && ref.current && !ref.current.contains(e.target)) {
        setIsMenu(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenu]);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
    console.log(user);
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-1 px-4 md:p-2 md:px-16 ">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full item-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-44 object-cover" src={logo} alt="logo" />
          {/* <p className="text-headingColor text-x1 font-bold">Taste</p> */}
        </Link>
        <div className="flex items-center gap-16 mb-20 px-12 bg-black rounded-full">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8 "
          >
            <li className="text-base text-stone-100 hover:text-red-600 duration-100 transition-all ease-in-out  hover:scale-125 cursor-pointer">
              Home
            </li>
            <li className="text-base text-stone-100 hover:text-red-600 duration-100 transition-all ease-in-out hover:scale-125 cursor-pointer">
              Menu
            </li>
            <li className="text-base text-stone-100 hover:text-red-600 duration-100 transition-all ease-in-out hover:scale-125 cursor-pointer">
              About Us
            </li>
            <li className="text-base text-stone-100 hover:text-red-600 duration-100 transition-all ease-in-out hover:scale-125 cursor-pointer">
              Service
            </li>
          </motion.ul>
          <div
            className="relative flex justify-center items-center"
            onClick={showCart}
          >
            <RiShoppingCartLine className="text-stone-100 text-2xl  cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-2 -right-3 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                <p className="text-xs text-white font-semibold ">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <div className="relative ">
            <motion.img
              whileTap={{ scale: 0.6 }}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full cursor-pointer "
              src={user ? user.photoURL : avatar}
              alt="false"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                ref={ref}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40  bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 "
              >
                {user && user.email === "khunkoeithanapol@gmail.com" && (
                  <Link to="/createItem">
                    <p className="p-2 flex items-center rounded-lg  gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-gray-600 text-base">
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  onClick={logout}
                  className="p-2 flex items-center rounded-lg  gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-gray-600 text-base"
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* moblie  */}
      <div className="flex items-center justify-between md:hidden w-full h-full  gap-8 mb-20 px-10 bg-black rounded-full">
        <div
          className="relative flex justify-center items-center"
          onClick={showCart}
        >
          <RiShoppingCartLine className="text-stone-100 text-2xl  cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-2 -right-3 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
              <p className="text-xs text-white font-semibold ">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>

        <Link to="/" className="flex items-center gap-2">
          <img className="w-20 object-cover" src={logo} alt="logo" />
          {/* <p className="text-headingColor text-x1 font-bold">Taste</p> */}
        </Link>
        <div className="relative ">
          <motion.img
            whileTap={{ scale: 0.6 }}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full cursor-pointer "
            src={user ? user.photoURL : avatar}
            alt="false"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40  bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 "
            >
              {user && user.email === "khunkoeithanapol@gmail.com" && (
                <Link to="/createItem">
                  <p className="mx-2 py-2 flex items-center rounded-lg  hover:text-red-600 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out hover:scale-110 text-gray-600 text-base">
                    New Item <MdAdd />
                  </p>
                </Link>
              )}

              <ul className="flex flex-col px-2 ">
                <li className="text-base text-stone-600 hover:text-red-600 duration-100 rounded-lg transition-all ease-in-out hover:scale-110 cursor-pointer hover:bg-slate-200 py-2">
                  Home
                </li>
                <li className="text-base text-stone-600 hover:text-red-600 duration-100 rounded-lg transition-all ease-in-out hover:scale-110 cursor-pointer hover:bg-slate-200 py-2">
                  Menu
                </li>
                <li className="text-base text-stone-600 hover:text-red-600 duration-100 rounded-lg transition-all ease-in-out hover:scale-110 cursor-pointer hover:bg-slate-200 py-2">
                  About Us
                </li>
                <li className="text-base text-stone-600 hover:text-red-600 duration-100 rounded-lg transition-all ease-in-out hover:scale-110 cursor-pointer hover:bg-slate-200 py-2">
                  Service
                </li>
              </ul>
              <p
                onClick={logout}
                className="mx-2 py-2 flex items-center rounded-lg  hover:text-red-600 gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out hover:scale-110 text-gray-600 text-base"
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
