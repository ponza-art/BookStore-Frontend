import React from "react";
import { PiFileArrowDownDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function LibraryComponent({ orderData, booksDetails }) {
    
  return (<div>
    <h1 className="text-2xl font-bold  w-fit my-7 mx-auto">Library</h1>
    {orderData.length>0 ?(<div className="p-4">
        <div className="flex flex-wrap start">
          {orderData.map((order, orderIndex) => (
            <div
              key={orderIndex}
              className="border shadow-2xl flex flex-col rounded-md m-2 p-4"
            >
              <p className="text-xl font-bold">Order {orderIndex + 1}</p>
              <span className="text-gray-600 text-sm">
                Ordered at:{" "}
                <span className="ml-1">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </span>
  
              <div className="flex flex-wrap justify-center mt-4">
                {order.books.map((book, bookIndex) => {
                  const bookDetails = booksDetails[book.bookId];
  
                  return (
                    <div
                      key={bookIndex}
                      className="border border-gray-600 flex flex-row rounded-md m-2 shadow-lg"
                    >
                      <div className="h-40">
                        {bookDetails ? (
                          <img
                            src={bookDetails.coverImage}
                            className="h-full rounded-md"
                            alt={`Book ${bookDetails.title}`}
                          />
                        ) : (
                          <p>Loading image...</p>
                        )}
                      </div>
                      <div className="ml-5 mt-5 ">
                        {bookDetails ? (
                          <>
                            <p className="text-md font-bold">
                              {bookDetails.title}
                            </p>
                            <p className="text-gray-500">
                              Price: {bookDetails.price}
                            </p>
                          </>
                        ) : (
                          <p>Loading details...</p>
                        )}
                      </div>
  
                      <div className="flex items-end mb-2">
                        {bookDetails ? (
                          <Link
                            to={bookDetails.sourcePath || "#"}
                            target="_blank"
                            className="flex items-center justify-center gap-2 font-semibold bg-transparent border-2 bg-yellow-600 text-white rounded-md px-4 py-2 mr-2 hover:border-yellow-600 hover:bg-white hover:text-[#4A2C2A] transition-all duration-300"
                          >
                            Download
                            <PiFileArrowDownDuotone size={28} />
                          </Link>
                        ) : (
                          <p>Loading download link...</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>):(<p className="w-fit my-7 mx-auto">You don't have any book</p>)}
    </div>
  );
}
