import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import DetailsPage from "./pages/DetailsPage";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import NotFound from "./NotFound";
import AddFovrit from "./pages/AddFovrit";
import CartPage from './pages/CartPage';
import { useEffect, useState } from "react";
import axios from "axios";
import { cloneDeep } from "lodash";


function createAppRouter(props) {
    return createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            children: [
                {
                    index: true,
                    element: (
                        <HomePage
                            favoriteBooks={props.favoriteBooks}
                            addToFavorites={props.addToFavorites}
                            removeFromFavorites={props.removeFromFavorites}
                        />
                    ),
                },
                {
                    path: "/books",
                    element: (
                        <BooksPage
                            favoriteBooks={props.favoriteBooks}
                            addToFavorites={props.addToFavorites}
                            removeFromFavorites={props.removeFromFavorites}
                        />
                    ),
                },
                {
                    path: "/favorite",
                    element: (
                        <AddFovrit
                            removeFromFavorites={props.removeFromFavorites}
                        />
                    ),
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
                    path: '/cart',
                    element: <CartPage />,
                },
            ],
        },
    ]);
}

function App() {
    const [favoriteBooks, setFavoriteBooks] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        (async () => {
            try {
                const {
                    data: { books: favBooks },
                } = await axios.get(
                    `https://book-store-backend-sigma-one.vercel.app/favorites`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }
                );
                setFavoriteBooks(favBooks);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [token]);

    const addToFavorites = async (book) => {
        const favoriteClone = cloneDeep(favoriteBooks);
        favoriteClone.push({ bookId: book });
        console.log(favoriteClone);
        setFavoriteBooks(favoriteClone);

        try {
            const {
                data: { books: favorites },
            } = await axios.post(
                `https://book-store-backend-sigma-one.vercel.app/favorites`,
                { bookId: book._id },
                { headers: { Authorization: "Bearer " + token } }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const removeFromFavorites = async (bookId, isFromAddFavComp) => {
        const favoriteClone = cloneDeep(favoriteBooks);

        const index = favoriteClone.findIndex(
            (book) => book.bookId?._id === bookId
        );

        if (index === -1) return;

        favoriteClone.splice(index, 1);
        console.log(favoriteClone);
        setFavoriteBooks(favoriteClone);

        if (isFromAddFavComp) return;

        try {
            const {
                data: { books: favorites },
            } = await axios.delete(
                `https://book-store-backend-sigma-one.vercel.app/favorites`,
                {
                    data: { bookId },
                    headers: { Authorization: "Bearer " + token },
                }
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    const router = createAppRouter({
        favoriteBooks,
        addToFavorites,
        removeFromFavorites,
    });

    return <RouterProvider router={router} />;
}

export default App;
