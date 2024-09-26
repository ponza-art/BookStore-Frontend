import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCartContext from "../hooks/use-cart-context";
import { UserContext } from "../hooks/UserContext";
import Swal from "sweetalert2";
import axios from "axios";
import OrderComponents from "../components/OrderComponents";

export default function OrderPage() {
  const { getUserCartItems, cartItems } = useCartContext();
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const userName = userInfo?.username;
  useEffect(() => {
    try {
      if (userName) {
        getUserCartItems();
      }
    } catch (err) {}
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.bookId.price, 0);
  };

  const createOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing or empty");
      return;
    }
    try {
      const res = await axios.post(
        "https://book-store-backend-sigma-one.vercel.app/orders",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 201) {
        try {
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
      Swal.fire({
        title: "failed",
        text: "Order failed !",
        icon: "error",
      });
      console.log(err);
    }
  };

  const handleClick = () => {
    navigate("/cart");
  };
  return (
    <div>
      <OrderComponents
        calculateTotalPrice={calculateTotalPrice}
        createOrder={createOrder}
        handleClick={handleClick}
      />
    </div>
  );
}
