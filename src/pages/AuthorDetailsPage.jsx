import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookCard from "../components/BookCard";
import { useFavorites } from "../context/FavoritesContext";
import useCartContext from "../hooks/use-cart-context";
import { useOrder } from "../context/OrderContext";
const token = localStorage.getItem("token");
const AuthorDetailsPage = () => {
  const { id } = useParams();
  const { favoriteBooks, addToFavorites, removeFromFavorites } = useFavorites();
  const { orderBookId, isDownloadLoading, getOrderData } = useOrder();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cartItems, addToCart, isloading } = useCartContext(); // Removed unused deleteBookById

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const response = await axios.get(
          `https://book-store-backend-sigma-one.vercel.app/author/${id}`
        );
        setAuthor(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching author details", error);
        setLoading(false);
      }
    };

    fetchAuthorDetails();
    if (token) {
      getOrderData();
    }
  }, [id]);

  if (loading) {
    // Skeleton Loader for the page while loading
    return (
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-evenly mx-auto my-24">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="card rounded-none animate-pulse bg-gray-200 relative"
              style={{
                width: "280px",
              }}
            >
              <div className="w-full h-96 mx-auto"></div>
              <div className="card-body flex-grow-0 px-0 mx-0 bg-white bodyCard">
                <div className="w-24 h-4 bg-slate-300 mb-2 rounded-md"></div>
                <div className="w-40 h-6 bg-slate-300 mb-2 rounded-md"></div>
                <div className="w-32 h-4 bg-slate-300 mb-2 rounded-md"></div>
                <div className="w-48 h-6 bg-slate-300 mb-2 rounded-md"></div>
                <div className="flex justify-between">
                  <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
                  <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!author) {
    return <div className="text-center">Author not found</div>;
  }

  return (
    <div className="author-details-page container mx-auto my-6">
      <h2 className="text-2xl font-semibold mb-4">Books by {author.name}</h2>
      <div className="flex flex-wrap px-8 md:gap-8 justify-center md:justify-evenly lg:justify-evenly">
        {author.books.length > 0 ? (
          author.books.map((book, index) => {
            const isFavorite = favoriteBooks.some(
              (fav) => fav.bookId._id === book.bookId._id
            );
            return (
              <BookCard
                key={index}
                _id={book.bookId._id}
                title={book.bookId.title}
                author={author.name}
                category={book.bookId.category}
                price={book.bookId.originalPrice}
                discountedPrice={book.bookId.discountedPrice}
                discountPercentage={book.bookId.discountPercentage}
                imageUrl={book.bookId.coverImage}
                isFavorite={isFavorite}
                addToFavorites={() => addToFavorites(book.bookId)}
                removeFromFavorites={() => removeFromFavorites(book.bookId._id)}
                addToCart={() => addToCart(book.bookId)}
                InCart={Boolean(
                  cartItems.find((cart) => cart.bookId._id === book.bookId._id)
                )}
                isloading={isloading}
                isBookInOrder={Boolean(orderBookId?.includes(book.bookId._id))}
                isDownloadLoading={isDownloadLoading}
              />
            );
          })
        ) : (
          <div>No books found</div>
        )}
      </div>
    </div>
  );
};

export default AuthorDetailsPage;
