import React, { useContext, useEffect, useState } from "react";
import LibraryComponent from "../components/LibraryComponent";
import { UserContext } from "../hooks/UserContext";
import axios from "axios";

export default function LibraryPage() {
  const { userInfo } = useContext(UserContext);
  const [orderData, setOrderData] = useState([]);
  const [booksDetails, setBooksDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const getBookOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing or empty");
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.get(
        "https://book-store-backend-sigma-one.vercel.app/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        const dataofOrder = res.data;
        // console.log(dataofOrder[0].userId === userInfo?.id)
        const DataofOrder = dataofOrder.filter(
          (order) => order.userId === userInfo?.id
        );
        //console.log(DataofOrder);
        setIsLoading(false);
        setOrderData(DataofOrder);
        localStorage.setItem("orderData", JSON.stringify(DataofOrder));
        // console.log(dataofOrder[0].userId == userInfo?.id)
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    const storedOrderData = localStorage.getItem("orderData");
    if (storedOrderData) {
      setOrderData(JSON.parse(storedOrderData)); // Load data from localStorage if available
    } else if (userInfo) {
      getBookOrder(); // Fetch if no local data
    } else {
      console.log("Please login");
    }
  }, [userInfo]);

  console.log(orderData);

  const fetchBookDetails = async (bookId) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://book-store-backend-sigma-one.vercel.app/book/${bookId}`
      );
      console.log(res.data);
      setIsLoading(false);
      return res.data;
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching book details", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchAllBooksDetails = async () => {
      const newBooksDetails = {};

      for (const order of orderData) {
        for (const book of order.books) {
          const bookId = book.bookId;

          if (!newBooksDetails[bookId]) {
            const bookDetails = await fetchBookDetails(bookId);

            if (bookDetails) {
              newBooksDetails[bookId] = bookDetails;
            }
          }
        }
      }

      setBooksDetails(newBooksDetails);
      localStorage.setItem("booksDetails", JSON.stringify(newBooksDetails));
    };

    const storedBooksDetails = localStorage.getItem("booksDetails");
    if (storedBooksDetails) {
      setBooksDetails(JSON.parse(storedBooksDetails));
    } else if (orderData.length > 0) {
      fetchAllBooksDetails();
    }
  }, [orderData]);

  console.log(booksDetails);

  return (
    <main>
      {isLoading ? (
        <div className="flex justify-center items-center relative top-0 left-0 h-[50vh] w-fit my-[6.75rem] mx-auto ">
          <img src="/loader.gif" alt="Loading..." className="w-full h-full" />
        </div>
      ) : (
        <div>
         
          <LibraryComponent orderData={orderData} booksDetails={booksDetails} />
        </div>
      )}
    </main>
  );
}
