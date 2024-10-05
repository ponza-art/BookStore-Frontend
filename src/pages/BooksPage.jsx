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
  const [filterCatigory, setFilterCatigory] = useState([]);
  const [filterAuthor, setFilterAuthor] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          "https://book-store-backend-sigma-one.vercel.app/book/filters",
          {
            params: {
              query,
              author,
              category,
              minPrice,
              maxPrice,
              page,
            },
          }
        );
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

    const fetchCatigories = async () => {
      try {
        const { data } = await axios.get(
          "https://book-store-backend-sigma-one.vercel.app/category"
        );
        setFilterCatigory(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchAuthor = async () => {
      try {
        const { data } = await axios.get(
          "https://book-store-backend-sigma-one.vercel.app/author"
        );
        setFilterAuthor(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCatigories();
    fetchAuthor();
    fetchBooks();
  }, [query, author, category, minPrice, maxPrice, page]);

  const handleSearchSubmit = (inputValue) => {
    if (inputValue.trim()) {
      navigate(`/books?search=${encodeURIComponent(inputValue)}`);
    }
  };

  // Skeleton loader while books are loading
  const SkeletonCard = () => (
    <div className="card bg-gray-200 animate-pulse shadow-xl" style={{ height: "430px", width: "280px" }}>
      <div className="w-40 h-48 mx-auto bg-gray-300 mt-6"></div>
      <div className="card-body flex-grow-0 p-8">
        <div className="h-6 bg-gray-300 mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-300 mb-2 w-1/2"></div>
        <div className="h-4 bg-gray-300 w-1/3"></div>
      </div>
    </div>
  );

  // Skeleton loader for search and filters
  const SkeletonFilters = () => (
    <div className="flex flex-col gap-4 p-4">
      <div className="h-10 bg-gray-300 mb-2 w-1/2 animate-pulse"></div>
      <div className="h-10 bg-gray-300 mb-2 w-1/2 animate-pulse"></div>
      <div className="h-10 bg-gray-300 mb-2 w-1/2 animate-pulse"></div>
      <div className="flex gap-4">
        <div className="h-10 bg-gray-300 w-1/2 animate-pulse"></div>
        <div className="h-10 bg-gray-300 w-1/2 animate-pulse"></div>
      </div>
    </div>
  );

  return (
    <main className="container mx-auto mh-[60vh]">
      {loading ? (
        <div className="flex flex-wrap px-6 pt-7 pb-14 gap-6 justify-evenly">
          {/* Display multiple skeleton cards while loading */}
          {Array(8).fill(0).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="mt-12">
            {/* Drawer for filters */}
            <div className="drawer container mx-auto flex md:justify-evenly gap-3 justify-center flex-wrap">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="min-w-[40%]">
                {loading ? (
                  <SkeletonFilters /> // Show skeleton for search and filters
                ) : (
                  <SearchBar initialQuery={query} onSearch={handleSearchSubmit} />
                )}
              </div>
              <div className="drawer-content">
                {/* Page content here */}
                <label
                  htmlFor="my-drawer"
                  className="flex items-center justify-center gap-2 rounded-md px-6 py-2 transition-all duration-300 mb-4 btn bg-brown-200 text-black hover:bg-[#946B3C] drawer-button"
                >
                  Filters
                </label>
              </div>
              <div className="drawer-side z-50 h-full">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu bg-white text-base-content min-h-full w-[100%] sm:w-[50%] md:w-[40%] lg:w-[30%] p-4">
                  {/* Filter UI */}
                  {loading ? (
                    <SkeletonFilters /> // Show skeleton for filter options
                  ) : (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-bold">Filters</h2>
                        {/* Close button */}
                        <label
                          htmlFor="my-drawer"
                          className="btn btn-sm btn-ghost hover:bg-white"
                        >
                          ✕
                        </label>
                      </div>
                      <div className="filters mt-6 flex flex-col gap-4 w-full">
                        <label htmlFor="">Author</label>
                        <select
                          id="author"
                          className="select select-bordered w-full"
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                        >
                          <option value={""}>all</option>
                          {filterAuthor.map((aut) => (
                            <option key={aut._id}>{aut.name}</option>
                          ))}
                        </select>
                        <hr />
                        <label htmlFor="category">Category</label>
                        <select
                          id="category"
                          className="select select-bordered w-full"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value={""}>all</option>
                          {filterCatigory.map((cat) => (
                            <option key={cat._id}>{cat.title}</option>
                          ))}
                        </select>
                        <hr />
                        <label htmlFor="category">Price</label>
                        <div className="flex flex-wrap md:flex-nowrap w-[100%] gap-4">
                          <input
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="input input-bordered [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-[100%]"
                          />
                          <input
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="input input-bordered [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-[100%]"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </ul>
              </div>
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
                    price={book.originalPrice}
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
              <div className="pagination my-3 flex justify-center items-center">
                <div className="join">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setPage(index + 1)}
                      className={`join-item btn bg-brown-200 btn-lg ${page === index + 1 ? 'btn-active' : ''}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
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
