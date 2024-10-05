import { createContext, useContext, useEffect, useState } from "react";

 const OrderContext = createContext({});

export const OrderContextProvider = ({ children }) => {
    const [orderBookId, setOrderBookId] = useState([]);
    const token = localStorage.getItem("token");
    const getOrderData = async () => {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.get(
          "https://book-store-backend-sigma-one.vercel.app/orders",
          config
        );
        if (res.status === 200) {
          const bookOrder = res.data.map((order) => {
            return order.books;
          });
          const flattenedBooks = bookOrder?.flat();
    
          const bookIds = flattenedBooks.map((book) => {
            return book.bookId._id;
          });
    
          setOrderBookId(bookIds);
        }
      };
  
  return (
    <OrderContext.Provider value={{ orderBookId, setOrderBookId,getOrderData }}>
      {children}
    </OrderContext.Provider>
  );
};
export const useOrder = () => useContext(OrderContext);