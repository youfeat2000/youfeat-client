import React from "react";
import { CgSearch } from "react-icons/cg";

function Searchbar() {
  return (
    <div className="search2">
      <input type="text" placeholder="search" />
      <CgSearch
        style={{ marginTop: "0 auto", marginRight: "10px", padding: "5px" }}
      />
    </div>
  );
}

export default Searchbar;
