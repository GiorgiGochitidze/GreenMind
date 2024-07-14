import { CiUser } from "react-icons/ci";
import "./CSS/navbar.css";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import  MenuIcon  from "../assets/menuicon.png";
import { useState } from "react";

const Navbar = () => {

  const navList = ['Home', 'Products', 'Contacts']

  const [indexVal, setIndexVal] = useState(0)

  return (
    <header>
      <nav>
        <div className="navigation-words">
          <h1 style={{ color: "1E1E1E", fontWeight: 300 }}>GREENMIND</h1>

          <div className="nav-words">
            {navList.map((nav, index) => (
              <p onClick={() => setIndexVal(index)} style={{color: index === indexVal ? 'black' : 'rgba(30, 30, 30, 50%)'}} key={index}>{nav}</p>
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
