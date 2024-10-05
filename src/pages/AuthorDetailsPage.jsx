import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../components/BookCard';
import { useFavorites } from '../context/FavoritesContext';      
import useCartContext from '../hooks/use-cart-context';

const AuthorDetailsPage = () => {
    const { id } = useParams();
    const { favoriteBooks, addToFavorites, removeFromFavorites } = useFavorites(); 
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);
    const {  cartItems,addToCart,deleteBookById ,isloading} = useCartContext();
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
        return <div className="flex justify-center items-center relative top-0 left-0 h-[50vh] w-fit my-[6.75rem] mx-auto ">
            <img src="/loader.gif" alt="Loading..." className="w-full h-full" />
        </div>
    }

    if (!author) {
        return <div>Author not found</div>;
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
                                addToCart={()=>addToCart(book.bookId)}  
                                
                                 InCart={Boolean(
                                  cartItems.find((cart) => cart.bookId._id === book.bookId._id)
                                )}
                                  isloading={isloading}
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
