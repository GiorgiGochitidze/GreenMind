import { useRef, useEffect } from 'react';
import './CSS/plantslist.css';
import PlantsCard from './PlantsCard';
import naturalPlant from '../assets/naturalPlant.png';
import artificialPlant1 from '../assets/artificialPlant1.png';
import artificialPlant2 from '../assets/artificialPlant2.png';
import PaymentForm from './PaymentForm';

const PlantsList = ({ purchasheState, setPurchasheState }) => {
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

  return (
    <div className="plantsList-container">
      {purchasheState && (
          <PaymentForm paymentFormRef={paymentFormRef} purchasheState={purchasheState} setPurchasheState={setPurchasheState} />
      )}
      <PlantsCard purchasheState={purchasheState} setPurchasheState={setPurchasheState} imgURL={naturalPlant} PlantsName={"Natural Plant"} Price={100} />
      <PlantsCard purchasheState={purchasheState} setPurchasheState={setPurchasheState} imgURL={artificialPlant1} PlantsName={"Artificial Plant"} Price={200} />
      <PlantsCard purchasheState={purchasheState} setPurchasheState={setPurchasheState} imgURL={artificialPlant2} PlantsName={"Artificial Plant"} Price={300} />
    </div>
  );
};

export default PlantsList;
