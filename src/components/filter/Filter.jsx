import "./Filter.css";
import React from "react";

const Filter = () => {
  return (
    <div className="Filter">
      <h4 className="">Popular filters</h4>

      <label className="">
        <input type="checkbox" className="rounded" value="Roma" />
        <span>Hotels</span>
      </label>
      <label className="">
        <input type="checkbox" className="rounded" value="Roma" />
        <span>Breakfast included</span>
      </label>
      <label className="">
        <input type="checkbox" className="rounded" value="Roma" />
        <span>Apartments</span>
      </label>
      <label className="">
        <input type="checkbox" className="rounded" value="Roma" />
        <span>4 stars</span>
      </label>
      <label className="">
        <input type="checkbox" className="rounded" value="Roma" />
        <span>Free wifi</span>
      </label>
    </div>
  );
};

export default Filter;
