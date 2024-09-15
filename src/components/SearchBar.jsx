import React from 'react';
import { IoMdSearch } from "react-icons/io";

export default function SearchBar() {
  return (
    <div className="form-control ">
      <div className="input flex  items-center gap-2" style={{ borderRadius: "50px", width: "600px", border: "1px solid #ccc", padding: "5px" }}>
        <input
          type="text"
          className=" bg-white p-1 flex-grow"
          placeholder="Search Articles"
          style={{ border: "none", outline: "none", borderRadius: "50px", paddingLeft: "10px" }}
        />
        <button className="px-2.5" style={{ borderRadius: "50px", height: "50px", width: "50px", backgroundColor: "#dab26d", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IoMdSearch />
        </button>
      </div>
    </div>
  );
}

