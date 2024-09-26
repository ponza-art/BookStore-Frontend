import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../components/BookCard'; // Ensure the path is correct for your project structure

const AuthorDetailsPage = () => {
    const { id } = useParams();
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);

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
                    author.books.map((book) => (
                        <BookCard
                            key={book.bookId._id}
                            _id={book.bookId._id}
                            title={book.bookId.title}
                            author={author.name}
                            price={book.bookId.price}
                            imageUrl={book.bookId.coverImage}
                            isFavorite={false} // Set default or pass actual data if needed
                            addToFavorites={() => console.log('Add to Favorites')} // Replace with actual function
                            removeFromFavorites={() => console.log('Remove from Favorites')} // Replace with actual function
                        />
                    ))
                ) : (
                    <div>No books found</div>
                )}
            </div>
        </div>
    );
};

export default AuthorDetailsPage;
