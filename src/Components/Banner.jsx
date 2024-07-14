import "./CSS/banner.css";
import bannerPart from "../assets/bannerPart.png";
import rightArrowRounded from "../assets/rightArrowRounded.png";
import leftArrowRounded from "../assets/leftArrowRounded.png";
import { IoIosSearch } from "react-icons/io";

const Banner = () => {
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
            <p style={{wordBreak: 'keep-all'}}>
              <span style={{ fontSize: "30px" }}>50+</span> <br /> plant species
            </p>

            <div className="line"></div>

            <p>
              <span style={{ fontSize: "30px" }}>100+</span> <br /> Customers
            </p>
          </div>

          <div className="searchbar">
            <input type="text" placeholder="What are you looking for?" />
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
