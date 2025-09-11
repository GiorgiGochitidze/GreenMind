import LandingBanner from "./Landing/LandingBanner";
import "./CSS/Home.css";
import BestSellingPlants from "./BestSellingPlants/BestSellingPlants";
import AboutUs from "./AboutUs/AboutUs";
import Categories from "./Categories/Categories";
import Comments from "./Comments/Comments";

const Home = () => {
  return (
    <main>
      <LandingBanner />

      <BestSellingPlants />

      <AboutUs />

      <Categories />

      <Comments />
    </main>
  );
};

export default Home;
