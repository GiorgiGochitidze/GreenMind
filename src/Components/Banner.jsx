import "./CSS/banner.css";
import bannerPart from "../assets/bannerPart.png";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";

const Banner = ({ setSearchState, searchState, setSearchQuery }) => {
  const [inputVal, setInputVal] = useState("");

  return (
    <div className="banner-container">
      <div className="banner-items-container">
        <div className="text-container">
          <h1
            style={{
              fontSize: "50px",
              fontWeight: "900",
              marginTop: "30px",
              lineHeight: "60px",
            }}
          >
            Buy your <br /> dream plants
          </h1>

          <div className="amounts-counterInfo">
            <p style={{ wordBreak: "keep-all" }}>
              <span style={{ fontSize: "30px" }}>50+</span> <br /> plant species
            </p>

            <div className="line"></div>

            <p>
              <span style={{ fontSize: "30px" }}>100+</span> <br /> Customers
            </p>
          </div>

          <div className="searchbar">
            <input
              onFocus={() => setSearchState(true)}
              value={inputVal}
              onChange={(e) => {
                const value = e.target.value;
                setInputVal(value);
                setSearchQuery(value);
                if (value === '') {
                  setSearchState(false);
                } else {
                  setSearchState(true);
                }
              }}
              type="text"
              placeholder="What are you looking for?"
            />
            <div className="searchIcon-container">
              <IoIosSearch />
            </div>
          </div>
        </div>

        <div className="image-container">
          <img
            className="flower-image"
            src={bannerPart}
            alt="banner part image of flower"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
