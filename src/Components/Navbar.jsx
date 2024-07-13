import { CiUser } from "react-icons/ci";
import "./CSS/navbar.css";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import  MenuIcon  from "../assets/menuicon.png";

const Navbar = () => {
  return (
    <header>
      <nav>
        <div className="navigation-words">
          <h1 style={{ color: "1E1E1E", fontWeight: 300 }}>GREENMIND</h1>

          <div className="nav-words">
            <p>Home</p>
            <p>Products</p>
            <p>Contacts</p>
          </div>
        </div>

        <div className="navigation-icons">
          <PiShoppingCartSimpleLight size={25} />
          <CiUser size={25} />
          <img src={MenuIcon} alt="MenuIcon" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
