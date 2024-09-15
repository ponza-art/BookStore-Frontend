import React from "react";
import { Link } from "react-router-dom";
import "../css/BookCard.model.css";
import { FaRegHeart } from "react-icons/fa";
import { BsArrowLeftRight } from "react-icons/bs";

const BookCard = ({ key, title, author, price, imageUrl }) => {
  return (
    <div
      key={key}
      className="card bg-white border hover:border hover:border-black parentDev"
      style={{ maxHeight: "450px",maxWidth:"280px", transition: "border-color 0.2s ease-in-out" }}
    >
      <div>
        <img src={imageUrl} alt={title} className="w-40 mt-6 h-48 mx-auto" />
      </div>

      <div className="card-body flex-grow-0 ps-8 bodyCard">
        <p className="text-red-600 uppercase mb-0 pb-0">Paperback</p>
        <h3 className="card-title text-xl font-bold mt-0 pt-0">{title}</h3>
        <p className="text-gray-700">{author}</p>
        <p className="text-xl font-sans font-bold">${price} - ${price}</p>
        <div className="card-title cartDev">
          <span className="font-semibold">Add to Cart</span>
          <FaRegHeart className="cursor-pointer iconBody" />
          {/* <BsArrowLeftRight className="text-green-500 cursor-pointer" /> */}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
