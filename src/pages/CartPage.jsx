/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LiaShoppingBagSolid } from "react-icons/lia";

import CartItem from "../components/CartItem";
import { UserContext } from "../hooks/UserContext";
import useCartContext from "../hooks/use-cart-context";
import OrderComponents from "../components/OrderComponents";
import Swal from "sweetalert2";
import axios from "axios";

function CartPage() {
  const { getUserCartItems, cartItems, setLoading, isloading } =
    useCartContext();
  const { userInfo } = useContext(UserContext);
  const userName = userInfo?.username;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    // try {
    if (userName) {
      getUserCartItems();
    }
    // } catch (err) {}
  }, [userName]);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.bookId.originalPrice, 0);
  };

  const createOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing or empty");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        "https://book-store-backend-sigma-one.vercel.app/orders",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 201) {
        try {
          setLoading(false);
          Swal.fire({
            title: "succed",
            text: "Order success !",
            icon: "success",
          });
          navigate("/library");
        } catch (err) {
          Swal.fire({
            title: "failed",
            text: "Order failed !",
            icon: "error",
          });
        }
      }
    } catch (err) {
      setLoading(false);
      Swal.fire({
        title: "failed",
        text: "Order failed !",
        icon: "error",
      });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (isloading) {
    // console.log(isloading);
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
      <section className="bg-white py-8 antialiased md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
            Shopping Cart
          </h2>
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">{renderedItems}</div>
            </div>
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <OrderComponents
                calculateTotalPrice={calculateTotalPrice}
                createOrder={createOrder}
                // handleClick={handleClick}
                isLoading={isloading}
              />
            </div>
          </div>
        </div>
      </section>
    ) : (
      // <main>
      //   <div>
      //     <section className="max-w-screen-md mx-auto px-4 py-14 mb-52">
      //       <h2 className="mb-10 text-2xl font-semibold">Your cart</h2>
      //       <ul className="flex flex-col gap-4">{renderedItems}</ul>
      //       <Link
      //         to="/orders"
      //         className="btn px-8 w-40 rounded-md bg-brown-200 hover:bg-white hover:border-brown-200"
      //       >
      //         Order
      //       </Link>
      //     </section>
      //   </div>
      // </main>
      <div className="flex flex-col justify-center items-center my-32 mx-auto text-center ">
        <LiaShoppingBagSolid
          className="text-black  mb-4 "
          style={{ fontSize: "300px" }}
        />
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
