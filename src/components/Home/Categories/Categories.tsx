import CategoriesCard from "./CategoriesCard";
import "./CSS/Categories.css";
import FirstPlant from "../../../assets/Categories/FIrstPlants.png";
import SecondPlant from "../../../assets/Categories/SecondPlants.png";
import lastPlants from "../../../assets/Categories/LastPlants.png";
import { useMediaQuery } from "react-responsive";

const Categories = () => {
    const isMax600 = useMediaQuery({maxWidth: 600})

  return (
    <div className="categories-container">
      <h4>Categories</h4>
      <p>Find what are you looking for</p>

      <div className="categories-list-container">
        <CategoriesCard cardImage={FirstPlant} cardHeader={"Natural Plants"} />
        <CategoriesCard
          cardImage={SecondPlant}
          cardHeader={"Plant Accessories"}
          showButton={!isMax600 && true}
        />
        <CategoriesCard
          cardImage={lastPlants}
          cardHeader={"Artificial Plants"}
          showButton={isMax600 && true}
        />
      </div>
    </div>
  );
};

export default Categories;
