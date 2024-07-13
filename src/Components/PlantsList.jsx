import './CSS/plantslist.css'
import PlantsCard from './PlantsCard'
import naturalPlant from '../assets/naturalPlant.png'
import artificialPlant1 from '../assets/artificialPlant1.png'
import artificialPlant2 from '../assets/artificialPlant2.png'

const PlantsList = () => {
    return ( 
        <div className="plantsList-container">
            <PlantsCard imgURL={naturalPlant} PlantsName={"Natural Plant"} Price={100} />
            <PlantsCard imgURL={artificialPlant1} PlantsName={"Artificial Plant"} Price={200} />
            <PlantsCard imgURL={artificialPlant2} PlantsName={"Artificial Plant"} Price={300} />
        </div>
     );
}
 
export default PlantsList;