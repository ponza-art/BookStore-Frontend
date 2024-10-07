import React, { useContext, useState } from "react";
import axios from "axios";
import useCartContext from "../hooks/use-cart-context";
import { UserContext } from "../hooks/UserContext";
import Swal from "sweetalert2";

export default function PayButton() {
  const { cartItems } = useCartContext();
  const { userInfo } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleCheckout = async () => {
    if (!token) {
      console.error("Token is missing or empty");
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.post(
        `https://book-store-backend-sigma-one.vercel.app/paymob/`,
        {
          cartData: cartItems.map((book) => book.bookId),
          userId: userInfo?.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 201) {
        setIsLoading(false);
        const paymentUrl = `https://accept.paymob.com/api/acceptance/iframes/864563?payment_token=${res.data.paymentToken}`;
        console.log(res.data.paymentToken);
        window.location.href = paymentUrl;
      } else {
        setIsLoading(false);
        Swal.fire({
          title: "Failed",
          text: "Order failed!",
          icon: "error",
        });
      }
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        title: "Failed",
        text: "Sorry, You are blocked, please contact us",
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
