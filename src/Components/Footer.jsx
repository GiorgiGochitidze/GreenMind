import { TiSocialFacebook } from "react-icons/ti";
import "./CSS/footer.css";
import { RiInstagramFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="socialLinks-container">
        <h1 style={{fontFamily: 'Advent-pro', color: 'black'}}>GREENMIND</h1>
        <p>
          we help you find <br /> your dream plant
        </p>
        <div className="social-links">
          <div className="iconses">
          <TiSocialFacebook size={25} />
          </div>
          <div className="iconses">
          <RiInstagramFill size={20} />
          </div>
          <div className="iconses">
          <FaTwitter size={20} />
          </div>
        </div>

        <p className="rights-txt">2024 all Right Reserved Term of use GREENMIND</p>
      </div>

      <div className="navigation-items-container">
        <div className="information downlist">
          <p style={{color: 'black'}}>Information</p>
          <p>About</p>
          <p>Product</p>
          <p>Blog</p>
        </div>
        <div className="company downlist">
          <p style={{color: 'black'}}>Company</p>
          <p>Community</p>
          <p>Career</p>
          <p>Our Story</p>
        </div>
        <div className="contact downlist">
          <p style={{color: 'black'}}>Contact</p>
          <p>Getting Started</p>
          <p>Pricing</p>
          <p>Resources</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
