import { CiUser } from "react-icons/ci";
import "./CSS/navbar.css";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import MenuIcon from "../assets/menuicon.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navList = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/Products" },
    { name: "Contacts", path: "/ContactUs" },
  ];

  // Retrieve the index from local storage or default to 0
  const initialIndex = parseInt(localStorage.getItem("activeNavIndex")) || 0;
  const [indexVal, setIndexVal] = useState(initialIndex);

  useEffect(() => {
    // Update local storage whenever indexVal changes
    localStorage.setItem("activeNavIndex", indexVal);
  }, [indexVal]);

  return (
    <header>
      <nav>
        <div className="navigation-words">
          <h1 style={{ color: "#1E1E1E", fontWeight: 300 }}>GREENMIND</h1>

          <div className="nav-words">
            {navList.map((nav, index) => (
              <Link
                onClick={() => setIndexVal(index)}
                style={{
                  color: index === indexVal ? "black" : "rgba(30, 30, 30, 50%)", textDecoration: 'none'
                }}
                key={index}
                to={nav.path}
              >
                <p>{nav.name}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="navigation-icons">
          <PiShoppingCartSimpleLight className="icons" size={25} />
          <CiUser className="icons" size={25} />
          <img className="icons" src={MenuIcon} alt="MenuIcon" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
