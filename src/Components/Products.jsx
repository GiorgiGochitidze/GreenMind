import { useEffect, useState } from "react";
import "./CSS/products.css";
import PlantsCard from "./PlantsCard";
import Fuse from "fuse.js";
import axios from "axios";
import PaymentForm from "./PaymentForm";

const Products = ({ searchQuery, purchasheState, setPurchasheState }) => {
  const [plantsData, setPlantsData] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:5000/loadPlants')
      .then((response) => {
        setPlantsData(response.data);
      })
      .catch((err) => {
        console.log('Something went wrong while fetching plants data', err);
      });
  }, []);

  const options = {
    keys: ["plantsname"], // Adjust the key to match your data structure
    threshold: 0.3, // Adjust the threshold to control fuzziness
  };

  const fuse = new Fuse(plantsData, options);
  const results = searchQuery ? fuse.search(searchQuery).map(result => result.item) : plantsData;

  return (
    <div className="products-container">
      {purchasheState && <PaymentForm setPurchasheState={setPurchasheState} purchasheState={purchasheState} />}
      {results.length > 0 ? (
        results.map((plant, index) => (
          <PlantsCard
            key={index}
            imgURL={plant.imgUrl} // Adjust the property name to match your data structure
            PlantsName={plant.plantsname} // Adjust the property name to match your data structure
            Price={plant.price} // Adjust the property name to match your data structure
            cardId={plant._id}
            purchasheState={purchasheState}
            setPurchasheState={setPurchasheState}
          />
        ))
      ) : (
        <p>Items not found...</p>
      )}
    </div>
  );
};

export default Products;
