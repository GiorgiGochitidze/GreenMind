import React from "react";
import CategoriesCard from "./CategoriesCard";
import "./CSS/categories.css";
import plantAccessories from "../assets/plantAccessories.png";
import naturalPlants from "../assets/naturalPlants.png";
import artificialPlants from "../assets/artificialPlants.png";
import { HiArrowLongRight } from "react-icons/hi2";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const Categories = () => {
  const isScreenWidth800 = useMediaQuery({ query: "(max-width: 956px)" });

  const LinkStyles = {
    textDecoration: 'none',
    color: 'black'
  }

  const cards = [
    { imgUrl: plantAccessories, plantDescription: "Plant Accessories" },
    { imgUrl: naturalPlants, plantDescription: "Natural Plants" },
    { imgUrl: artificialPlants, plantDescription: "Artificial Plants" },
  ];

  return (
    <div className="categories-container">
      <h1 style={{ textAlign: "center" }}>Categories</h1>
      <p style={{ textAlign: "center", color: "rgba(30, 30, 30, 50%)" }}>
        Find what you are looking for
      </p>

      <div className="categories-list">
        {cards.map((card, index) => (
          <CategoriesCard
            key={index}
            imgUrl={card.imgUrl}
            plantDescription={card.plantDescription}
            index={index}
            className={`${index === 0 ? "first-card" : ""} ${
              index === 2 ? "third-card" : ""
            }`}
          >
            {isScreenWidth800
              ? index === 2 && (
                  <Link style={LinkStyles} to="/Products">
                    <button className="explore-btn">
                      Explore <HiArrowLongRight size={20} />
                    </button>
                  </Link>
                )
              : index === 1 && (
                  <Link style={LinkStyles} to="/Products">
                    <button className="explore-btn">
                      Explore <HiArrowLongRight size={20} />
                    </button>
                  </Link>
                )}
          </CategoriesCard>
        ))}
      </div>
    </div>
  );
};

export default Categories;
