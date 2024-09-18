/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function BooksPage() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search");
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        await axios
          .get("https://book-store-backend-sigma-one.vercel.app/book", {
            params: { query },
          })
          .then((res) => {
            window.scrollTo(0, 0);
            const data = query
              ? res.data.filter((b) =>
                  b.title.toLowerCase().includes(query.toLowerCase())
                )
              : res.data;
            setBooks(data);
            console.log(books);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      } catch (error) {
        setLoading(false);
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, [query]);

  return (
    <main className="container mx-auto mh-[60vh]">
      {loading ? (
        <div className="flex justify-center items-center relative top-0 left-0 h-[50vh] w-fit my-[6.85rem] mx-auto ">
          <img src="/loader.gif" alt="Loading..." className="w-full h-full" />
        </div>
      ) : (
        <>
          <div className="mt-12">
            <SearchBar />
          </div>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"> */}
          {books.length > 0 ? (
            <div className="flex flex-wrap px-6 pt-7 pb-14 gap-6 justify-evenly">
              {books.map((book, index) => (
                <BookCard
                  _id={book._id}
                  key={index}
                  title={book.title}
                  author={book.author}
                  price={book.price}
                  imageUrl={book.imageUrl}
                />
              ))}
            </div>
          ) : (
            <p className="w-fit my-7 mx-auto">No Data Founded</p>
          )}
        </>
      )}
    </main>
  );
}

export default BooksPage;
