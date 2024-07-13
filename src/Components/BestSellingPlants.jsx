import './CSS/bestsellingplants.css'
import { HiArrowLongRight } from 'react-icons/hi2';
import PlantsList from './PlantsList';


const BestSellingPlants = () => {
    return ( 
        <div className="bestSellingPlants-container">
            <div className="goToAllItems-container">
                <h1>Best Selling <br /> Plants</h1>
                <p style={{color: 'rgba(30, 30, 30)', opacity: "50%"}}>Easiest way to <br /> healthy life by buying <br /> your favorite plants </p>
                <button className='seeMore-btn'>See More <HiArrowLongRight size={20} /></button>
            </div>

            <PlantsList />
        </div>
     );
}
 
export default BestSellingPlants;