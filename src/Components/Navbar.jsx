import { CiUser } from "react-icons/ci";
import "./CSS/navbar.css";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import MenuIcon from "../assets/menuicon.png";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const token = sessionStorage.getItem("token");
const decoded = token ? jwtDecode(token) : "token doesn't exist";

const Navbar = () => {
  const [profile, setProfile] = useState(false);
  const profileRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfile(false);
      }
    };

    if (profile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profile]);

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
                  color: index === indexVal ? "black" : "rgba(30, 30, 30, 50%)",
                  textDecoration: "none",
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
          {!token && (
            <Link
              onClick={() => setIndexVal(null)}
              style={{ textDecoration: "none", color: "black" }}
              to="/Registration"
            >
              <CiUser className="icons" size={25} />
            </Link>
          )}

          {token && (
            <div
              ref={profileRef} // Attach the ref to this div
              style={{
                position: "relative",
                width: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CiUser
                onClick={() => setProfile(!profile)}
                className="icons"
                size={25}
              />
              {profile && (
                <div className="userItems-container">
                  <p>{decoded.userName}</p>
                  <p>Profile</p>
                  <p>Cart</p>
                  <p
                    onClick={() => {
                      sessionStorage.removeItem("token");
                      window.location.reload();
                    }}
                  >
                    Log Out
                  </p>
                </div>
              )}
            </div>
          )}
          <img className="icons" src={MenuIcon} alt="MenuIcon" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
