import React, { useContext, useState } from "react";
import axios from "axios";
import useCartContext from "../hooks/use-cart-context";
import { UserContext } from "../hooks/UserContext";
import Swal from "sweetalert2";
export default function PayButton() {
  const { cartItems } = useCartContext();
  const { userInfo } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const userId = userInfo.id;
  console.log(userId);
  const cartData = cartItems.map((book) => {
    return book.bookId;
  });

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing or empty");
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.post(
        `https://book-store-backend-sigma-one.vercel.app/stripe/create-checkout-session`,
        {
          cartData,
          userId: userInfo?.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 201) {
        try {
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          Swal.fire({
            title: "failed",
            text: "Order failed !",
            icon: "error",
          });
        }
      }
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        title: "failed",
        text: "Order failed !",
        icon: "error",
      });
      console.log(error.message);
    }
  };
  return (
    <div>
      

    <button
    onClick={handleCheckout}
    disabled={isLoading}
    className={`btn px-8 w-full font-bold rounded-md ${
      isLoading
        ? "bg-slate-700 text-white cursor-not-allowed"
        : "bg-brown-200 hover:bg-white hover:border-brown-200"
    }`}
  >
    {isLoading ? "CheckoutLoading..." : "Proceed to Checkout"}
  </button>
    </div>
  );
}
