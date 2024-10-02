/* eslint-disable react/prop-types */
import { Link, useFetcher } from 'react-router-dom';

function CartItem({ item }) {
  // console.log(item);
  const fetcher = useFetcher();

  return (
    <li className="relative h-36 flex items-center gap-4">
      <Link to={`/books/${item.bookId._id}`} className="w-32 h-36">
        <div className="relative w-full h-full">
          <img
            className="absolute inset-0 w-full h-full object-cover object-center"
            src={item.bookId.coverImage}
            alt="Book Image"
          />
        </div>
      </Link>

      <div className="flex flex-col items-start gap-2">
        <div>
          <span className="text-sm uppercase text-rose-500">
            {item.bookId.category}
          </span>

          <Link to={`/books/${item.bookId._id}`}>
            <h2 className="font-medium">{item.bookId.title}</h2>
          </Link>
        </div>

        <Link to="">
          <span className="text-sm text-gray-600">{item.bookId.author}</span>
        </Link>

        <span className="text-lg font-medium">{item.bookId.price}</span>

        <fetcher.Form method="DELETE">
          <input type="hidden" name="bookId" value={item.bookId._id} />
          <button className="absolute right-2 bottom-2 btn btn-sm rounded-none">
            Delete
          </button>
        </fetcher.Form>
      </div>
    </li>
  );
}

export default CartItem;
