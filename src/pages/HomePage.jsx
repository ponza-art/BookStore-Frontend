import HomeCard from "./HomeCard";
import SearchHome from "./SearchHome";
import HomeHeader from "../components/HomeHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom"; // Import necessary hooks

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") || ""; // Get query from search params
  const navigate = useNavigate(); // To navigate on search submit

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get(
          "https://book-store-backend-sigma-one.vercel.app/book"
        );

        // Sort by timestamp and get the latest 6 books
        const latestBooks = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 8);

        setTimeout(() => {
          setBooks(latestBooks);
          setLoading(false);
        }, 2000);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const handleSearchSubmit = (inputValue) => {
    // Navigate to the books page with the search query
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
            {/* Pass the query and handleSearchSubmit to the Search component */}
            <SearchHome initialQuery={query} onSearch={handleSearchSubmit} />
          </div>
          <div className="mt-5 ">
            <HomeCard books={books} />
          </div>
        </>
      )}
    </main>
  );
}

export default HomePage;
