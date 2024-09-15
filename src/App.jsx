import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import DetailsPage from './pages/DetailsPage';

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
