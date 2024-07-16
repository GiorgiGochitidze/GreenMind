import { jwtDecode } from "jwt-decode";
import "./CSS/cart.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { PiShoppingCartSimpleLight } from "react-icons/pi";

const Cart = () => {
  const token = sessionStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;

  const [cartList, setCartList] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
          console.log("something went wrong while loading cart data", err);
        });
    }
  }, []);

  const handleRemoveCart = ({plantsname, price, cardId}) => {
    axios
      .post("http://localhost:5000/removeFromCart", {
        userId: decoded.userId,
        plantsname: plantsname,
        price: price,
        cardId: cardId
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
              <div style={{right: "15px"}} className="cart-icon">
                <PiShoppingCartSimpleLight
                  onClick={() => {
                    handleRemoveCart({plantsname: item.plantsname, price: item.price, cardId: item._id})
                    window.location.reload()
                }}
                  size={15}
                />
                <div className="line-close"></div>
              </div>
            )}
            <img className="plant-img" src={item.imgUrl} alt="naturalPlant" />
            <p>{item.plantsname}</p>
            <p style={{ color: "1E1E1E", opacity: "50%" }}>₾ {item.price}</p>

            {hoveredIndex === index && (
              <motion.div
                initial={{ scale: 0, borderRadius: "50%" }}
                animate={{ scale: 1, borderRadius: "0%" }}
                transition={{ duration: 0.1 }}
                className="buy-container"
              >
                <button>Buy</button>
              </motion.div>
            )}
          </div>
        ))
      ) : (
        <p style={{fontFamily: "Poppins"}}>No items in cart</p>
      )}
    </div>
  );
};

export default Cart;
