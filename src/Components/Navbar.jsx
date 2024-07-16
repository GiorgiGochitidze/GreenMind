import { CiUser } from "react-icons/ci";
import "./CSS/navbar.css";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import MenuIcon from "../assets/menuicon.png";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";

const token = sessionStorage.getItem("token");
const decoded = token ? jwtDecode(token) : "token doesn't exist";

const Navbar = () => {
  const [profile, setProfile] = useState(false);
  const profileRef = useRef(null);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);

  const [indexVal, setIndexVal] = useState(() => {
    // Retrieve the index from local storage or default to 0
    return parseInt(localStorage.getItem("activeNavIndex"), 10) || 0;
  });

  useEffect(() => {
    // Update local storage whenever indexVal changes
    localStorage.setItem("activeNavIndex", indexVal);
  }, [indexVal]);

  useEffect(() => {
    const handleClickOutsideProfile = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfile(false);
      }
    };

    const handleClickOutsideMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
      }
    };

    if (profile) {
      document.addEventListener("mousedown", handleClickOutsideProfile);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideProfile);
    }

    if (menu) {
      document.addEventListener("mousedown", handleClickOutsideMenu);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideProfile);
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, [profile, menu]);

  const handleNavClick = (index) => {
    setIndexVal(index);
    setMenu(false);
    setProfile(false);
  };

  const linkStyle = {
    textDecoration: "none",
    color: "black",
  };

  const navList = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/Products" },
    { name: "Contacts", path: "/ContactUs" },
  ];

  return (
    <header>
      <nav>
        <div className="navigation-words">
          <Link
            onClick={() => {
              setTimeout(() => {
                window.location.reload();
              }, 400);
            }}
            style={linkStyle}
            to="/"
          >
            <h1 style={{ color: "#1E1E1E", fontWeight: 300 }}>GREENMIND</h1>
          </Link>

          <div className="nav-words">
            {navList.map((nav, index) => (
              <Link
                onClick={() => handleNavClick(index)}
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
          <Link
            onClick={() => handleNavClick(null)}
            to="/Cart"
            style={linkStyle}
          >
            <PiShoppingCartSimpleLight className="icons" size={25} />
          </Link>
          {!token && (
            <Link
              onClick={() => handleNavClick(null)}
              style={linkStyle}
              to="/Registration"
            >
              <CiUser className="icons" size={25} />
            </Link>
          )}

          {token && (
            <div
              ref={profileRef}
              style={{
                position: "relative",
                width: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CiUser
                onClick={() => {
                  setProfile(!profile);
                  setMenu(false);
                }}
                className="icons"
                size={25}
              />
              {profile && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "200px" }}
                  transition={{ duration: 0.2 }}
                  className="userItems-container"
                >
                  <p className="profile-items">{decoded.userName}</p>
                  <p className="profile-items">Add New Plants</p>
                  <Link
                    onClick={() => setProfile(false)}
                    className="profile-items"
                    to="/Cart"
                    style={linkStyle}
                  >
                    <p>Cart</p>
                  </Link>
                  <p className="profile-items">Settings</p>
                  <p
                    className="profile-items"
                    onClick={() => {
                      sessionStorage.removeItem("token");
                      window.location.reload();
                    }}
                  >
                    Log Out
                  </p>
                </motion.div>
              )}
            </div>
          )}
          <div
            onClick={() => {
              setMenu(!menu);
              setProfile(false);
            }}
            ref={menuRef}
            className="menu-container"
          >
            <img className="icons" src={MenuIcon} alt="MenuIcon" />

            {menu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "150px" }}
                className="menu-dropbox"
              >
                {navList.map((nav, index) => (
                  <Link
                    className="dropbox-items"
                    onClick={() => handleNavClick(index)}
                    style={{
                      color:
                        index === indexVal ? "black" : "rgba(30, 30, 30, 50%)",
                      textDecoration: "none",
                    }}
                    key={index}
                    to={nav.path}
                  >
                    <p>{nav.name}</p>
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
