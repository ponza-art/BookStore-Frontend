/* eslint-disable react/prop-types */
import BookCard from "../components/BookCard";
import { Link } from "react-router-dom";

const HomeCard = ({
  books,
  favoriteBooks,
  addToFavorites,
  removeFromFavorites,
}) => {
  return (
    <div className="p-6 container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Latest Books</h2>
        <Link to={"/books"} className="text-blue-500">
          View All
        </Link>
      </div>
      {books.length > 0 ? (
        <div className="flex flex-wrap pt-7 pb-14 gap-6 justify-evenly">
          {books.map((book) => (
            <BookCard
              key={book._id}
              title={book.title}
              author={book.author}
              price={book.price}
              imageUrl={book.coverImage}
              _id={book._id}
              addToFavorites={() => addToFavorites(book)}
              removeFromFavorites={() => removeFromFavorites(book._id)}
              isFavorite={Boolean(
                favoriteBooks?.find((favBook) => favBook.bookId && favBook.bookId._id === book._id)
              )}
            />
          ))}
        </div>
      ) : (
        <p className="w-fit my-7 mx-auto">No Data Founded</p>
      )}
    </div>
  );
};

export default HomeCard;

