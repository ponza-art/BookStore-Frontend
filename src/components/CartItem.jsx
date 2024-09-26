/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import useCartContext from "../hooks/use-cart-context";
import axios from "axios";

function CartItem(props) {
  const {book}=props
  // console.log(book);
  const { cartItems, setCartItems } = useCartContext();
  const token = localStorage.getItem("token");
  console.log(cartItems);
  const deleteBookById = async (id) => {
    try {
      const res = await axios.delete(
        `https://book-store-backend-sigma-one.vercel.app/cart/remove-item/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            bookId: id,
          },
        }
      );
      const data = res.data;
      setCartItems(data.items);
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  };
  console.log(cartItems.length > 0);
    
  {
    return cartItems.length > 0 ? (
     <div key={book.bookId}>
      <li key={book.bookId} className="relative h-52 flex  gap-x-5 mb-5 border shadow-2xl bg-white rounded-md ">
        <Link to={`/books/${book.bookId._id}`} className="w-32 h-36">
          <div className="relative w-full h-full rounded-md shadow-2xl ">
            <img
              className="absolute inset-0 w-full h-52   object-cover object-center"
              src={book.bookId.coverImage}
              alt="Book Image"
            />
          </div>
        </Link>

        <div className="flex flex-col items-start justify-center gap-2">
          <div>
            <span className="text-sm uppercase text-rose-500">
              {book.bookId.category}
            </span>

            <Link to={`/books/${book.bookId._id}`}>
              <h2 className="font-medium">{book.bookId.title}</h2>
            </Link>
          </div>

          <Link to="">
            <span className="text-sm text-gray-600">{book.bookId.author}</span>
          </Link>

          <span className="text-lg font-medium">{book.bookId.price}</span>

          <button
            className="absolute right-2 bottom-2 btn   w-40 py-3  rounded-md bg-brown-200  hover:bg-white hover:border-brown-200"
            onClick={() => deleteBookById(book.bookId._id)}
            
          >
            Delete
          </button>
        </div>
      </li>
      </div>
    ) : (
    <p className="w-fit my-7 mx-auto">No Data Found</p>
      
    );
  }
}
export default CartItem;
