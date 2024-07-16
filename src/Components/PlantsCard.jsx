import { useState } from "react";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const token = sessionStorage.getItem("token");
const decoded = token ? jwtDecode(token) : 'token doesnt exists'

const PlantsCard = ({ imgURL, PlantsName, Price }) => {

  const [buyState, setBuyState] = useState(false);

  const handleAddToCart = ({PlantsName, Price}) => {

    axios.post('http://localhost:5000/addToCart', {
      plantsname: PlantsName,
      price: Price,
      userId: decoded.userId,
    })

    .then((response) => {
      console.log(response.data)
    })
    .catch((err) => {
      console.log('something went wrong while adding item on cart', err)
    })
  }

  return (
    <div
      onMouseLeave={() => setBuyState(false)}
      onMouseEnter={() => (buyState ? setBuyState(false) : setBuyState(true))}
      className="plants-card"
    >
      <img className="plant-img" src={imgURL} alt="naturalPlant" />
      <p>{PlantsName}</p>
      <p style={{ color: "1E1E1E", opacity: "50%" }}>₾ {Price}</p>

      {token && (
        <div className="cart-icon">
          <PiShoppingCartSimpleLight onClick={() => handleAddToCart({PlantsName: PlantsName, Price: Price})} size={15} />
        </div>
      )}

      {buyState && (
        <motion.div
          initial={{ scale: 0, borderRadius: "50%" }}
          animate={{ scale: 1, borderRadius: "0%" }}
          transition={{duration: 0.1}}
          className="buy-container"
        >
          <button>Buy</button>
        </motion.div>
      )}
    </div>
  );
};

export default PlantsCard;
