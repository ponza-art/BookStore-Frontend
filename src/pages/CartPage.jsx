/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCartContext from '../hooks/use-cart-context';
import CartItem from '../components/CartItem';

function CartPage() {
  const { user, cartItems, getUserCartItems, deleteBookById } =
    useCartContext();
  // console.log(user, cartItems, cartItems[0]);

  useEffect(() => {
    getUserCartItems();
  }, []);

  const renderedItems = cartItems.map((book) => {
    return (
      <CartItem key={book._id} book={book} deleteBookById={deleteBookById} />
    );
  });

  return (
    <main>
      <div>
        <section className="max-w-screen-md mx-auto px-4 py-14 mb-52">
          <h2 className="mb-10 text-2xl font-semibold">
            Your cart, {user.username}
          </h2>

          <ul className="flex flex-col gap-4">{renderedItems}</ul>

          <Link to="/" className="mt-8 btn btn-neutral rounded-none px-8">
            Order
          </Link>
        </section>
      </div>
    </main>
  );
}

export default CartPage;
