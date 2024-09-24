import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import DetailsPage from "./pages/DetailsPage";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import NotFound from "./NotFound";
import AddFovrit from "./pages/AddFovrit";
import CartPage from "./pages/CartPage";
import { FavoritesProvider } from "./context/FavoritesContext"; // Import the context provider

function createAppRouter() {
  return createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/books",
          element: <BooksPage />,
        },
        {
          path: "/favorite",
          element: <AddFovrit />,
        },
        {
          path: "/books/:id",
          element: <DetailsPage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Registration />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
        {
          path: "/cart",
          element: <CartPage />,
        },
      ],
    },
  ]);
}

function App() {
  const router = createAppRouter();

  return (
    <FavoritesProvider>
      <RouterProvider router={router} />
    </FavoritesProvider>
  );
}

export default App;
