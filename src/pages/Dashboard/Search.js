import React, { useContext } from "react";
import { CgSearch } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import ProfileContext from "../../context/ProfileContext";

function Search({ handleChange }) {
  return (
    <div className="search2">
      <input
        type="text"
        placeholder="search..."
        onChange={(e) => handleChange(e)}
      />
      <CgSearch
        style={{ marginTop: "0 auto", marginRight: "10px", padding: "5px" }}
      />
    </div>
  );
}

export default Search;
