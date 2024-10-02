import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { CreditCard, BadgeCheck, MessageCircleQuestion } from "lucide-react";
import { PiFileArrowDownDuotone } from "react-icons/pi";
import toast from "react-hot-toast";
import useCartContext from "../hooks/use-cart-context";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";

function DetailsPage() {
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [orderBookId, setOrderBookId] = useState([]);
  const [isInCartCheck, setIsInCartCheck] = useState(false);
  const [DetailsLoading, setDetailsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const { cartItems, setCartItems, getUserCartItems } = useCartContext();

  useEffect(() => {
    fetchBook(id);
    getOrderData();
    getUserCartItems();
    fetchReviews();
  }, [id]);

  const fetchBook = async (id) => {
    try {
      setDetailsLoading(true);
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(
        `https://book-store-backend-sigma-one.vercel.app/book/${id}`,
        { headers }
      );
      setDetailsLoading(false);
      setDetailsLoading(false);
      setBook(res.data);
      getUserCartItems();
    } catch (error) {
      setDetailsLoading(false);
      setDetailsLoading(false);
      console.log("There is an error loading data...", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `https://book-store-backend-sigma-one.vercel.app/review/${id}/reviews`
      );
      setReviews(response.data);
    } catch (error) {
      console.log(error.response?.data?.message || "Error fetching reviews");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (comment.length > 0 && rating > 0 && rating <= 5) {
        const response = editingReviewId
          ? (await axios.put(
              `https://book-store-backend-sigma-one.vercel.app/review/${editingReviewId}`,
              { comment, rating, bookId: id },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
            toast.success("Review updated successfully"))
          : (await axios.post(
              "https://book-store-backend-sigma-one.vercel.app/review",
              { comment, rating, bookId: id },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
            toast.success("Review created successfully"));
        fetchReviews();
        resetForm();
        setIsOpen(false);
      } else {
        toast.error("Rating and comment are required");
      }
    } catch (error) {
      setMessage("Rating and comment are required");
      toast.error("Rating and comment are required");
    }
  };

  const handleEdit = (review) => {
    setComment(review.comment);
    setRating(review.rating);
    setEditingReviewId(review._id);
    setIsOpen(true);
  };

  const handleDelete = async (reviewId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `https://book-store-backend-sigma-one.vercel.app/review/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews(reviews.filter((rev) => rev._id !== reviewId));
      toast.success("Review deleted successfully");
      fetchReviews();
    } catch (error) {
      toast.error("Failed to remove review.");
      console.log(error.response?.data?.message || "Error deleting review");
    }
  };

  const resetForm = () => {
    setComment("");
    setRating(0);
    setEditingReviewId(null);
    setMessage(null);
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

  const addToCart = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
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

        setCartItems(res.data.items);
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
      setIsInCartCheck(cartBookIds?.some((id) => id === book._id));
    }
  }, [cartItems, book]);

  let isInCart;
  if (DetailsLoading) {
    return (
      <div className="flex justify-center items-center relative top-0 left-0 h-[50vh] w-fit my-[6.75rem] mx-auto ">
        <img src="/loader.gif" alt="Loading..." className="w-full h-full" />
      </div>
    );
  } else {
    isInCart = cartItems.some((item) => item.bookId === id);
  }
  return (
    <main className="my-[9vh] mx-auto max-w-screen-xl">
      <section className="container mx-auto pb-6">
        <div className="border-b-2 pb-8 max-w-screen-2xl mx-auto grid gap-7 md:grid-cols-3 lg:grid-cols-4">
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
              <span className="badge bg-yellow-600 text-white p-3 text-lg ">
                {book.category}
              </span>
              <p className="text-md max-w-xl">
                {reviews.length !== 1
                  ? `${reviews.length} reviews`
                  : `${reviews.length} review`}
              </p>
              <p className="text-md max-w-xl">{book.description}</p>
              <p className="text-red-600 uppercase">{book.author}</p>
              <p className="text-xl font-sans font-bold">{book.price} $</p>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center justify-center">
              <Link
                to={book?.sourcePath || book?.samplePdf}
                target="_blank"
                className="flex items-center justify-center gap-2 font-semibold bg-transparent text-[#4A2C2A] border-2 border-yellow-600 rounded-md px-6 py-2 hover:bg-yellow-600 hover:text-white transition-all duration-300"
              >
                Preview / Download
                <PiFileArrowDownDuotone size={28} />
              </Link>

              <button
                onClick={addToCart}
                disabled={
                  isBookInOrder || isInCart || isInCartCheck || isLoading
                } // Disable button if book is in cart or loading
                aria-disabled={
                  isBookInOrder || isInCart || isInCartCheck || isLoading
                }
                className={`flex items-center justify-center gap-2 rounded-md px-6 py-2 transition-all duration-300 ${
                  isBookInOrder || isInCart || isInCartCheck || isLoading
                    ? "bg-slate-700 text-white cursor-not-allowed"
                    : "bg-yellow-600 text-white hover:bg-white hover:text-yellow-600 border-4 border-yellow-600"
                }`}
              >
                {isBookInOrder
                  ? "Book Already Bought"
                  : isInCart
                  ? "Already in Cart"
                  : isInCartCheck
                  ? "Already in Cart"
                  : isLoading
                  ? "Adding to Cart..."
                  : "Add to Cart"}
              </button>
            </div>
          </div>

          <div className="md:hidden mt-10 lg:block">
            <div className="border-l rounde-lg bg-slate-700 text-white border-t border-r p-4">
              <CreditCard size={24} />
              <p className="text-md">Secure Payment</p>
              <p className="text-sm ">PayPal, Credit Card</p>
            </div>
            <div className="border-l mt-3 rounded-lg border-t bg-slate-700 text-white border-r p-4">
              <MessageCircleQuestion size={24} />
              <p className="text-md">Ask a Question</p>
              <p className="text-sm ">Got a question? We're here to help!</p>
            </div>
            <div className="border-l rounded-lg mt-3 bg-slate-700 text-white border-y border-r p-4">
              <BadgeCheck size={24} />
              <p className="text-md">Authentic Books</p>
              <p className="text-sm ">We guarantee the quality of our books.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        {JSON.parse(localStorage?.getItem("user"))?.id && (
          <button
            onClick={() => {
              setIsOpen(true);
              resetForm();
            }}
            className="flex items-center justify-center gap-2 rounded-md px-6 py-2 transition-all duration-300 mb-4 btn bg-yellow-600 text-white hover:bg-[#946B3C]"
          >
            Leave a Review
          </button>
        )}

        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to leave a review!</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="border p-4 mb-4 rounded-md overflow-hidden"
            >
              <div className="flex justify-between items-start md:flex-row flex-col">
                <div>
                  <p className="font-bold text-gray-700">
                    {review.userId.username}
                  </p>
                  <p className="text-gray-800 mt-2 sm:overflow-visible overflow-hidden w-[90vw] sm:w-[98%]">
                    {review.comment}
                  </p>
                </div>
                <div className="md:text-right md:mt-0 text-left mt-3">
                  <p className="text-sm ">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex justify-end mt-2">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-6 h-6 ${
                          review.rating > index
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 .587l3.668 7.431 8.22 1.19-5.94 5.5 1.4 8.23L12 18.897l-7.658 4.015 1.4-8.23-5.94-5.5 8.22-1.19z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              {review.userId._id ===
                JSON.parse(localStorage?.getItem("user"))?.id && (
                <div className="flex mt-4">
                  <button
                    onClick={() => handleEdit(review)}
                    className="btn btn-md"
                  >
                    <FaRegEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-error text-white ml-2"
                  >
                    <MdOutlineDeleteOutline size={25} />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editingReviewId ? "Edit Review" : "Leave a Review"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Comment:
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="border rounded-md w-full p-2 resize-none h-28"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Rating:
                </label>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      onClick={() => setRating(index + 1)}
                      className={`w-6 h-6 cursor-pointer ${
                        rating > index ? "text-yellow-500" : "text-gray-400"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 .587l3.668 7.431 8.22 1.19-5.94 5.5 1.4 8.23L12 18.897l-7.658 4.015 1.4-8.23-5.94-5.5 8.22-1.19z" />
                    </svg>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="mr-2 btn"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-md px-6 py-2 transition-all duration-300 mb-4 btn bg-yellow-600 text-white hover:bg-[#946B3C]"
                >
                  {editingReviewId ? "Update Review" : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default DetailsPage;
