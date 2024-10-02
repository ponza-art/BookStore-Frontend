import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import CartItem from '../../components/CartItem';
import EmptyCart from '../../components/EmptyCart';

function CartPage() {
  const { userCart } = useLoaderData();
  // console.log(userCart);

  const cartItems = userCart.items;

  const renderedItems = cartItems.map((item) => {
    return <CartItem key={item._id} item={item} />;
  });

  if (!cartItems.length) {
    return <EmptyCart />;
  }

  return (
    <main>
      <div>
        <section className="max-w-screen-md mx-auto px-4 py-14 mb-52">
          <h2 className="mb-10 text-2xl font-semibold">Your cart</h2>

          <ul className="flex flex-col gap-4">{renderedItems}</ul>

          <Link to="/orders" className="mt-8 btn btn-neutral rounded-none px-8">
            Order
          </Link>
        </section>
      </div>
    </main>
  );
}

export default CartPage;
