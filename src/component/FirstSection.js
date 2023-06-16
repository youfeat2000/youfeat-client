import React from "react";
import img from "../public/pexels-min-an-1629200.jpg";

function FirstSection() {
  return (
    <div className="first">
      <h1>About us</h1>
      <br />
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, fuga
          numquam delectus voluptatum et repellat, commodi voluptate dignissimos
          magnam porro deleniti! Aliquam officiis assumenda perferendis placeat
          exercitationem cupiditate soluta voluptate!
        </p>
        <img src={img} alt="some" />
      </div>
    </div>
  );
}

export default FirstSection;
