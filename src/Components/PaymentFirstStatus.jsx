import { TbArrowBigRight } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { IoCheckmarkDone } from "react-icons/io5";
import { motion } from "framer-motion";
import { useState } from "react";

const PaymentFirstStatus = ({
  cardData,
  arrowColor,
  selectedCountry,
  zipCode,
  borderColor,
  page1,
  setArrowColor,
  setBorderColor,
  setPage1,
  handleCountryChange,
  handleZipCodeChange,
  CountrysList,
  setPage2,
  page2,
  fullName,
  email,
  city,
  address,
  setFullName,
  setEmail,
  setAddress,
  setCity,
  payPosTrack,
  setPurchasheState,
}) => {

  const [amount, setAmount] = useState(0)
  
  return (
    <>
      <div
        style={{
          display: borderColor !== "rgb(117, 117, 250)" ? "none" : "flex",
        }}
        className="scrollers-container"
      >
        <div className="hinter-container">
          <p>View Product</p>
          <p style={{ marginTop: "-5px" }}>
            <IoIosArrowDown />
          </p>
        </div>
      </div>
      {payPosTrack && (
        <div className="pages-postion-container">
          <div
            style={{
              background: "#C1DCDC",
              border: `5px solid rgb(117, 117, 250)`,
            }}
            className="page"
          >
            1
          </div>
          <div
            className="betweenLine"
            style={{
              background: `${
                borderColor !== "rgb(117, 117, 250)"
                  ? "rgb(117, 117, 250)"
                  : "lightgray"
              }`,
            }}
          ></div>
          <div
            style={{
              background: `${
                borderColor === "rgb(117, 117, 250)" ? "white" : "#C1DCDC"
              }`,
              border: `5px solid ${
                borderColor !== "rgb(117, 117, 250)"
                  ? "rgb(117, 117, 250)"
                  : "lightgray"
              }`,
            }}
            className="page"
          >
            2
          </div>
        </div>
      )}
      {page1 && (
        <div className="billing-address">
          <h2>BILLING ADDRESS</h2>
          <label htmlFor="fullname">
            Full Name:
            <input
              placeholder="Jacob Aiden"
              type="text"
              name="fullname"
              id="fullname"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              placeholder="example@example.com"
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="address">
            Address:
            <input
              placeholder="Room-Street-Locality"
              type="text"
              name="address"
              id="address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <label htmlFor="city">
            City:
            <input
              required
              placeholder="Batumi"
              type="text"
              name="city"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label htmlFor="country" className="countryandzipcode">
            <div>
              Country:
              <select
                id="country"
                value={selectedCountry}
                onChange={handleCountryChange}
                required
              >
                <option value="" disabled>
                  Select a country
                </option>
                {CountrysList.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div>
              Zip Code:
              <input
                value={zipCode}
                maxLength={10}
                onChange={handleZipCodeChange}
                placeholder="123-456"
                type="text"
                name="zipcode"
                id="zipcode"
                required
              />
            </div>
          </label>
          <button
            onMouseEnter={() => setArrowColor("white")}
            onMouseLeave={() => setArrowColor("black")}
            onClick={() => {
              setBorderColor(null);
              setPage1(!page1);
              setPage2(!page2);
            }}
            className="nextpage-btn"
          >
            Next <TbArrowBigRight color={arrowColor} />
          </button>
        </div>
      )}
      {page1 && (
        <div>
          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
            Your Product:
          </h2>
          <div className="plants-card payment-card">
            <img
              className="plant-img"
              src={cardData.imgURL}
              alt="naturalPlant"
            />
            <p>{cardData.PlantsName}</p>
            <p style={{ color: "1E1E1E", opacity: "50%" }}>
              ₾ {cardData.Price}
            </p>
            <div className="product-amount-container">
              <button onClick={() => {setAmount(amount => amount - 1)
                if(amount < 1){
                  setAmount(0)
                }
              }}><span>-</span></button>
              <p>{amount}</p>
              <button onClick={() => setAmount(amount => amount + 1)}><span>+</span></button>
            </div>
          </div>
        </div>
      )}

      {!payPosTrack && (
        <div className="succesPayment-container">
          <motion.div
            initial={{ opacity: 0, y: -500 }}
            animate={{ opacity: 1, y: 0 }}
            className="checkmark-circle"
          >
            <IoCheckmarkDone size={60} color="lime" />
          </motion.div>
          <motion.h2
            transition={{ delay: 0.2 }}
            initial={{ opacity: 0, y: -500 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Payment Successful
          </motion.h2>

          <motion.button
            transition={{ delay: 0.3 }}
            initial={{ opacity: 0, y: -500 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setPurchasheState(false)}
            className="close-btn"
          >
            close
          </motion.button>
        </div>
      )}
    </>
  );
};

export default PaymentFirstStatus;
