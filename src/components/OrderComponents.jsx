import { Link} from "react-router-dom";
import useCartContext from "../hooks/use-cart-context";
export default function OrderComponents({calculateTotalPrice,handleClick,createOrder}) {
  const { getUserCartItems, cartItems } = useCartContext();
  return (
    cartItems.length > 0 ? (
      <div className="flex items-center justify-center m-5">
        <div className="border shadow-2xl p-10">
          <h1 className="text-3xl text-brown-200 font-bold mb-3">Checkout</h1>
          <p className="font-bold text-black mb-3">
            Hi Bob, please review your items and press the confirm checkout button
            to place your order.
          </p>
          <hr />
  
          {cartItems.map((book) => {
            return (
              <div key={book.bookId._id} className="flex justify-between items-start py-3 cursor-pointer " onClick={handleClick} >
                <div className="flex">
                  <div className="h-44 w-32">
                    <img
                      src={book.bookId.coverImage}
                      alt="book"
                      className="w-full h-full rounded-md"
                    />
                  </div>
                  <h2 className="text-xl mt-3 ml-3">{book.bookId.title}</h2>
                </div>
                <p className="text-xl font-bold mt-3 mr-3">
                  ${book.bookId.price}
                </p>
              </div>
            );
          })}
  
          <hr />
  
          <div>
            <div className="flex justify-between my-5">
              <p className="text-xl font-bold">Total:</p>
              <p className="text-xl font-bold">${calculateTotalPrice()}</p>
            </div>
          </div>
          <hr />
          <div className="flex items-end justify-end mt-5">
            <button 
              onClick={createOrder} 
              className="btn px-8 w-52 font-bold rounded-md bg-brown-200 hover:bg-white hover:border-brown-200"
            >
              Confirm Checkout
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex items-center justify-center m-5">
        <p className="text-xl">No order Found </p>
      </div>
    )
  );
}
