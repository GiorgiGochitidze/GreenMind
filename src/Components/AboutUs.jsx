import { RiPlantLine } from "react-icons/ri";
import "./CSS/aboutus.css";
import CriteriumsCard from "./CriteriumsCard";
import { BsBoxSeam } from "react-icons/bs";
import { FiPhoneOutgoing } from "react-icons/fi";

const AboutUs = () => {
  return (
    <div className="aboutUs-container">
      <h1 style={{ textAlign: "center" }}>About Us</h1>
      <p style={{ textAlign: "center", color: "rgba(30, 30, 30, 50%)" }}>
        Order now and appreciate the beauty of nature
      </p>

      <div className="criteriums-container">
        <CriteriumsCard
          IconName={RiPlantLine}
          txtTitle={"Large Assortment"}
          cardTxt={
            "we offer many different types of products with fewer variations in each category."
          }
        />
        <CriteriumsCard
          IconName={BsBoxSeam}
          txtTitle={"Fast Shipping"}
          cardTxt={
            "1 to 3-day delivery time in adjara and around 5 days delivery time outside of adjara, free delivery in batumi, outside of batumi price of delivery depends on location"
          }
        />
        <CriteriumsCard
          IconName={FiPhoneOutgoing}
          txtTitle={"24/7 Support"}
          cardTxt={
            "answers to any business related inquiry 24/7 and in real-time."
          }
        />
      </div>
    </div>
  );
};

export default AboutUs;
