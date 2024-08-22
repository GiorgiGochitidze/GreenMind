import { useState } from "react";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode"; // fixed import
import axios from "axios";
import { useCardData } from "./useCardData";
import { GoPencil } from "react-icons/go";

const token = sessionStorage.getItem("token");
const decoded = token ? jwtDecode(token) : "token doesn't exist";

const PlantsCard = ({
  imgURL,
  PlantsName,
  Price,
  cardId,
  purchasheState,
  purchashes,
  setPurchasheState,
}) => {
  const [buyState, setBuyState] = useState(false);
  const { handleGetCardData } = useCardData();
  const [editState, setEditState] = useState(false);
  const [newPlantPrice, setNewPlantPrice] = useState("");
  const [newPlantName, setNewPlantName] = useState("");
  const [editMsg, setEditMsg] = useState("");

  const handleAddToCart = ({ imgURL, PlantsName, Price, purchashes }) => {
    axios
      .post("https://greenmind-2844.onrender.com/addToCart", {
        imgUrl: imgURL,
        plantsname: PlantsName,
        price: Price,
        userId: decoded.userId,
        cardId: cardId,
        purchashes: purchashes,
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

    axios
      .post("https://greenmind-2844.onrender.com/removeFromCart", {
        userId: decoded.userId,
        cardId: cardId,
      })
      .then((response) => {
        setCartList(response.data);
      })
      .catch((err) => {
        console.log("Error while removing item from cart", err);
      });
  };

  const handleEditCard = ({ cardId }) => {
    setEditMsg("Card Updated");

    setTimeout(() => {
      setEditMsg(false);
      setEditState(false);
      window.location.reload();
    }, 1000);

    axios.post('https://greenmind-2844.onrender.com/editPlantCard', {
      newPlantPrice,
      newPlantName,
      cardId
    })
    .then((response) => {
      console.log(response.data)
    })
    .catch((err) => {
      console.log('Error while editing card', err)
    })
  };

  return (
    <div
      onMouseLeave={() => !editState && setBuyState(false)}
      onMouseEnter={() => !editState && setBuyState(true)}
      className="plants-card"
    >
      <img className="plant-img" src={imgURL} alt="naturalPlant" />
      {!editState && <p>{PlantsName}</p>}
      {editState && (
        <input
          className="edit-inputs"
          type="text"
          placeholder="New Plant Name"
          value={newPlantName}
          onChange={(e) => setNewPlantName(e.target.value)}
        />
      )}
      {!editState && (
        <p style={{ color: "1E1E1E", opacity: "50%" }}>₾ {Price}</p>
      )}
      {editState && (
        <input
          value={newPlantPrice}
          onChange={(e) => setNewPlantPrice(e.target.value)}
          className="edit-inputs"
          type="number"
          placeholder="New Plant Price"
        />
      )}
      {editState && editMsg && <p style={{ marginLeft: "18px" }}>{editMsg}</p>}
      {editState && (
        <button onClick={() => handleEditCard({ cardId })} className="edit-btn">
          Save Changes
        </button>
      )}

      {token && (
        <div
          className="cart-icon"
          style={{ right: decoded.role === "Admin" ? "55px" : "15px" }}
        >
          <PiShoppingCartSimpleLight
            onClick={() => handleAddToCart({ imgURL, PlantsName, Price })}
            size={15}
          />
        </div>
      )}

      {token && (
        <div
          className="cart-icon"
          style={{ right: decoded.role === "Admin" ? "95px" : "15px" }}
        >
          <GoPencil
            onClick={() => {
              setBuyState(false); // Disable buyState
              setEditState(true);
            }}
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

      {buyState && !editState && (
        <motion.div
          initial={{ scale: 0, borderRadius: "50%" }}
          animate={{ scale: 1, borderRadius: "0%" }}
          transition={{ duration: 0.1 }}
          className="buy-container"
        >
          <button
            onClick={() => {
              setPurchasheState(!purchasheState);
              handleGetCardData({
                imgURL,
                Price,
                PlantsName,
                cardId,
                purchashes,
              });
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
