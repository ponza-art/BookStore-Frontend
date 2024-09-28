import React, { useEffect, useState } from "react";
import { PiFileArrowDownDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LibraryComponent() {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "https://book-store-backend-sigma-one.vercel.app/orders",
          config
        );

        setOrderData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    
    return (
      <div className="flex justify-center items-center relative top-0 left-0 h-[50vh] w-fit my-[6.75rem] mx-auto ">
        <img src="/loader.gif" alt="Loading..." className="w-full h-full" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
   console.log(orderData)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Library</h1>
      {orderData.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orderData.map((order, orderIndex) => (
            <div
              key={orderIndex}
              className="hero bg-base-200 rounded-lg shadow-lg p-6"
            >
              <div className="text-center">
                <h1 className="text-3xl font-bold">Order {orderIndex + 1}</h1>
                <p className="text-sm text-gray-600">
                  Ordered at:{" "}
                  <span className="ml-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </p>

                {order.books.length > 0 ? (
                  <div className="flex flex-col space-y-4">
                    {order.books.map((book, bookIndex) => {
                      const { bookId } = book;

                      return (
                        <div
                          key={bookIndex}
                          className="card lg:card-side bg-white shadow-xl flex flex-col"
                        >
                          <figure className="w-full lg:w-48 bg-gray-100">
                            <img
                              src={bookId.coverImage}
                              alt={bookId.title}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://via.placeholder.com/150?text=No+Image";
                              }}
                            />
                          </figure>
                          <div className="card-body">
                            <h2 className="card-title text-xl font-bold">
                              {bookId.title}
                            </h2>
                            <p className="text-gray-500">
                              Price: {bookId.price}
                            </p>
                            <div className="card-actions justify-end">
                              <Link
                                to={bookId.sourcePath || "#"}
                                target="_blank"
                                className="btn btn-primary flex items-center gap-2"
                              >
                                Download <PiFileArrowDownDuotone size={24} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500">No books in this order</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">You don't have any books</p>
      )}
    </div>
  );
}
