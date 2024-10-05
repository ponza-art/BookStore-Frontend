import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/BookCard.model.css";
import { FaRegHeart, FaHeart, FaBook } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useOrder } from "../context/OrderContext";

const BookCard = ({
  _id,
  title,
  author,
  price,
  imageUrl,
  isFavorite,
  addToFavorites,
  removeFromFavorites,
  addToCart,
  InCart,
  isloading,
  isBookInOrder,
  isDownloadLoading
}) => {
  
  const navigate = useNavigate();
  return (
    <div
      className="card bg-white relative shadow-xl hover:border hover:border-black parentDev"
      style={{
        height: "430px",
        width: "280px",
        transition: "border-color 0.3s ease-in-out",
      }}
    >
      <div>
        <img src={imageUrl} alt={title} className="w-40 mt-6 h-48 mx-auto" />
      </div>
      <div className="card-body flex-grow-0 ps-8 bodyCard">
        <p className="text-red-600 uppercase mb-0 pb-0 ">Paperback</p>
        <h3 className="card-title text-xl font-bold mt-0 pt-0 overflow-hidden line-clamp-1  text-ellipsis">
          {title}
        </h3>
        <p className="text-gray-700">{author}</p>
        <p className="text-xl font-sans font-bold">{price} EGP</p>
        <div className="card-title cartDev flex justify-between">
          <Link to={`/books/${_id}`}>Show Details</Link>
          {localStorage.getItem("token") ? (
            isFavorite ? (
              <FaHeart
                className="cursor-pointer text-red-600 iconBody"
                onClick={removeFromFavorites}
              />
            ) : (
              <FaRegHeart
                className="cursor-pointer iconBody"
                onClick={addToFavorites}
              />
            )
          ) : null}

          {localStorage.getItem("token") ? (
            InCart ? (
              <BsFillCartCheckFill className="  iconBody" />
            ) : isBookInOrder ? (
              <button onClick={() => navigate("/library")} disabled={isDownloadLoading}>
                <FaBook
                  className={` ${
                    isDownloadLoading ? "cursor-not-allowed" : "cursor-pointer iconBody"
                  }`}
                />
              </button>
            ) : (
              <button onClick={addToCart} disabled={isloading}>
                <MdAddShoppingCart
                  className={` ${
                    isloading ? "cursor-not-allowed" : "cursor-pointer iconBody"
                  }`}
                />
              </button>
            )
          ) : (
            <MdAddShoppingCart
              className="cursor-pointer iconBody"
              onClick={() => {
                navigate("/login");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
