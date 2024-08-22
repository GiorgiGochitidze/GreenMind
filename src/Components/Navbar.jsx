import { CiUser } from "react-icons/ci";
import "./CSS/navbar.css";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import MenuIcon from "../assets/menuicon.png";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import axios from "axios";

const token = sessionStorage.getItem("token");
const decoded = token ? jwtDecode(token) : "token doesnt exists";

const Navbar = () => {
  const [profile, setProfile] = useState(false);
  const [settings, setSettings] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const profileRef = useRef(null);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  
  const navList = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/Products" },
    { name: "Contacts", path: "/ContactUs" },
  ];

  const determineActiveIndex = () => {
    const currentPath = location.pathname;
    if (currentPath === "/Cart") return -1; // Special case for Cart
    const activeIndex = navList.findIndex((nav) => nav.path === currentPath);
    return activeIndex !== -1 ? activeIndex : 0;
  };

  const [indexVal, setIndexVal] = useState(determineActiveIndex);

  useEffect(() => {
    const activeIndex = determineActiveIndex();
    setIndexVal(activeIndex);
    localStorage.setItem("activeNavIndex", activeIndex);
  }, [location.pathname]);

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

    document.addEventListener("mousedown", handleClickOutsideProfile);
    document.addEventListener("mousedown", handleClickOutsideMenu);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideProfile);
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, [profile, menu]);

  const handleNavClick = (index) => {
    if (index !== -1) { // Prevent updating indexVal for Cart
      setIndexVal(index);
      localStorage.setItem("activeNavIndex", index);
    }
    setMenu(false);
    setProfile(false);
  };

  const linkStyle = {
    textDecoration: "none",
    color: 'black',
  };

  const handleSaveChanges = async () => {
    if (!isValidEmail()) {
      setMessage("Incorrect email format");
      setTimeout(() => setMessage(""), 1200);
      return;
    }

    setTimeout(() => window.location.reload(), 1500);

    try {
      const response = await axios.post("https://greenmind-2844.onrender.com/updateUser", {
        userId: decoded.userId,
        userName,
        email,
        password,
      });
      setMessage(response.data); // Display the response message
    } catch (err) {
      console.error("Error updating user:", err);
      setMessage("Error updating user");
    }
  };

  return (
    <header>
      <nav>
        <div className="navigation-words">
          <Link onClick={() => handleNavClick(0)} style={linkStyle} to="/">
            <h1
              style={{
                color: "#1E1E1E",
                fontWeight: 300,
                fontFamily: "Advent-Pro",
              }}
            >
              GREENMIND
            </h1>
          </Link>

          <div className="nav-words">
            {navList.map((nav, index) => (
              <Link
                onClick={() => handleNavClick(index)}
                style={{
                  color: (location.pathname === "/Cart" ? "rgba(30, 30, 30, 50%)" : (index === indexVal ? "black" : "rgba(30, 30, 30, 50%)")),
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
          <Link onClick={() => handleNavClick(-1)} to="/Cart" style={linkStyle}>
            <PiShoppingCartSimpleLight className="icons" size={25} />
          </Link>
          {!token && (
            <Link
              onClick={() => handleNavClick(-1)}
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
                  {decoded.role === "Admin" && (
                    <Link
                      onClick={() => setProfile(false)}
                      className="profile-items"
                      style={linkStyle}
                      to="/AddNewPlants"
                    >
                      <p>Add New Plants</p>
                    </Link>
                  )}
                  <Link
                    onClick={() => setProfile(false)}
                    className="profile-items"
                    to="/Cart"
                    style={linkStyle}
                  >
                    <p>Cart</p>
                  </Link>
                  <p
                    onClick={() =>
                      settings ? setSettings(false) : setSettings(true)
                    }
                    className="profile-items"
                  >
                    Settings
                  </p>
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
                      color: (location.pathname === "/Cart" ? "rgba(30, 30, 30, 50%)" : (index === indexVal ? "black" : "rgba(30, 30, 30, 50%)")),
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

      {settings && (
        <div className="settings-container">
          <div className="settings-pad">
            <h1 style={{ margin: "0 auto" }}>Settings</h1>
            <label>
              Username:
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Change User Name"
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Change User Email"
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
              />
            </label>
            <button className="saveChanges-btn" onClick={handleSaveChanges}>Save Changes</button>
            <button className="saveChanges-btn" onClick={() => setSettings(false)}>Cancel</button>
            <div>{message}</div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
