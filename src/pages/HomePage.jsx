// HomePage.js
import HomeCard from "./HomeCard";
import SearchHome from "./SearchHome";
import HomeHeader from "../components/HomeHeader";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HomeCardSkeleton ,  HomeHeaderSkeleton ,SearchHomeSkeleton , SliderSkeleton } from "./Skeleton"; // Import the skeleton component
import { useOrder } from "../context/OrderContext";
import LogosSection from "../components/LogosSection";

function HomePage() {
  const { favoriteBooks, addToFavorites, removeFromFavorites } = useFavorites(); 
  const { getOrderData} = useOrder()
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [saleBooks, setSaleBooks] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const token =localStorage.getItem("token")
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get(
          "https://book-store-backend-sigma-one.vercel.app/book"
        );

        const saleBooks = data.filter((book) => book.discountPercentage > 25);
        const latestBooks = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 8);

        setBooks(latestBooks);
        setSaleBooks(saleBooks);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
    if(token){
      getOrderData()
    }
    
  }, []);

  const handleSearchSubmit = (inputValue) => {
    if (inputValue.trim()) {
      navigate(`/books?search=${encodeURIComponent(inputValue)}`);
    }
  };

  const calculateSlidesToShow = (booksLength) => {
    if (booksLength >= 4) {
      return 4;
    } else if (booksLength === 3) {
      return 3;
    } else if (booksLength === 2) {
      return 2;
    } else {
      return 1;
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: calculateSlidesToShow(saleBooks.length),
    slidesToScroll: 1,
    afterChange: (index) => setCurrentSlide(index),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, saleBooks.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, saleBooks.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handlePrevClick = () => {
    if (currentSlide > 0) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNextClick = () => {
    if (currentSlide < saleBooks.length - calculateSlidesToShow(saleBooks.length)) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <main className="container mx-auto relative">
      {loading ? (
        <div className="container">

          <HomeHeaderSkeleton/>
          <SearchHomeSkeleton/>
          <SliderSkeleton/>
        <div className="mt-10 mx-auto  space-y-20">
          <HomeCardSkeleton /> 
          <HomeCardSkeleton /> 
        </div>
        </div>
      ) : (
        <>
          <div className="mt-15">
            <HomeHeader />
          </div>
          <div className="mt-10">
            <SearchHome initialQuery={query} onSearch={handleSearchSubmit} />
          </div>

          {saleBooks.length > 0 && (
            <div className="mt-10">
              <div className="flex justify-center items-center bg-red-500 text-white py-5 mb-5 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold uppercase">
                  Special Sale! Books with 25% or More Discount
                </h2>
              </div>

              {/* Prev and Next arrows */}
              <div className="relative">
                <button
                  onClick={handlePrevClick}
                  disabled={currentSlide === 0}
                  className={`absolute left-0  top-1/2 transform -translate-y-1/2 p-3 rounded-full  shadow-lg transition-all z-10 ${
                    currentSlide === 0
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-brown-200 text-white hover:bg-gray-700"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={handleNextClick}
                  disabled={
                    currentSlide >=
                    saleBooks.length - calculateSlidesToShow(saleBooks.length)
                  }
                  className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all z-10 ${
                    currentSlide >=
                    saleBooks.length - calculateSlidesToShow(saleBooks.length)
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-brown-200 text-white hover:bg-gray-700"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <Slider ref={sliderRef} {...sliderSettings}>
                  {saleBooks.map((book) => (
                    <div key={book._id} className="px-2">
                      <HomeCard
                        books={[book]}
                        favoriteBooks={favoriteBooks}
                        addToFavorites={addToFavorites}
                        removeFromFavorites={removeFromFavorites}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          )}
         

          <div className=" mt-10">
          <LogosSection />
            
            <div className="container  flex justify-between">
              <h2 className="text-2xl font-bold mb-5">Latest Books</h2>
              <Link to={"/books"} className="text-blue-500">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <HomeCard
                  key={book._id}
                  books={[book]}
                  favoriteBooks={favoriteBooks}
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                />
              ))}
            </div>
          </div>
 

        </>
      )}
    </main>
  );
}

export default HomePage;
