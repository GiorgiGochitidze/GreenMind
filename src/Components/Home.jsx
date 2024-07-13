import AboutUs from './AboutUs';
import Banner from './Banner';
import BestSellingPlants from './BestSellingPlants';
import './CSS/home.css'
import Navbar from './Navbar';

const Home = () => {
    return ( 
        <main>
            <Navbar />

            <Banner />

            <BestSellingPlants />

            <AboutUs />
        </main>
     );
}
 
export default Home;