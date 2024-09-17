/* eslint-disable no-unused-vars */
import React from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target[0].value;
    searchParams.set("search", e.target[0].value);
    if (inputValue.trim()) {
      navigate(`/books?search=${encodeURIComponent(inputValue)}`);
    }
    // setSearchParams(searchParams);
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
