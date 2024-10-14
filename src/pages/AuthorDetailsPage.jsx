import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../components/BookCard';
import { useFavorites } from '../context/FavoritesContext';
import useCartContext from '../hooks/use-cart-context';
import { useOrder } from '../context/OrderContext';

const AuthorDetailsPage = () => {
    const { id } = useParams();
    const { favoriteBooks, addToFavorites, removeFromFavorites } = useFavorites();
    const { orderBookId, isDownloadLoading } = useOrder();
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);
    const { cartItems, addToCart, isloading } = useCartContext(); // Removed unused deleteBookById

    useEffect(() => {
        const fetchAuthorDetails = async () => {
            try {
                const response = await axios.get(`https://book-store-backend-sigma-one.vercel.app/author/${id}`);
                setAuthor(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching author details', error);
                setLoading(false);
            }
        };

        fetchAuthorDetails();
    }, [id]);

    if (loading) {
        // Skeleton Loader for the page while loading
        return (
            <div className="flex flex-wrap gap-4 justify-center mx-36 my-16">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="card animate-pulse bg-gray-200 relative shadow-xl parentDev"
                        style={{
                            height: "430px",
                            width: "280px",
                            transition: "border-color 0.3s ease-in-out",
                        }}
                    >
                        <div className="w-40 h-48 mt-6 mx-auto bg-slate-300 rounded-md"></div>
                        <div className="card-body flex-grow-0 ps-8 bodyCard">
                            <div className="w-24 h-4 bg-slate-300 mb-2 rounded-md"></div>
                            <div className="w-40 h-6 bg-slate-300 mb-2 rounded-md"></div>
                            <div className="w-32 h-4 bg-slate-300 mb-2 rounded-md"></div>
                            <div className="w-20 h-6 bg-slate-300 mb-2 rounded-md"></div>
                            <div className="flex justify-between">
                                <div className="w-24 h-8 bg-slate-300 rounded-md"></div>
                                <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
                                <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!author) {
        return <div className="text-center">Author not found</div>;
    }

    return (
        <div className="author-details-page container mx-auto my-6">
            <h2 className="text-2xl font-semibold mb-4">Books by {author.name}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {author.books.length > 0 ? (
                    author.books.map((book) => {
                        const isFavorite = favoriteBooks.some(fav => fav.bookId._id === book.bookId._id);
                        return (
                            <BookCard
                                key={book.bookId._id}
                                _id={book.bookId._id}
                                title={book.bookId.title}
                                author={author.name}
                                price={book.bookId.price}
                                imageUrl={book.bookId.coverImage}
                                isFavorite={isFavorite}
                                addToFavorites={() => addToFavorites(book.bookId)}
                                removeFromFavorites={() => removeFromFavorites(book.bookId._id)}
                                addToCart={() => addToCart(book.bookId)}

                                InCart={Boolean(cartItems.find((cart) => cart.bookId._id === book.bookId._id))}
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
