import "./LandingBanner.css";
import PlantImage from "../../../assets/Home/PlantBannerImage.png";
import { CiSearch } from "react-icons/ci";

const LandingBanner = () => {
  return (
    <div className="landingBanner-container">
      <div className="banner-card">
        <div className="banner-text-container">
          <h1>
            Buy your <br /> dream plants
          </h1>
          <div className="simple-statistics">
            <div className="simple-statistics-item">
              <p>50+</p>
              <p>Plant Species</p>
            </div>
            <div className="simple-middleLine"></div>
            <div className="simple-statistics-item">
              <p>100+</p>
              <p>Customers</p>
            </div>
          </div>

          <label htmlFor="search-input">
            <input placeholder="What are you looking for?" type="text" id="search-input" name="search-input" />
            <div className="search-icon-container">
            <CiSearch size={20} />
            </div>
          </label>
        </div>
        <img
          className="banner-image"
          src={PlantImage}
          alt="Plant Banner Image"
        />
      </div>
    </div>
  );
};

export default LandingBanner;
