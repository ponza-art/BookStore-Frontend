import React from "react";
import SearchBar from "../components/SearchBar";

const SearchHome = () => {
  return (
    <div className="p-6 container mx-auto   flex flex-col lg:flex-row items-center justify-between" style={{backgroundColor:"#dab26d",borderRadius:"20px" }} >
      <div className="lg:w-1/2 mb-4 lg:mb-0">
        <h2 className="text-4xl font-bold mb-8">Find Books fast.</h2>
        {/* <div className="form-control" >
          <label className="input  flex items-center gap-2" style={{ borderRadius: "50px" , width:"600px" }} >
            <input
              type="text"
              className="grow bg-white p-1 "
              placeholder="Search Articles"
            />
            <button className="btn" style={{borderRadius:"50px" , height:"40px",width:"70px" , backgroundColor:"#dab26d"}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                // className="h-6 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </label>
        </div> */}
        <SearchBar/>
      </div>
      <div className="lg:w-1/2 flex justify-center lg:justify-end">
        <div className="flex items-center gap-4">
          <img src={"https://assets.static-upwork.com/helpcenter/air3/hero.svg"} alt="" className="w-50 h-50" />
        </div>
      </div>
    </div>
  );
};

export default SearchHome;
