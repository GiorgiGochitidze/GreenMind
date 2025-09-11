import { BsArrowRight } from "react-icons/bs";
import "./CSS/BestSellingPlants.css";
import BestSellingList from "./BestSellingList";

const BestSellingPlants = () => {
  return (
    <div className="bestSelling-container">
      <div className="bestSelling-textPart">
        <h2>
          Best Selling <br /> Plants
        </h2>
        <p>
          Easiest way to <br /> healthy life by buying <br /> your favorite
          plants{" "}
        </p>
        <button>
          See More <BsArrowRight size={20} />
        </button>
      </div>
      <BestSellingList />
    </div>
  );
};

export default BestSellingPlants;
