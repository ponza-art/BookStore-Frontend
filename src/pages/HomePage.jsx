import HomeCard from "./HomeCard";
import SearchHome from "./SearchHome";
import HomeHeader from "../components/HomeHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext"; // Import the context

function HomePage() {
  const { favoriteBooks, addToFavorites, removeFromFavorites } = useFavorites();
   // Use the context
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get(
          "https://book-store-backend-sigma-one.vercel.app/book"
        );

        const latestBooks = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 8);

        setBooks(latestBooks);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const handleSearchSubmit = (inputValue) => {
    if (inputValue.trim()) {
      navigate(`/books?search=${encodeURIComponent(inputValue)}`);
    }
  };

  return (
    <main className="container mx-auto">
      {loading ? (
        <div className="flex justify-center items-center relative top-0 left-0 h-[50vh] w-fit my-[6.75rem] mx-auto ">
          <img src="/loader.gif" alt="Loading..." className="w-full h-full" />
        </div>
      ) : (
        <>
          <div className="mt-15 ">
            <HomeHeader />
          </div>
          <div className="mt-10">
            <SearchHome initialQuery={query} onSearch={handleSearchSubmit} />
          </div>
          <div className="mt-5 ">
            <HomeCard
              books={books}
              favoriteBooks={favoriteBooks}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              

              
            />
          </div>
        </>
      )}
    </main>
  );
}

export default HomePage;
