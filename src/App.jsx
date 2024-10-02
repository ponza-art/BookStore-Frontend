import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import DetailsPage from './pages/DetailsPage';
import Login from './pages/Login';
import Registration from './pages/Registration';
import NotFound from './NotFound';
import AddFovrit from './pages/AddFovrit';
import CartPage from './pages/cart/CartPage';
import { cartLoader } from './pages/cart/cartLoader';
import { action as deleteCartItem } from './pages/cart/cartAction';
import { FavoritesProvider } from './context/FavoritesContext'; // Import the context provider
import { Toaster } from 'react-hot-toast';

//import UseOrder from "./hooks/UseOrder";

import OrderPage from './pages/OrderPage';
import LibraryPage from './pages/LibraryPage';
import AuthorsPage from './pages/AuthorsPage';
import AuthorDetailsPage from './pages/AuthorDetailsPage';

function createAppRouter() {
  // const {orders,setIsNewOrderAdded}=UseOrder()
  return createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: '/books',
          element: <BooksPage />,
        },
        {
          path: '/favorite',
          element: <AddFovrit />,
        },
        {
          path: '/books/:id',
          element: <DetailsPage />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/signup',
          element: <Registration />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
        {
          path: '/cart',
          element: <CartPage />,
          loader: cartLoader,
          action: deleteCartItem,
        },
        {
          path: '/orders',
          element: <OrderPage />,
        },
        {
          path: '/library',
          element: <LibraryPage />,
        },
        {
          path: '/authors',
          element: <AuthorsPage />,
        },
        {
          path: '/authors/:id',
          element: <AuthorDetailsPage />,
        },
      ],
    },
  ]);
}

function App() {
  const router = createAppRouter();

  return (
    <>
      <Toaster />

      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </>
  );
}

export default App;
