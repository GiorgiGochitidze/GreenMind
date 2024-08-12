import './CSS/plantslist.css'
import PlantsCard from './PlantsCard'
import naturalPlant from '../assets/naturalPlant.png'
import artificialPlant1 from '../assets/artificialPlant1.png'
import artificialPlant2 from '../assets/artificialPlant2.png'
import PaymentForm from './PaymentForm'

const PlantsList = ({purchasheState, setPurchasheState}) => {
    return ( 
        <div className="plantsList-container">
            {purchasheState && <PaymentForm purchasheState={purchasheState} setPurchasheState={setPurchasheState} />}
            <PlantsCard purchasheState={purchasheState} setPurchasheState={setPurchasheState} imgURL={naturalPlant} PlantsName={"Natural Plant"} Price={100} />
            <PlantsCard purchasheState={purchasheState} setPurchasheState={setPurchasheState} imgURL={artificialPlant1} PlantsName={"Artificial Plant"} Price={200} />
            <PlantsCard purchasheState={purchasheState} setPurchasheState={setPurchasheState} imgURL={artificialPlant2} PlantsName={"Artificial Plant"} Price={300} />
        </div>
     );
}
 
export default PlantsList;