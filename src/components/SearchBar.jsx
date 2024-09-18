import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";

export default function SearchBar({ initialQuery, onSearch }) {
  const [searchTerm, setSearchTerm] = useState(initialQuery); // Initialize with the query

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm); // Call the parent handler with the search term
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <div className="input flex items-center gap-2 bg-white border border-gray-300 rounded-full p-1 w-full max-w-md mx-auto">
          <input
            type="text"
            className="flex-grow bg-white p-2 rounded-full border-none outline-none"
            placeholder="Search Books"
          />
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full text-black"
            style={{ backgroundColor: "#dab26d" }}
          >
            <IoMdSearch />
          </button>
        </div>
      </div>
    </form>
  );
}
