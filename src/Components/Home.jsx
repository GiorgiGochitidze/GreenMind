import { useState } from "react";
import AboutUs from "./AboutUs";
import Banner from "./Banner";
import BestSellingPlants from "./BestSellingPlants";
import Categories from "./Categories";
import Comments from "./Comments";
import "./CSS/home.css";

const Home = ({ purchasheState, setPurchasheState }) => {
  const [searchState, setSearchState] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main>
      <Banner
        searchState={searchState}
        setSearchState={setSearchState}
        setSearchQuery={setSearchQuery}
      />
      <BestSellingPlants
        searchState={searchState}
        setSearchState={setSearchState}
        searchQuery={searchQuery}
        purchasheState={purchasheState}
        setPurchasheState={setPurchasheState}
      />
      <AboutUs />
      <Categories />
      <Comments />
    </main>
  );
};

export default Home;
