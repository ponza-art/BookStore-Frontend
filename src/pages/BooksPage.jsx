/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

function BooksPage({ favoriteBooks, addToFavorites, removeFromFavorites }) {
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);
    const [searchParams] = useSearchParams();
    const query = searchParams.get("search") || "";
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await axios.get(
                    "https://book-store-backend-sigma-one.vercel.app/book",
                    { params: { query } }
                );
                window.scrollTo(0, 0);
                const data = query
                    ? res.data.filter((b) =>
                          b.title.toLowerCase().includes(query.toLowerCase())
                      )
                    : res.data;
                setBooks(data);
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, [query]);

    const handleSearchSubmit = (inputValue) => {
        if (inputValue.trim()) {
            navigate(`/books?search=${encodeURIComponent(inputValue)}`);
        }
    };

    return (
        <main className="container mx-auto mh-[60vh]">
            {loading ? (
                <div className="flex justify-center items-center relative top-0 left-0 h-[50vh] w-fit my-[6.75rem] mx-auto">
                    <img src="/loader.gif" alt="Loading..." className="w-full h-full" />
                </div>
            ) : (
                <>
                    <div className="mt-12">
                        <SearchBar initialQuery={query} onSearch={handleSearchSubmit} />
                    </div>
                    {books.length ? (
                        <div className="flex flex-wrap px-6 pt-7 pb-14 gap-6 justify-evenly">
                            {books.map((book, index) => (
                                <BookCard
                                    _id={book._id}
                                    key={index}
                                    title={book.title}
                                    author={book.author}
                                    price={book.price}
                                    imageUrl={book.coverImage}
                                    addToFavorites={() => addToFavorites(book)}
                                    removeFromFavorites={() => removeFromFavorites(book._id)}
                                    isFavorite={Boolean(
                                        favoriteBooks?.find(
                                            (favBook) => favBook.bookId && favBook.bookId._id === book._id
                                        )
                                    )}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="w-fit my-7 mx-auto" style={{ height: "56.9vh" }}>
                            No Data Founded
                        </p>
                    )}
                </>
            )}
        </main>
    );
}

export default BooksPage;
