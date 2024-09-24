/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { CreditCard, BadgeCheck, MessageCircleQuestion } from "lucide-react";
import { PiFileArrowDownDuotone } from "react-icons/pi";
import toast from "react-hot-toast";
import CartContext from "../context/cartContext"; // Import CartContext

function DetailsPage() {
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Loading state for the add to cart button
  const { id } = useParams();
  
  // Access cart items and methods from CartContext
  const { cartItems, getUserCartItems } = useContext(CartContext);

  // Fetch book details from API
  const fetchBook = async (id) => {
    try {
      const res = await axios.get(
        `https://book-store-backend-sigma-one.vercel.app/book/${id}`
      );
      setBook(res.data);
    } catch (error) {
      console.log("There is an error loading data...", error);
    }
  };

  useEffect(() => {
    fetchBook(id);
    getUserCartItems(); // Ensure cart items are loaded when this component is mounted
  }, [id]);

  // Check if the book is already in the cart
  const isInCart = cartItems.some((item) => item.bookId === id);

  const addToCart = async () => {
    setIsLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post(
        "https://book-store-backend-sigma-one.vercel.app/cart/", 
        { bookId: id },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (res.status === 201) {
        toast.success("Book added to cart successfully!");
        getUserCartItems(); // Update cart after adding the book
      } else {
        toast.error("Failed to add book to cart.");
      }
    } catch (error) {
      console.log("Error adding book to cart:", error);
      toast.error("There was an error adding the book to the cart.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="my-[9vh]">
      <section className="py-14">
        <div className="px-6 max-w-screen-2xl mx-auto grid gap-7 md:grid-cols-3 md:items-center lg:grid-cols-4">
          <div className="justify-self-center">
            <div className="carousel w-64">
              <div id="item1" className="carousel-item w-full">
                <img src={book.coverImage} className="w-full" alt="Book Image" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-7 md:col-span-2">
            <div className="flex flex-col gap-4">
              <h1 className="font-medium text-3xl max-w-xl">{book.title}</h1>
              <span className="badge bg-yellow-600 text-lg ">{book.category}</span>
              <p className="text-md max-w-xl">{book.description}</p>
              <p className="text-gray-700">{book.author}</p>
              <p className="text-xl font-sans font-bold">{book.price}$</p>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center justify-center">
              <Link
                to={book.sourcePath}
                target="_blank"
                className="flex items-center justify-center gap-2 font-semibold bg-transparent text-[#4A2C2A] border-2 border-yellow-600 rounded-md px-6 py-2 hover:bg-yellow-600 hover:text-white transition-all duration-300"
              >
                Download
                <PiFileArrowDownDuotone size={28} />
              </Link>

              <button
                onClick={addToCart}
                disabled={isInCart || isLoading} // Disable button if book is in cart or loading
                className={`flex items-center justify-center gap-2 rounded-md px-6 py-2 transition-all duration-300 ${
                  isInCart || isLoading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-yellow-600 text-white hover:bg-[#946B3C]"
                }`}
              >
                {isInCart ? "Already in Cart" : isLoading ? "Adding to Cart..." : "Add to Cart"}
              </button>
            </div>
          </div>

          <div className="md:hidden lg:block">
            <div className="border-l border-t border-r p-4">
              <CreditCard size={48} />
              <div className="mt-1">
                <p className="font-bold">Secure Payment</p>
                <span>100% Secure Payment</span>
              </div>
            </div>

            <div className="border-l border-t border-r p-4">
              <BadgeCheck size={48} />
              <div className="mt-1">
                <p className="font-bold">Money Back Guarantee</p>
                <span>Within 30 Days</span>
              </div>
            </div>

            <div className="border-l border-t border-r border-b p-4">
              <MessageCircleQuestion size={48} />
              <div className="mt-1">
                <p className="font-bold">24/7 Support</p>
                <span>Within 1 Business Day</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DetailsPage;
