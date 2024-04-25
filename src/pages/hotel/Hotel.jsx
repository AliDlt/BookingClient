import React, { useState } from "react";
import "./hotel.css";
import { BsTag } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { LuShare2 } from "react-icons/lu";

import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

import { CiLocationOn } from "react-icons/ci";

import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Hotel = () => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length > 2) {
        setLoading(true);
        fetchCities();
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchCities = async () => {
    try {
      const response = await fetch(
        `https://stingray-equal-primarily.ngrok-free.app/city/${searchTerm}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      console.log(response);
      const data = await response.json();
      setCities(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cities: ", error);
      setLoading(false);
    }
  };

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = async () => {
    try {
      const cityId = cities[0].id;

      const postData = {
        Checkin: format(date[0].startDate, "yyyy-MM-dd"),
        Checkout: format(date[0].endDate, "yyyy-MM-dd"),
        Adults: options.adult,
        Children: options.children,
        Region: cityId,
      };
      console.log(postData);
      const response = await axios.post(
        "http://localhost:5000/search",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const responseData = response.data;
        console.log("Response from server:", responseData);
        navigate("/hotels", { state: { destination, date, options } });
      } else {
        console.error("Failed to send data to server");
      }
    } catch (error) {
      console.error("Error sending data to server: ", error);
    }
  };

  const handleChange = (event) => {
    if (event.target.value.trim) {
      setCities([]);
    }
    setSearchTerm(event.target.value);
  };

  const location = useLocation();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const hotel = location.state.hotel;

  const photos = hotel.images.map((image) => ({
    src: image.replace("{size}", "x500"),
  }));

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === photos.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const { name, address, description_struct, star_rating } = hotel;

  const getDescription = (descriptionStruct) => {
    if (descriptionStruct && descriptionStruct.length > 0) {
      return descriptionStruct.map((struct) => struct.paragraphs.join("\n"));
    }
    return "No description available";
  };

  const getDescriptionTitle = (descriptionStruct) => {
    if (descriptionStruct && descriptionStruct.length > 0) {
      return descriptionStruct.map((struct) => struct.title).join("\n");
    }
    return "Description";
  };

  const getFeatures = (features) => {
    return features.map((feature) => (
      <li className="fListItem" key={feature}>
        {feature}
      </li>
    ));
  };

  return (
    <div>
      <Navbar />
      <Header />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <div className="header-hotel">
            <div className="right-section-header-hotel">
              <div className="btn-handler-hotel">
                <div className="like-share-hotel">
                  <FaRegHeart />
                  <LuShare2 />
                </div>
                <button className="bookNow">Reserve Now!</button>
              </div>
              <span>
                {" "}
                <BsTag /> We Price Match{" "}
              </span>
            </div>
            <div className="details-hotel">
              <h1 className="hotelTitle">{name}</h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{address}</span>
              </div>
              <span className="hotelDistance">
                Excellent location – 500m from center
              </span>
            </div>
          </div>
          <div className="hotel-res">
            <div className="search-box-hotel">
              <p>Search</p>
            </div>
            <div className="hotelImages">
              {/* <div className="hotelImgWrapper">
              <img
                onClick={() => handleOpen(0)}
                src={photos[0].src}
                alt=""
                className="hotelImg"
              />
            </div>
            <div className="hotelImgWrapper">
              <img
                onClick={() => handleOpen(1)}
                src={photos[1].src}
                alt=""
                className="hotelImg"
              />
            </div>
            <div className="thumbnails">
              {photos.slice(2).map((photo, i) => (
                <div className="thumbnailImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i + 2)}
                    src={photo.src}
                    alt=""
                    className="thumbnailImg"
                  />
                </div>
              ))}
            </div> */}

              <div className="thumbnails">
                {photos.map((photo, i) => {
                  if (i >= 6) {
                    return;
                  } else {
                    return (
                      <div
                        className="thumbnailImgWrapper"
                        aria-index={i}
                        key={i}
                      >
                        <img
                          onClick={() => handleOpen(i + 2)}
                          src={photo.src}
                          alt=""
                          className="thumbnailImg"
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">
                {getDescriptionTitle(description_struct)}
              </h1>
              {getDescription(description_struct).map((paragraph, index) => (
                <p className="hotelDesc" key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div>
              <h1>Hotel features</h1>

              <div className="fLists">
                <ul className="fList">{getFeatures(hotel.serp_filters)}</ul>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
