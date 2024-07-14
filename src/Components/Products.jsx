import "./CSS/products.css";
import PlantsCard from "./PlantsCard";
import naturalPlant from "../assets/naturalPlant.png";
import artificialPlant1 from "../assets/artificialPlant1.png";
import artificialPlant2 from "../assets/artificialPlant2.png";

const Products = () => {
  const PlantsList = [
    { imgURL: naturalPlant, PlantsName: "Natural Plant", Price: 100 },
    { imgURL: artificialPlant1, PlantsName: "Artificial Plant", Price: 200 },
    { imgURL: artificialPlant2, PlantsName: "Artificial Plant", Price: 300 },
  ];

  return (
    <div className="products-container">
      {PlantsList.map((plants, index) => (
        <PlantsCard
          key={index}
          imgURL={plants.imgURL}
          PlantsName={plants.PlantsName}
          Price={plants.Price}
        />
      ))}
    </div>
  );
};

export default Products;
