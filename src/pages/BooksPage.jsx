import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext"; // Import the context

function BooksPage() {
  const { favoriteBooks, addToFavorites, removeFromFavorites } = useFavorites(); // Use the context
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("https://book-store-backend-sigma-one.vercel.app/book/filters", {
          params: {
            query,
            author,
            category,
            minPrice,
            maxPrice,
            page,
          },
        });
        window.scrollTo(0, 0);
        const data = query
          ? res.data.booksDataWithoutSourcePath.filter((b) =>
              b.title.toLowerCase().includes(query.toLowerCase())
            )
          : res.data.booksDataWithoutSourcePath;
        
        setBooks(data);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query, author, category, minPrice, maxPrice, page]);

  const handleSearchSubmit = (inputValue) => {
    if (inputValue.trim()) {
      navigate(`/books?search=${encodeURIComponent(inputValue)}`);
    }
  };

  const handleFilterSubmit = () => {
    setPage(1);
    fetchBooks();
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
            {/* Add filters */}
            <div className="filters mt-6 flex gap-4">
              <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="border p-2 rounded"
              />
              <button
                onClick={handleFilterSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {books?.length ? (
            <>
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
                      favoriteBooks.find((fav) => fav.bookId._id === book._id)
                    )}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="pagination mt-6 flex justify-center">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 mx-2 bg-gray-200 rounded"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 mx-2 bg-gray-200 rounded"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p className="text-xl text-center mt-10">
              No books found. Please try another search term.
            </p>
          )}
        </>
      )}
    </main>
  );
}

export default BooksPage;
