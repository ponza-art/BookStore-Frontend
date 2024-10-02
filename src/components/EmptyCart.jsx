import { Link } from 'react-router-dom';

function EmptyCart() {
  return (
    <div className="px-4 py-16 max-w-screen-xl mx-auto">
      <Link to="/" className="text-amber-600">
        &larr; Back to Home
      </Link>

      <p className="mt-7 font-semibold">
        Your cart is still empty. Start adding some Books :)
      </p>
    </div>
  );
}

export default EmptyCart;
