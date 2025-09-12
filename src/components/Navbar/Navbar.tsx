import { CiMenuFries } from "react-icons/ci";
import "./CSS/Navbar.css";
// import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { LinkStyles } from "../LinkStyles";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Contacts", path: "/contacts" },
];

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header>
      <nav>
        <p>GREENMIND</p>

        <div className="navigation-items">
          {navItems.map((item) => (
            <Link
              style={{
                ...LinkStyles,
                color: currentPath === item.path ? "black" : "gray",
              }}
              to={item.path}
              key={item.path}
            >
              <p>{item.label}</p>
            </Link>
          ))}
        </div>

        <div className="navigation-icons-list">
          {/* <PiShoppingCartSimpleLight size={25} /> */}
          <Link style={LinkStyles} to="/signIn">
            <p className="navitaion-icons-item">Sign In</p>
          </Link>
          <p className="navitaion-icons-item">Sign Up</p>
          <CiMenuFries className="menu-icon" size={25} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
