import { useState } from "react";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useCardData } from "./useCardData";

const token = sessionStorage.getItem("token");
const decoded = token ? jwtDecode(token) : "token doesnt exists";

const PlantsCard = ({
  imgURL,
  PlantsName,
  Price,
  cardId,
  purchasheState,
  setPurchasheState,
}) => {
  const [buyState, setBuyState] = useState(false);
  const {handleGetCardData} = useCardData()

  const handleAddToCart = ({ imgURL, PlantsName, Price }) => {
    axios
      .post("https://greenmind-2844.onrender.com/addToCart", {
        imgUrl: imgURL,
        plantsname: PlantsName,
        price: Price,
        userId: decoded.userId,
        cardId: cardId,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log("something went wrong while adding item on cart", err);
      });
  };

  const handleDeleteProduct = ({ cardId }) => {
    axios
      .post("https://greenmind-2844.onrender.com/deleteProduct", {
        cardId: cardId,
      })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log("something went wrong while deleting product", err);
      });
  };

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
          <PiShoppingCartSimpleLight
            onClick={() => handleAddToCart({ imgURL, PlantsName, Price })}
            size={15}
          />
        </div>
      )}

      {token && decoded.role === "Admin" && (
        <div className="del-icon">
          <p
            onClick={() =>
              handleDeleteProduct({ imgURL, PlantsName, Price, cardId })
            }
          >
            X
          </p>
        </div>
      )}

      {buyState && (
        <motion.div
          initial={{ scale: 0, borderRadius: "50%" }}
          animate={{ scale: 1, borderRadius: "0%" }}
          transition={{ duration: 0.1 }}
          className="buy-container"
        >
          <button
            onClick={() => {
              setPurchasheState(!purchasheState);
              handleGetCardData({ imgURL, Price, PlantsName, cardId });
            }}
          >
            Buy
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default PlantsCard;
