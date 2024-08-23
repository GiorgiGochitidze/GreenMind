import "./CSS/banner.css";
import bannerPart from "../assets/bannerPart.png";
import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";

const Banner = ({ setSearchState, setSearchQuery }) => {
  const [inputVal, setInputVal] = useState("");
  const [plantsData, setPlantsData] = useState([])
  const [usersList, setUsersList] = useState([])

  useEffect(() => {
    axios.post('https://greenmind-2844.onrender.com/loadPlants')
      .then((response) => {
        setPlantsData(response.data);
      })
      .catch((err) => {
        console.log('Something went wrong while fetching plants data', err);
      });
  }, []);

  useEffect(() => {
    axios.post('https://greenmind-2844.onrender.com/loadUsers')
      .then((response) => {
        setUsersList(response.data);
      })
      .catch((err) => {
        console.log('Something went wrong while fetching users data', err);
      });
  }, []);

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
              <span style={{ fontSize: "30px" }}>{plantsData.length}</span> <br /> plant species
            </p>

            <div className="line"></div>

            <p>
              <span style={{ fontSize: "30px" }}>{usersList.length}</span> <br /> Customers
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
