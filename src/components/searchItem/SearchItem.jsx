import React from "react";
import "./searchItem.css";
import { useNavigate } from "react-router-dom";

const getImageUrl = (imageUrl) => {
  return imageUrl.replace("{size}", "x500");
};

const SearchItem = ({ hotel }) => {
  const navigate = useNavigate();

  const { id, name, star_rating, description_struct, images, address, rates } =
    hotel;

  const getPrice = (rate) => {
    if (
      rate &&
      rate.payment_options &&
      rate.payment_options.payment_types &&
      rate.payment_options.payment_types.length > 0
    ) {
      return rate.payment_options.payment_types[0].show_amount;
    }
    return "N/A";
  };

  const getDescription = (descriptionStruct) => {
    if (descriptionStruct && descriptionStruct.length > 0) {
      return descriptionStruct[0].paragraphs[0];
    }
    return "No description available";
  };

  const handleSeeAvailability = () => {
    navigate(`/hotels/${id}`, { state: { hotel: hotel } });
  };

  return (
    <div className="searchItem">
      {images && images.length > 0 && (
        <img src={getImageUrl(images[0])} alt="" className="siImg" />
      )}
      <div className="siDesc">
        <h1 className="siTitle">{name}</h1>
        <span className="siDistance">{address}</span>
        <span className="siSubtitle">{getDescription(description_struct)}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>{`${star_rating} stars`}</span>
        </div>
        <div className="siDetailTexts">
          {rates && rates.length > 0 ? (
            <>
              <span className="siPrice">{getPrice(rates[0])}</span>
              <button className="siCheckButton" onClick={handleSeeAvailability}>
                See availability
              </button>
            </>
          ) : (
            <span className="siPrice">N/A</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
