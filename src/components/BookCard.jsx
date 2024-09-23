import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/BookCard.model.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import axios from "axios";

const BookCard = ({
    _id,
    title,
    author,
    price,
    imageUrl,
    isFavorite,
    addToFavorites,
    removeFromFavorites
}) => {
    // console.log(isFavorite);

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
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-40 mt-6 h-48 mx-auto"
                />
            </div>
            <div className="card-body flex-grow-0 ps-8 bodyCard">
                <p className="text-red-600 uppercase mb-0 pb-0 ">Paperback</p>
                <h3 className="card-title text-xl font-bold mt-0 pt-0">
                    {title}
                </h3>
                <p className="text-gray-700">{author}</p>
                <p className="text-xl font-sans font-bold">{price}</p>
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
                </div>
            </div>
        </div>
    );
};

export default BookCard;
