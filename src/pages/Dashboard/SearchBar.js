import React from "react";
import { CgSearch } from "react-icons/cg";

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search" />
      <CgSearch
        style={{ fontSize: "3rem", marginTop: "5px", fontWeight: "bolder" }}
      />
    </div>
  );
}

export default SearchBar;
