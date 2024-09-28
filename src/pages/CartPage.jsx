/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LiaShoppingBagSolid } from "react-icons/lia";


import CartItem from "../components/CartItem";
import { UserContext } from "../hooks/UserContext";
import useCartContext from "../hooks/use-cart-context";

function CartPage() {
  const { getUserCartItems, cartItems, setLoading, isloading } = useCartContext();
  const { userInfo } = useContext(UserContext);
  const userName = userInfo?.username;

  useEffect(() => {
    setLoading(true);
    try {
      if (userName) {
        getUserCartItems();
      }
    } catch (err) {}
  }, []);

  if (isloading) {
    return (
      <div className="flex justify-center items-center relative top-0 left-0 h-[50vh] w-fit my-[6.75rem] mx-auto">
        <img src="/loader.gif" alt="Loading..." className="w-full h-full" />
      </div>
    );
  } else {
    const renderedItems = cartItems.map((book, index) => {
      return <CartItem key={index} book={book} />;
    });

    return cartItems.length > 0 ? (
      <main>
        <div>
          <section className="max-w-screen-md mx-auto px-4 py-14 mb-52">
            <h2 className="mb-10 text-2xl font-semibold">Your cart</h2>
            <ul className="flex flex-col gap-4">{renderedItems}</ul>
            <Link
              to="/orders"
              className="btn px-8 w-40 rounded-md bg-brown-200 hover:bg-white hover:border-brown-200"
            >
              Order
            </Link>
          </section>
        </div>
      </main>
    ) : (
      <div className="flex flex-col justify-center items-center my-32 mx-auto text-center ">
        <LiaShoppingBagSolid   className="text-black  mb-4 " style={{fontSize:"300px"}} />
        <p className="text-xl text-gray-700">Your cart is currently empty.</p>
        <Link
          to="/books"
          className="mt-4 px-6 py-2 bg-brown-200 hover:bg-white border border-brown-200 rounded-md"
        >
          Return to shop
        </Link>
      </div>
    );
  }
}

export default CartPage;
