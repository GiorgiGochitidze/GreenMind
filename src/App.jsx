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

function App() {
  const [purchasheState, setPurchasheState] = useState(false);

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
            />
          }
        />
        <Route
          path="/Products"
          element={
            <Products
              purchasheState={purchasheState}
              setPurchasheState={setPurchasheState}
            />
          }
        />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Cart" element={<Cart purchasheState={purchasheState} setPurchasheState={setPurchasheState} />} />
        <Route path="/AddNewPlants" element={<AddNewPlants />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
