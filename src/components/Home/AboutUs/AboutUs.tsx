import AboutCard from "./AboutCard";
import "./CSS/AboutUs.css";
import SmallPlantIcon from "../../../assets/AboutUs/SmallPlantIcon.png";
import BoxIcon from "../../../assets/AboutUs/BoxIcon.png";
import PhoneIcon from "../../../assets/AboutUs/PhoneIcon.png";

const AboutUs = () => {
  return (
    <div className="aboutUs-container">
      <h3>About Us</h3>
      <p>Order now and appreciate the beauty of nature</p>

      <div className="aboutUs-items-list">
        <AboutCard
          cardIcon={SmallPlantIcon}
          cardHeader={"Large Assortment"}
          cardDescription={
            "we offer many different types of products with fewer variations in each category."
          }
        />
        <AboutCard
          cardIcon={BoxIcon}
          cardHeader={"Fast & Free Shipping"}
          cardDescription={
            "4-day or less delivery time, free shipping and an expedited delivery option."
          }
        />
        <AboutCard
          cardIcon={PhoneIcon}
          cardHeader={"24/7 Support"}
          cardDescription={
            "answers to any business related inquiry 24/7 and in real-time."
          }
        />
      </div>
    </div>
  );
};

export default AboutUs;
