import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Products from "./Components/Products";
import ContactUs from "./Components/ContactUs";
import Registration from "./Components/Registration";
import LogIn from "./Components/LogIn";
import Cart from "./Components/Cart";

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
