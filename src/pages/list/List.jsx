import React from "react";
import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Filter from "../../components/filter/Filter";
import SearchItem from "../../components/searchItem/SearchItem";
import { useLocation } from "react-router-dom";

const List = () => {
  const { state } = useLocation();

  // Check if state exists and has hotels array
  if (!state || !state[0] || !state[0].hotels) {
    return null; // or render some default component or message
  }

  return (
    <div>
      <Navbar />
      <Header />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <Filter />
            <Filter />
            <Filter />
            <Filter />
            <Filter />
            <Filter />
          </div>

          <div className="listResult">
            {state[0].hotels.map((hotel, index) => (
              <SearchItem key={index} hotel={hotel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
