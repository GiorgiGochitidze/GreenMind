import { TbArrowBigRight } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";

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
}) => {
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
        <div className="betweenLine" style={{
          background: `${
            borderColor !== "rgb(117, 117, 250)" ? "rgb(117, 117, 250)" : "lightgray"
          }`
        }}></div>
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
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              placeholder="example@example.com"
              type="text"
              name="email"
              id="email"
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
            onMouseEnter={() =>
              arrowColor === "black"
                ? setArrowColor("white")
                : setArrowColor("black")
            }
            onMouseLeave={() =>
              arrowColor === "black"
                ? setArrowColor("white")
                : setArrowColor("black")
            }
            onClick={() => {
              setBorderColor(null);
              setPage1(!page1);
              setPage2(!page2)
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
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentFirstStatus;
