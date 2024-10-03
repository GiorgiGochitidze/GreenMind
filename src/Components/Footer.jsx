import { TiSocialFacebook } from "react-icons/ti";
import "./CSS/footer.css";
import { RiInstagramFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const LinkStyles = {
    color: "rgba(30, 30, 30, 75%)",
    textDecoration: "none",
  };

  return (
    <footer>
      <div className="socialLinks-container">
        <h1 style={{ fontFamily: "Advent-pro", color: "black" }}>MelinaMShop</h1>
        <p>
          we help you find <br /> your dream plant
        </p>
        <div className="social-links">
          <div
            onClick={() => {
              setTimeout(() => {
                window.location.reload();
              }, 0.5);
            }}
            className="iconses"
          >
            <TiSocialFacebook size={25} />
          </div>
          <div
            onClick={() => {
              setTimeout(() => {
                window.location.reload();
              }, 0.5);
            }}
            className="iconses"
          >
            <RiInstagramFill size={20} />
          </div>
          <div
            onClick={() => {
              setTimeout(() => {
                window.location.reload();
              }, 0.5);
            }}
            className="iconses"
          >
            <FaTwitter size={20} />
          </div>
        </div>

        <p className="rights-txt">
          2024 all Right Reserved Term of use MelinaMShop
        </p>
      </div>

      <div className="navigation-items-container">
        <div className="information downlist">
          <p style={{ color: "black" }}>Information</p>
          <Link
            onClick={() => {
              setTimeout(() => {
                window.location.reload();
              }, 0.5);
            }}
            to="/TechWorks"
            style={LinkStyles}
          >
            <p>About</p>
          </Link>
          <Link
            onClick={() => {
              setTimeout(() => {
                window.location.reload();
              }, 0.5);
            }}
            to="/TechWorks"
            style={LinkStyles}
          >
            <p>Product</p>
          </Link>
          <Link
            onClick={() => {
              setTimeout(() => {
                window.location.reload();
              }, 0.5);
            }}
            to="/TechWorks"
            style={LinkStyles}
          >
            <p>Blog</p>
          </Link>
        </div>
        <div className="company downlist">
          <Link
            onClick={() => {
              setTimeout(() => {
                window.location.reload();
              }, 0.5);
            }}
            to="/TechWorks"
            style={LinkStyles}
          >
            <p style={{ color: "black" }}>Company</p>
          </Link>
          <Link
            onClick={() => {
              setTimeout(() => {
                window.location.reload();
              }, 0.5);
            }}
            to="/TechWorks"
            style={LinkStyles}
          >
            <p>Community</p>
          </Link>
          <Link
            onClick={() => {
              setTimeout(() => {
                window.location.reload();
              }, 0.5);
            }}
            to="/TechWorks"
            style={LinkStyles}
          >
            <p>Career</p>
          </Link>
          <Link
            onClick={() => {
              setTimeout(() => {
                window.location.reload();
              }, 0.5);
            }}
            to="/TechWorks"
            style={LinkStyles}
          >
            <p>Our Story</p>
          </Link>
        </div>
        <div className="contact downlist">
          <Link
            onClick={() => {
              setTimeout(() => {
                window.location.reload();
              }, 0.5);
            }}
            to="/TechWorks"
            style={LinkStyles}
          >
            <p style={{ color: "black" }}>Contact</p>
          </Link>
          <Link
            onClick={() => {
              setTimeout(() => {
                window.location.reload();
              }, 0.5);
            }}
            to="/TechWorks"
            style={LinkStyles}
          >
            <p>Getting Started</p>
          </Link>
          <Link
            onClick={() => {
              setTimeout(() => {
                window.location.reload();
              }, 0.5);
            }}
            to="/TechWorks"
            style={LinkStyles}
          >
            <p>Pricing</p>
          </Link>
          <Link
            onClick={() => {
              setTimeout(() => {
                window.location.reload();
              }, 0.5);
            }}
            to="/TechWorks"
            style={LinkStyles}
          >
            <p>Resources</p>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
