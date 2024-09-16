import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";


const HomeCard = ({ books }) => {
  return (
    <div className="p-6 container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Trending Books</h2>
        <a href="#" className="text-blue-500">
          View All
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            price={book.price}
            imageUrl={book.imageUrl}
            id={book.id}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeCard;
