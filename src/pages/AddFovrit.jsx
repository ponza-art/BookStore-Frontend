import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext"; // Import useFavorites from context

const AddFovrit = () => {
  const { favoriteBooks, removeFromFavorites } = useFavorites(); // Get favorites and removal function from context
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const {
          data: { books: favBooks },
        } = await axios.get(
          `https://book-store-backend-sigma-one.vercel.app/favorites`,
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
    removeFromFavorites(bookId, true); // Call removeFromFavorites from context

    try {
      await axios.delete(
        `https://book-store-backend-sigma-one.vercel.app/favorites/`,
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">My Favorite Books</h1>
      {loading ? (
        <div className="flex justify-center items-center relative top-0 left-0 h-[50vh] w-fit my-[6.75rem] mx-auto ">
          <img src="/loader.gif" alt="Loading..." className="w-full h-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteBooks.length ? (
            favoriteBooks.map((book) => (
              <div
                key={book._id}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 relative"
              >
                <img
                  src={book.bookId?.coverImage || ""}
                  alt={book.bookId?.title || "No Image"}
                  className="w-32 h-40 object-cover rounded-t-md mb-4"
                />
                <div className="text-center mb-4">
                  <span className="text-red-500 text-sm font-bold uppercase">
                    Paperback
                  </span>
                  <h2 className="text-lg font-semibold mt-2">
                    {book.bookId?.title || "No Title"}
                  </h2>
                  <p className="text-gray-500">
                    {book.bookId?.author || "Unknown Author"}
                  </p>
                  <p className="text-gray-800 font-bold mb-4">
                    ${book.bookId?.price || "0.00"}
                  </p>
                </div>
                <div className="mt-auto">
                  <button
                    className="flex items-center space-x-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors duration-300"
                    onClick={() => deleteFav(book.bookId?._id)}
                  >
                    <FaTrash size={20} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">
              No favorite books found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AddFovrit;
