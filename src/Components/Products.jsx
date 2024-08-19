import { useEffect, useRef, useState } from "react";
import "./CSS/products.css";
import PlantsCard from "./PlantsCard";
import Fuse from "fuse.js";
import axios from "axios";
import PaymentForm from "./PaymentForm";

const Products = ({ searchQuery, purchasheState, setPurchasheState }) => {
  const [plantsData, setPlantsData] = useState([]);
  const paymentFormRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (paymentFormRef.current && !paymentFormRef.current.contains(event.target)) {
        setPurchasheState(false);
      }
    };

    // Add event listener for mousedown events
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
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
      {purchasheState && <PaymentForm paymentFormRef={paymentFormRef} setPurchasheState={setPurchasheState} purchasheState={purchasheState} />}
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
