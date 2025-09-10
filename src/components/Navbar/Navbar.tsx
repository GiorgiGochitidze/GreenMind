import { CiMenuFries, CiUser } from "react-icons/ci";
import "./CSS/Navbar.css"
import { PiShoppingCartSimpleLight } from "react-icons/pi";

const Navbar = () => {
  return (
    <header>
      <nav>
        <p>GREENMIND</p>

        <div className="navigation-items">
          <p>Home</p>
          <p>Products</p>
          <p>Contacts</p>
        </div>

        <div className="navigation-icons-list">
          <PiShoppingCartSimpleLight size={25} />
          <CiUser size={25} />
          <CiMenuFries size={25} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
