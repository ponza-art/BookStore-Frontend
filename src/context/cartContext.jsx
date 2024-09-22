/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import axios from 'axios';

const CartContext = createContext();

function CartProvider({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));

  const [cartItems, setCartItems] = useState([]);
  // console.log(cartItems);

  const getUserCartItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/cart', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = res.data;
      // console.log(data);

      setCartItems(data.items);
    } catch (error) {
      console.log('There is an error loading data...', error);
    }
  };

  const deleteBookById = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/cart/remove-item/`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          data: {
            bookId: id,
          },
        }
      );
      const data = res.data;
      // console.log(data);

      setCartItems(data.items);
    } catch (error) {
      console.log('Error deleting item:', error);
    }
  };

  const valueToShare = {
    user,
    cartItems,
    getUserCartItems,
    deleteBookById,
  };

  return (
    <CartContext.Provider value={valueToShare}>{children}</CartContext.Provider>
  );
}

export { CartProvider };
export default CartContext;
