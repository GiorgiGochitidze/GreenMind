import BestSellingCard from "./BestSellingCard";
import NaturalPlant from "../../../assets/PlantCardImages/NaturalPlant.png";
import ArtificialPlant1 from "../../../assets/PlantCardImages/ArtificialPlant2.png";
import ArtificialPlant2 from "../../../assets/PlantCardImages/ArtificialPlant1.png";

const BestSellingList = () => {
  return (
    <div className="bestSelling-list">
      <BestSellingCard
        cardImage={NaturalPlant}
        cardTitle={"Natural Plant"}
        cardPrice={1000}
      />
      <BestSellingCard
        cardImage={ArtificialPlant1}
        cardTitle={"Artificial Plant"}
        cardPrice={1000}
      />
      <BestSellingCard
        cardImage={ArtificialPlant2}
        cardTitle={"Artificial Plant"}
        cardPrice={1000}
      />
    </div>
  );
};

export default BestSellingList;
