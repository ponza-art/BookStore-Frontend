import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import DetailsPage from './pages/DetailsPage';
import Login from './pages/Login';
import Registration from './pages/Registration';
import CartPage from './pages/CartPage';
import NotFound from './NotFound';

const router = createBrowserRouter([
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
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  // console.log("samah");
  return <RouterProvider router={router} />;
}

export default App;
