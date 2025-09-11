import "./CSS/Footer.css";
import { TiSocialFacebook } from "react-icons/ti";
import { SlSocialInstagram } from "react-icons/sl";
import { FaTwitter } from "react-icons/fa";
import SocialIcon from "./SocialIcon";

const footerNavigationItems = [
  {
    navigationHeader: "Information",
    navigationItems: ["About", "Product", "Blog"],
  },
  {
    navigationHeader: "Company",
    navigationItems: ["Community", "Career", "Our Story"],
  },
  {
    navigationHeader: "Contact",
    navigationItems: ["Getting Started", "Pricing", "Resources"],
  },
];

const Footer = () => {
  return (
    <footer>
      <div className="footer-text-part">
        <h6>GREENMIND</h6>
        <p>
          We help you find <br /> your dream plant
        </p>

        <div className="social-icons-list">
          <SocialIcon Icon={TiSocialFacebook} size={25} />
          <SocialIcon Icon={SlSocialInstagram} size={20} />
          <SocialIcon Icon={FaTwitter} size={20} />
        </div>

        <p>2025 all Right Reserved Terms of use GREENMIND</p>
      </div>

      <div className="footer-navigation-list">
        {footerNavigationItems.map((item) => (
          <div className="footer-col" key={item.navigationHeader}>
            <p>{item.navigationHeader}</p>

            {item.navigationItems.map((navigationItem, index) => (
              <p key={index}>{navigationItem}</p>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
