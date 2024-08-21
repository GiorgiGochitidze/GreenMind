import { jwtDecode } from "jwt-decode";
import "./CSS/cart.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import PaymentForm from "./PaymentForm";
import { useCardData } from "./useCardData";

const Cart = ({ purchasheState, setPurchasheState }) => {
  const token = sessionStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const paymentFormRef = useRef(null);

  const [cartList, setCartList] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { handleGetCardData, cardData } = useCardData();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        paymentFormRef.current &&
        !paymentFormRef.current.contains(event.target)
      ) {
        setPurchasheState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setPurchasheState]);

  useEffect(() => {
    if (token && decoded && decoded.userId) {
      axios
        .post("http://localhost:5000/loadCart", {
          userId: decoded.userId,
        })
        .then((response) => {
          setCartList(response.data);
        })
        .catch((err) => {
          console.log("Something went wrong while loading cart data", err);
        });
    }
  }, []);

  const handleRemoveCart = (cardId) => {
    axios
      .post("http://localhost:5000/removeFromCart", {
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

  return (
    <div className="cart-container">
      {cartList.length > 0 ? (
        cartList.map((item, index) => (
          <div
            key={index}
            className="plants-card"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {token && (
              <div style={{ right: "15px" }} className="cart-icon">
                <PiShoppingCartSimpleLight
                  onClick={() => handleRemoveCart(item._id)}
                  size={15}
                />
                <div className="line-close"></div>
              </div>
            )}
            <img className="plant-img" src={item.imgUrl} alt="naturalPlant" />
            <p>{item.plantsname}</p>
            <p style={{ color: "#1E1E1E", opacity: "50%" }}>₾ {item.price}</p>

            {hoveredIndex === index && (
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
                      imgURL: item.imgUrl, // Use imgURL here
                      Price: item.price,
                      PlantsName: item.plantsname,
                      cardId: item._id,
                      purchashes: item.purchashes,
                    });
                  }}
                >
                  Buy
                </button>
              </motion.div>
            )}
          </div>
        ))
      ) : (
        <p style={{ fontFamily: "Poppins" }}>No items in cart</p>
      )}
      {purchasheState && (
        <PaymentForm
          paymentFormRef={paymentFormRef}
          purchasheState={purchasheState}
          setPurchasheState={setPurchasheState}
          cardData={cardData}
        />
      )}
    </div>
  );
};

export default Cart;
