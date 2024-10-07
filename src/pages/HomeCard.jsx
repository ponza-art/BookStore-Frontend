/* eslint-disable react/prop-types */
import BookCard from "../components/BookCard";
import { Link } from "react-router-dom";
import useCartContext from "../hooks/use-cart-context";
import { useOrder } from "../context/OrderContext";


const HomeCard = ({
  books,
  favoriteBooks,
  addToFavorites,
  removeFromFavorites,
}) => {
  const {  cartItems,addToCart ,isloading} = useCartContext();
  const { orderBookId,isDownloadLoading } = useOrder()
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
              price={book.originalPrice}
              imageUrl={book.coverImage}
              _id={book._id}
              addToFavorites={() => addToFavorites(book)}
              removeFromFavorites={() => removeFromFavorites(book._id)}
              isFavorite={Boolean(
                favoriteBooks?.find((favBook) => favBook.bookId && favBook.bookId._id === book._id)
                
              )}
              addToCart={()=>addToCart(book)}  
              
               InCart={Boolean(
                cartItems.find((cart) => cart.bookId._id === book._id)
              )}
              isloading={isloading}
              isBookInOrder = {Boolean(orderBookId?.includes(book._id))}
              isDownloadLoading={isDownloadLoading}
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

