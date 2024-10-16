import { useRef, useEffect, useState } from "react";
import "./CSS/plantslist.css";
import PaymentForm from "./PaymentForm";
import PlantsCard from "./PlantsCard";
import axios from "axios";

const PlantsList = ({ purchasheState, itemsAmount, setPurchasheState, cardData }) => {
  const [topPlantsData, setTopPlantsData] = useState([]);
  const paymentFormRef = useRef(null);

  useEffect(() => {
    axios
      .post("https://greenmind-2844.onrender.com/loadPlants")
      .then((response) => {
        // Sort the data based on purchashes in descending order
        const sortedPlants = response.data.sort(
          (a, b) => b.purchashes - a.purchashes
        );
        // Limit the topPlantsData to only 3 items
        setTopPlantsData(sortedPlants.slice(0, 3));
      })
      .catch((err) => {
        console.log("Something went wrong while fetching plants data", err);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        paymentFormRef.current &&
        !paymentFormRef.current.contains(event.target)
      ) {
        setPurchasheState(false);
      }
    };

    // Add event listener for mousedown events
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setPurchasheState]);

  return (
    <div className="plantsList-container">
      {purchasheState && (
        <PaymentForm
          paymentFormRef={paymentFormRef}
          purchasheState={purchasheState}
          setPurchasheState={setPurchasheState}
          cardData={cardData}
        />
      )}

      {topPlantsData.map((plants, index) => (
        <PlantsCard
          key={index}
          imgURL={plants.imgUrl}
          PlantsName={plants.plantsname}
          Price1={plants.price1}
          Price2={plants.price2}
          cardId={plants._id}
          itemsAmount={itemsAmount}
          purchashes={plants.purchashes}
          purchasheState={purchasheState}
          setPurchasheState={setPurchasheState}
        />
      ))}
    </div>
  );
};

export default PlantsList;
