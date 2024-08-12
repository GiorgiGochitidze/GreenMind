import "./CSS/paymentform.css";
import { motion } from "framer-motion";
import { useCardData } from "./useCardData";
import { useState } from "react";
import CountrysList from "./CountrysList";
import PaymentFirstStatus from "./PaymentFirstStatus";
import mastercard from "../assets/mastercard.png";
import paypal from "../assets/paypal.png";
import { FaCcDiscover, FaCcVisa } from "react-icons/fa";
import { TbArrowBigLeft } from "react-icons/tb";

const PaymentForm = ({purchasheState, paymentFormRef, setPurchasheState}) => {
  const { cardData } = useCardData();
  const [arrowColor, setArrowColor] = useState("black");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [borderColor, setBorderColor] = useState("rgb(117, 117, 250)");
  const [page1, setPage1] = useState(true);
  const [page2, setPage2] = useState(false);
  const [validThru, setValidThru] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleZipCodeChange = (e) => {
    let value = e.target.value;

    // Remove any non-digit characters
    value = value.replace(/\D/g, "");

    // Insert a hyphen after the third character if the length is more than 3
    if (value.length > 5) {
      value = value.slice(0, 5) + "-" + value.slice(5);
    }

    setZipCode(value);
  };

  const handlevalidThruChange = (e) => {
    let value = e.target.value;

    // Remove any non-digit characters
    value = value.replace(/\D/g, "");

    // Insert a hyphen after the third character if the length is more than 3
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    setValidThru(value);
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value;

    // Remove any non-digit characters
    value = value.replace(/\D/g, "");

    // Add a space after every 4 digits
    value = value.replace(/(.{4})/g, "$1 ");

    // Remove any trailing space if it exists
    value = value.trim();

    setCardNumber(value);
  };

  return (
    <div className="paymentform-container">
      <motion.div
        initial={{ opacity: 0, y: 500 }}
        animate={{ opacity: 1, y: 0 }}
        className="paymentform-card"
        ref={paymentFormRef}
      >
        <PaymentFirstStatus
          cardData={cardData}
          arrowColor={arrowColor}
          borderColor={borderColor}
          page1={page1}
          selectedCountry={selectedCountry}
          zipCode={zipCode}
          setArrowColor={setArrowColor}
          setBorderColor={setBorderColor}
          setPage1={setPage1}
          handleCountryChange={handleCountryChange}
          handleZipCodeChange={handleZipCodeChange}
          CountrysList={CountrysList}
          page2={page2}
          setPage2={setPage2}
        />

        {page2 && (
          <div className="payment-page-container">
            {page2 && (
              <button
                onClick={() => {
                  setPage2(!page2);
                  setPage1(!page1);
                  setBorderColor("rgb(117, 117, 250)")
                }}
                className="goBack-btn"
              >
                {" "}
                <TbArrowBigLeft /> Back
              </button>
            )}
            <h2>Payment</h2>

            <div className="payments-page-card">
              <div
                style={{ flexDirection: "column" }}
                className="accepted-cards"
              >
                <h2>Cards Accepted:</h2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <img src={mastercard} alt="mastercard icon" />
                  <img src={paypal} alt="paypal icon" />
                  <FaCcVisa size={35} color="darkblue" />
                  <FaCcDiscover size={35} color="orange" />
                </div>
              </div>

              <div className="payment-inputs-container">
                <div>
                  <label htmlFor="nameoncard">
                    Name On Card:
                    <input
                      placeholder="Jacob Aiden"
                      type="text"
                      name="nameoncard"
                      id="nameoncard"
                    />
                  </label>
                  <label htmlFor="creditcardnum">
                    Credit Card Number:
                    <input
                      placeholder="1111 2222 3333 4444"
                      type="text"
                      name="creditcardnum"
                      id="creditcardnum"
                      maxLength={19}
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="validthru">
                    Valid Thru:
                    <input
                      maxLength={5}
                      value={validThru}
                      onChange={handlevalidThruChange}
                      type="text"
                      name="validthru"
                      id="validthru"
                      placeholder="example: 11/11"
                    />
                  </label>
                  <label htmlFor="cvc">
                    CVC:
                    <input
                      placeholder="example: 123"
                      type="text"
                      name="cvc"
                      id="cvc"
                    />
                  </label>
                </div>

                <div className="buttons-container">
                  <button className="purchashe-btn submit">
                    Sumbit Purchashe
                  </button>
                  <button onClick={() => setPurchasheState(!purchasheState)} className="purchashe-btn cancel">
                    Cancel Purchashe
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentForm;
