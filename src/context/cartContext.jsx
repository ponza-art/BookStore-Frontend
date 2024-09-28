/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

function CartProvider({ children }) {
  // const user = JSON.parse(localStorage.getItem('user'));
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");
  const [isloading,setLoading]=useState(false)
  
  const getUserCartItems = async () => {
    try {
      setLoading(true)
      const res = await axios.get(
        "https://book-store-backend-sigma-one.vercel.app/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
      const data = res.data;
      setCartItems(data.items);
      setLoading(false)
    } catch (error) {
      // console.log("There is an error loading data...", error);
      setLoading(false)
    }
  };
  

  return (
    <CartContext.Provider value={{cartItems,setCartItems,getUserCartItems,isloading,setLoading}}>{children}</CartContext.Provider>
  );
}

export { CartProvider };
export default CartContext;
