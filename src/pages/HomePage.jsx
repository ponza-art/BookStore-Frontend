import HomeCard from "./HomeCard";
import SearchHome from "./SearchHome";
import HomeHeader from "../components/HomeHeader";
import { useEffect, useState } from "react";
import axios from "axios";

function HomePage() {
  const [loading, setLoading] = useState(true);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get("https://book-store-backend-sigma-one.vercel.app/book");
        setTimeout(() => {
          setBooks(data);
          setLoading(false);
        }, 2000);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <main className="container mx-auto">
      {loading ? (
        <div className="flex justify-center items-center   w-60 my-[6.85rem]   mx-auto ">
          <img src="/loader.gif" alt="Loading..." className="w-full h-full" />
        </div>
      ) : (
        <>
       <div className="mt-15 ">
        <HomeHeader />
            
          </div>

          <div className="mt-10">
            <SearchHome />
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
