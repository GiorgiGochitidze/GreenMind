import { useEffect, useRef, useState } from "react";
import "./CSS/products.css";
import PlantsCard from "./PlantsCard";
import Fuse from "fuse.js";
import axios from "axios";
import PaymentForm from "./PaymentForm";

const Products = ({ searchQuery, purchasheState, setPurchasheState, cardData }) => {
  const [plantsData, setPlantsData] = useState([]);
  const paymentFormRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (paymentFormRef.current && !paymentFormRef.current.contains(event.target)) {
        setPurchasheState(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setPurchasheState]);

  useEffect(() => {
    axios.post('https://greenmind-2844.onrender.com/loadPlants')
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
      {purchasheState && cardData && (
        <PaymentForm 
          purchashes={cardData.purchashes} 
          paymentFormRef={paymentFormRef} 
          cardData={cardData}
          setPurchasheState={setPurchasheState} 
          purchasheState={purchasheState} 
        />
      )}
      {results.length > 0 ? (
        results.map((plant, index) => (
          <PlantsCard
            key={index}
            imgURL={plant.imgUrl}
            PlantsName={plant.plantsname}
            Price={plant.price}
            cardId={plant._id}
            purchashes={plant.purchashes}
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
