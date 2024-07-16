import "./CSS/products.css";
import PlantsCard from "./PlantsCard";
import PlantsLists from "./PlantsLists";
import Fuse from "fuse.js";

const Products = ({ searchQuery }) => {
  const options = {
    keys: ["PlantsName"], // Words using as a search key
    threshold: 0.3, // Adjust the threshold to control fuzziness
  };

  const fuse = new Fuse(PlantsLists, options);
  const results = searchQuery ? fuse.search(searchQuery).map(result => result.item) : PlantsLists;

  return (
    <div className="products-container">
      {results.length > 0 ? (
        results.map((plants, index) => (
          <PlantsCard
            key={index}
            imgURL={plants.imgURL}
            PlantsName={plants.PlantsName}
            Price={plants.Price}
          />
        ))
      ) : (
        <p>Items not found...</p>
      )}
    </div>
  );
};

export default Products;
