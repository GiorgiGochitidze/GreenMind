import AboutUs from './AboutUs';
import Banner from './Banner';
import BestSellingPlants from './BestSellingPlants';
import Categories from './Categories';
import './CSS/home.css'
import Navbar from './Navbar';

const Home = () => {
    return ( 
        <main>
            <Navbar />

            <Banner />

            <BestSellingPlants />

            <AboutUs />

            <Categories />
        </main>
     );
}
 
export default Home;