/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CartItem from "../components/CartItem";
import { UserContext } from "../hooks/UserContext";
import useCartContext from "../hooks/use-cart-context";
import axios from "axios";

function CartPage() {
  const { getUserCartItems, cartItems, setCartItems, isloading,setLoading } =
    useCartContext();
  const { userInfo, setUserInfo } = useContext(UserContext);
  console.log(userInfo);
  const userName = userInfo?.username;

  console.log(userName);
  useEffect(() => {
    setLoading(true)
    try {
      if (userName) {
        getUserCartItems();
      }
    } catch (err) {}
  }, []);

  if (isloading) {
    return (
      <div className="flex justify-center items-center relative top-0 left-0 h-[50vh] w-fit my-[6.75rem] mx-auto ">
        <img src="/loader.gif" alt="Loading..." className="w-full h-full" />
      </div>
    );
  } else {
    const renderedItems = cartItems.map((book) => {
      return <CartItem key={book.bookId._id} book={book} />;
    });

    return (
      <main>
        <div>
          <section className="max-w-screen-md mx-auto px-4 py-14 mb-52">
            <h2 className="mb-10 text-2xl font-semibold">Your cart,</h2>

            <ul className="flex flex-col gap-4"> {renderedItems} </ul>

            <Link
              to="/"
              className="mt-5 btn  px-8  w-40 py-3  rounded-md bg-brown-200 hover:bg-white hover:border-brown-200 "
            >
              Order
            </Link>
          </section>
        </div>
      </main>
    );
  }
}

export default CartPage;
