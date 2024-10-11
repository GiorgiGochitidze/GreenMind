import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Products from "./Components/Products";
import ContactUs from "./Components/ContactUs";
import Registration from "./Components/Registration";
import LogIn from "./Components/LogIn";
import Cart from "./Components/Cart";
import AddNewPlants from "./Components/AddNewPlants";
import Footer from "./Components/Footer";
import { useState } from "react";
import { useCardData } from "./Components/useCardData";
import TechWorks from "./Components/TechWorks";
import Terms from "./Components/TermsAndConditions/Terms";
import About from "./Components/AboutUsPage/About";
import Privacy from "./Components/Privacy&Policy/Privacy";

function App() {
  const [purchasheState, setPurchasheState] = useState(false);
  const { cardData } = useCardData();
  const [itemsAmount, setItemsAmount] = useState("1-500-მდე");

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              purchasheState={purchasheState}
              setPurchasheState={setPurchasheState}
              itemsAmount={itemsAmount}
            />
          }
        />
        <Route
          path="/Products"
          element={
            <Products
              purchasheState={purchasheState}
              setPurchasheState={setPurchasheState}
              cardData={cardData}
              itemsAmount={itemsAmount}
              setItemsAmount={setItemsAmount}
            />
          }
        />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route
          path="/Cart"
          element={
            <Cart
              purchasheState={purchasheState}
              setPurchasheState={setPurchasheState}
              itemsAmount={itemsAmount}
            />
          }
        />
        <Route path="/AddNewPlants" element={<AddNewPlants />} />
        <Route path="/Terms" element={<Terms />} />
        <Route path="/AboutUs" element={<About />} />
        <Route path="/Privacy&Policy" element={<Privacy />} />
        <Route path="/TechWorks" element={<TechWorks />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
