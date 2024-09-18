import React from "react";
import { Link } from "react-router-dom";
import "../css/BookCard.model.css";
import { FaRegHeart } from "react-icons/fa";

const BookCard = ({ _id, title, author, price, imageUrl }) => {
  return (
    <div
      className="card bg-white relative shadow-xl hover:border hover:border-red-600q parentDev"
      style={{
        height: "430px",
        width: "280px",
        transition: "border-color 0.3s ease-in-out",
      }}
    >
      <div>
        <img
          src={"book-1.jpg"}
          alt={title}
          className="w-40 mt-6 h-48 mx-auto"
        />
      </div>
      <div className="card-body flex-grow-0 ps-8  bodyCard  ">
        <p className="text-red-600 uppercase mb-0 pb-0 ">Paperback</p>
        <h3 className="card-title text-xl font-bold mt-0 pt-0">{title}</h3>
        <p className="text-gray-700">ahmed</p>
        <p className="text-xl font-sans font-bold">$90</p>
        <div className="card-title  cartDev">
          {/* <span className=" font-semibold">
          Add to Cart
        </span> */}
          <Link to={`/books/${_id}`}>show details</Link>
          <FaRegHeart className=" cursor-pointer iconBody " />
        </div>
      </div>
    </div>
  );
};

export default BookCard;
