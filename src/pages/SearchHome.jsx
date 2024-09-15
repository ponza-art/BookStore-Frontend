import React from "react";
import SearchBar from "../components/SearchBar";

const SearchHome = () => {
  return (
    <div className="p-6 container mx-auto flex flex-col lg:flex-row items-center justify-between rounded-lg" style={{ backgroundColor: "#dab26d" }}>
      <div className="lg:w-1/2 mb-4 lg:mb-0 flex flex-col items-center lg:items-start">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-center lg:text-left">
          Find Books Fast.
        </h2>
        <div className="lg:w-96">

        <SearchBar />
        </div>
      </div>
      <div className="lg:w-1/2 flex justify-center lg:justify-end">
        <img
          src="https://assets.static-upwork.com/helpcenter/air3/hero.svg"
          alt="Hero"
          className="w-3/4 lg:w-1/2 max-w-xs lg:max-w-md"
        />
      </div>
    </div>
  );
};

export default SearchHome;
