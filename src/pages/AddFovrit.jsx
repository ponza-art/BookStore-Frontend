import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";
import { PiListHeartLight } from "react-icons/pi";

const AddFovrit = () => {
  const { favoriteBooks, removeFromFavorites } = useFavorites();
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const {
          data: { books: favBooks },
        } = await axios.get(
          "https://book-store-backend-sigma-one.vercel.app/favorites",
          { headers: { Authorization: "Bearer " + token } }
        );

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [token]);

  const deleteFav = async (bookId) => {
    if (!bookId) return;
    removeFromFavorites(bookId, true);

    try {
      await axios.delete(
        "https://book-store-backend-sigma-one.vercel.app/favorites/",
        {
          data: { bookId },
          headers: { Authorization: "Bearer " + token },
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 pb-10 relative">
      <h1 className="text-3xl font-bold mb-4 text-center">My Favorite Books</h1>
      {loading ? (
        <div className="flex justify-center items-center relative top-0 left-0 h-[50vh] w-fit my-[6.75rem] mx-auto ">
          <img src="/loader.gif" alt="Loading..." className="w-full h-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:mx-auto  lg:w-[85%]  lg:grid-cols-3 gap-8">
          {favoriteBooks.length > 0 ? (
            favoriteBooks.map((book) => (
              <div
                key={book.bookId._id}
                className="bg-gradient-to-br rounded-xl p-6 flex flex-col items-center transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl hover:from-white hover:to-violet-50 relative"
              >
                <button
                  className="absolute top-2 right-2  p-1 rounded-full hover:bg-red-800 transition duration-300"
                  onClick={() => deleteFav(book.bookId?._id)}
                >
                  <IoIosCloseCircleOutline size={30} />
                </button>

                <div className="w-full flex justify-center">
                  <img
                    src={book.bookId?.coverImage || ""}
                    alt={book.bookId?.title || "No title"}
                    className="w-40 h-56  rounded-lg shadow-md mb-4 transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="text-center mb-4">
                  <span className="text-orange-900 text-lg font-bold uppercase tracking-wide">
                    {book.bookId?.category || "Category"}
                  </span>
                  <h2 className="text-lg font-semibold mt-2 text-gray-800">
                    {book.bookId?.title || "No Title"}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {book.bookId?.author || "Unknown Author"}
                  </p>
                  <p className="text-orange-950 font-bold text-xl mt-2">
                    ${book.bookId?.price || "0.00"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="absolute inset-0 my-20 justify-center items-center  w-full">
              <div className="flex flex-col justify-center items-center text-center space-y-4">
                <PiListHeartLight
                  className="text-black  text-8xl"
                  // style={{ fontSize: "100px" }}
                />
                <p className="text-xl text-gray-700">
                  Your favorite is currently empty.
                </p>
                <p className="text-gray-500">
                  Add some books to your favorite list by clicking on the heart
                  icon.
                </p>
                <Link
                  to="/books"
                  className="mt-6 px-6 py-2 bg-brown-200 hover:bg-white border border-brown-200 rounded-md"
                >
                  Return to Books
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddFovrit;
