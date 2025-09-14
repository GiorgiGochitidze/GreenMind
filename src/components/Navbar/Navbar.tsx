import { useEffect, useRef, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { PiShoppingCartSimpleLight, PiUserCircleLight } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { LinkStyles } from "../LinkStyles";
import { useAppSelector } from "../../store/hooks";
import ProfileDropdown from "./ProfileDropdown";
import "./CSS/Navbar.css";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Contacts", path: "/contacts" },
];

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useAppSelector((state) => state.user);
  const [openProfile, setOpenProfile] = useState<boolean>(false);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          {user && <PiShoppingCartSimpleLight size={25} />}
          {!user ? (
            <>
              <Link style={LinkStyles} to="/signIn">
                <p className="navitaion-icons-item">Sign In</p>
              </Link>
              <Link style={LinkStyles} to="/signUp">
                <p className="navitaion-icons-item">Sign Up</p>
              </Link>
            </>
          ) : (
            <div className="user-profile-icon" ref={profileRef}>
              <PiUserCircleLight
                onClick={() => setOpenProfile(!openProfile)}
                size={25}
              />
              {openProfile && (
                <ProfileDropdown
                  openProfile={openProfile}
                  setOpenProfile={setOpenProfile}
                />
              )}
            </div>
          )}
          <CiMenuFries className="menu-icon" size={25} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
