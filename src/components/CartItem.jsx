/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

function CartItem({ book, deleteBookById }) {
  // console.log(book);

  return (
    <li className="relative h-36 flex items-center gap-4">
      <Link to={`/books/${book.bookId._id}`} className="w-32 h-36">
        <div className="relative w-full h-full">
          <img
            className="absolute inset-0 w-full h-full object-cover object-center"
            src={book.bookId.coverImage}
            alt="Book Image"
          />
        </div>
      </Link>

      <div className="flex flex-col items-start gap-2">
        <div>
          <span className="text-sm uppercase text-rose-500">
            {book.bookId.category}
          </span>

          <Link to={`/books/${book.bookId._id}`}>
            <h2 className="font-medium">{book.bookId.title}</h2>
          </Link>
        </div>

        <Link to="">
          <span className="text-sm text-gray-600">{book.bookId.author}</span>
        </Link>

        <span className="text-lg font-medium">{book.bookId.price}</span>

        <button
          className="absolute right-2 bottom-2 btn btn-sm rounded-none"
          onClick={() => deleteBookById(book.bookId._id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default CartItem;
