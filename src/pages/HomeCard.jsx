import React from 'react';
import BookCard from '../components/BookCard';

const books = [
  { title: 'All You Can Ever Know', author: 'Nicole Chung', price: '29.95', imageUrl: './images/pct.jpg' },
  { title: 'Book Title 2', author: 'Author 2', price: '19.95', imageUrl: './images/pct2.jpg' },
  { title: 'Book Title 3', author: 'Author 3', price: '24.95', imageUrl: './images/pct3.jpg' },
  { title: 'Book Title 4', author: 'Author 4', price: '14.95', imageUrl: './images/pct4.jpg' },
  { title: 'Book Title 5', author: 'Author 5', price: '34.95', imageUrl: './images/pct5.jpg' },
  { title: 'Book Title 6', author: 'Author 6', price: '39.95', imageUrl: './images/pct6.jpg' },
  { title: 'Book Title 7', author: 'Author 7', price: '29.95', imageUrl: './images/pct7.jpg' },
  { title: 'Book Title 8', author: 'Author 8', price: '25.95', imageUrl: './images/pct8.jpg' },
];

const HomeCard = () => {
  return (
    <div className="p-6 container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Trending Books</h2>
        <a href="#" className="text-blue-500">View All</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {books.map((book, index) => (
          <BookCard 
            key={index}
            title={book.title}
            author={book.author}
            price={book.price}
            imageUrl={book.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeCard;
