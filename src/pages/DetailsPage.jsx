/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { CreditCard, BadgeCheck, MessageCircleQuestion } from "lucide-react";
import { PiFileArrowDownDuotone } from "react-icons/pi";
import toast from "react-hot-toast";
import useCartContext from "../hooks/use-cart-context";

function DetailsPage() {
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Loading state for the add to cart button
  const [DetailsLoading, setDetailsLoading] = useState(false);
  const [orderBookId, setOrderBookId] = useState([]);
  const [isInCartCheck, setIsInCartCheck] = useState(false);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  // Access cart items and methods from CartContext
  const { cartItems, setCartItems, getUserCartItems } = useCartContext();

  useEffect(() => {
    fetchBook(id);
    getOrderData();
    getUserCartItems();
  }, [id]);
  

  // Fetch book details from API
  const fetchBook = async (id) => {
    try {
      setDetailsLoading(true);
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(
        `https://book-store-backend-sigma-one.vercel.app/book/${id}`,
        { headers }
      );
      setDetailsLoading(false);
      setBook(res.data);
      getUserCartItems();
    } catch (error) {
      setDetailsLoading(false);
      console.log("There is an error loading data...", error);
    }
  };

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
  const isBookInOrder = orderBookId.includes(book._id);
  // Check if the book is already in the cart

  const addToCart = async () => {
    setIsLoading(true);

    try {
      //const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post(
        "https://book-store-backend-sigma-one.vercel.app/cart/",
        { bookId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res.data.items)
      if (res.status === 201) {
        toast.success("Book added to cart successfully!");

        setCartItems(res.data.items); // Update cart after adding the book
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
  useEffect(() => {
    if (cartItems) {
      const flattenedCartBooks = cartItems.flat();
      const cartBookIds = flattenedCartBooks.map((book) => book.bookId._id);
      setIsInCartCheck(cartBookIds?.some(id => id === book._id)); 
    }
  }, [cartItems, book]);
  

  let isInCart ;
  if (DetailsLoading) {
    return (
      <div className="flex justify-center items-center relative top-0 left-0 h-[50vh] w-fit my-[6.75rem] mx-auto ">
        <img src="/loader.gif" alt="Loading..." className="w-full h-full" />
      </div>
    );
  } else {
    isInCart = cartItems.some((item) => item.bookId === id);
    // if (cartItems) {
    //   const flattenedCartBooks = cartItems?.flat();
    //   console.log(flattenedCartBooks);
    //   const cartBookIds = flattenedCartBooks?.map((book) => {
    //     return book.bookId._id;
    //   });
    //   console.log(cartBookIds);
    //   isInCart = cartBookIds?.some((id) => {
    //     id === book._id;
    //   });
    //   console.log(isInCart);
    // }
  }
  console.log(isInCart);
  return (
    <main className="my-[9vh]">
      <section className="py-14">
        <div className="px-6 max-w-screen-2xl mx-auto grid gap-7 md:grid-cols-3 md:items-center lg:grid-cols-4">
          <div className="justify-self-center">
            <div className="carousel w-64">
              <div id="item1" className="carousel-item w-full">
                <img
                  src={book.coverImage}
                  className="w-full"
                  alt="Book Image"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-7 md:col-span-2">
            <div className="flex flex-col gap-4">
              <h1 className="font-medium text-3xl max-w-xl">{book.title}</h1>
              <span className="badge bg-yellow-600 text-lg ">
                {book.category}
              </span>
              <p className="text-md max-w-xl">{book.description}</p>
              <p className="text-gray-700">{book.author}</p>
              <p className="text-xl font-sans font-bold">{book.price}$</p>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center justify-center">
              <Link
                to={book?.sourcePath || book?.samplePdf}
                target="_blank"
                className="flex items-center justify-center gap-2 font-semibold bg-transparent text-[#4A2C2A] border-2 border-yellow-600 rounded-md px-6 py-2 hover:bg-yellow-600 hover:text-white transition-all duration-300"
              >
                Download
                <PiFileArrowDownDuotone size={28} />
              </Link>

              <button
                onClick={addToCart}
                disabled={isBookInOrder || isInCart ||isInCartCheck|| isLoading} // Disable button if book is in cart or loading
                aria-disabled={isBookInOrder || isInCart ||isInCartCheck|| isLoading}
                className={`flex items-center justify-center gap-2 rounded-md px-6 py-2 transition-all duration-300 ${
                  isBookInOrder || isInCart ||isInCartCheck|| isLoading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-yellow-600 text-white hover:bg-[#946B3C]"
                }`}
              >
                {isBookInOrder
                  ? "Book Already Buy"
                  : isInCart
                  ? "Already in Cart"
                  :isInCartCheck
                  ?"Already in Cart"
                  : isLoading
                  ? "Adding to Cart..."
                  : "Add to Cart"}
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
