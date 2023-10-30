import React from "react";
import { CgSearch } from "react-icons/cg";

//this is the search bar for big screen
function Search({ handleChange, tug }) {
  return (
    <div className="search2">
      <input
        type="text"
        placeholder="search..."
        onChange={(e) => handleChange(e)}
        ref={tug}
      />
      <CgSearch
        style={{ marginTop: "0 auto", marginRight: "10px", padding: "5px" }}
      />
    </div>
  );
}

export default Search;
