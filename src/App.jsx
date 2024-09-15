import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import DetailsPage from './pages/DetailsPage';
import Login from './pages/Login';
import Registration from './pages/Registration';

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
        element: <Registration/>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
