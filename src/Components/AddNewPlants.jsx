import { useState } from "react";
import axios from "axios";
import "./CSS/addnewplant.css";
import { useNavigate } from "react-router-dom";

const AddNewPlants = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [plantName, setPlantName] = useState("");
  const [plantPrice1, setPlantPrice1] = useState("");
  const [plantPrice2, setPlantPrice2] = useState("");
  const [message, setMessage] = useState("");
  const [buttonColor1, setButtonColor1] = useState(true);
  const [buttonColor2, setButtonColor2] = useState(false);
  const [buttonValues, setButtonValues] = useState([
    "1-500-მდე",
    "500-დან ზევით",
  ]);
  const [currentBtnVal, setCurrentBtnVal] = useState("1-500-მდე");
  const [itemCode, setItemCode] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Display preview of the image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewURL(null);
    }
  };

  const handleFormSubmit = async () => {
    if (!plantName || !plantPrice1 || !selectedFile) {
      setMessage("Please fill all inputs");
      setTimeout(() => {
        setMessage("");
      }, 1500);
      return;
    }

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("plantName", plantName);
      formData.append("plantPrice1", plantPrice1);
      formData.append("plantPrice2", plantPrice2);
      formData.append("amount", currentBtnVal);
      formData.append("codenum", itemCode);

      // Send POST request to backend (Cloudinary endpoint)
      await axios
        .post("https://greenmind-2844.onrender.com/addNewPlant", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Plant added successfully:", response.data);

          setMessage("Succesfully added new Plant");
          setTimeout(() => {
            navigate("/Products");
            window.location.reload();
          }, 1100);
        })
        .catch((err) => {
          console.log('smth wrong with .thens"s, catch err', err);
        });
      // Optionally, reset form fields or show success message
    } catch (error) {
      console.error("Error adding plant:", error);
      // Handle error state
    }
  };

  return (
    <div className="addPlant-container">
      <div style={{ alignItems: "center" }} className="plants-card">
        <div className="image-upload">
          <label
            style={{ border: previewURL ? "none" : "1px dashed black" }}
            htmlFor="file-upload"
            className="custom-file-upload"
          >
            {previewURL ? (
              <img src={previewURL} alt="Preview" className="preview-image" />
            ) : (
              "Drag & drop or click to browse image"
            )}
            <input id="file-upload" type="file" onChange={handleFileChange} />
          </label>
        </div>
        <input
          type="text"
          placeholder="Item Name"
          className="plant-name-input"
          value={plantName}
          onChange={(e) => setPlantName(e.target.value)}
        />
        <div className="price-container">
          <span style={{ color: "rgba(30, 30, 30, 50%)" }}>KODI</span>
          <input
            type="text"
            placeholder="Item Code"
            className="plant-name-input"
            value={itemCode}
            onChange={(e) => setItemCode(e.target.value)}
          />
        </div>

        <div className="itemsAmount-container">
          <button
            onClick={() => {
              setButtonColor1(true); // Set this button as active
              setButtonColor2(false); // Set the other button as inactive
              setCurrentBtnVal(buttonValues[0]);
            }}
            style={{
              backgroundColor: buttonColor1 ? "#303f9f" : "transparent",
              border: buttonColor1 ? "1px solid #303f9f" : "1px solid #303f9f",
              color: buttonColor1 ? "white" : "black",
            }}
          >
            {buttonValues[0]}
          </button>
          <button
            onClick={() => {
              setButtonColor2(true); // Set this button as active
              setButtonColor1(false); // Set the other button as inactive
              setCurrentBtnVal(buttonValues[1]);
            }}
            style={{
              backgroundColor: buttonColor2 ? "#303f9f" : "transparent",
              border: buttonColor2 ? "1px solid #303f9f" : "1px solid #303f9f",
              color: buttonColor2 ? "white" : "black",
            }}
          >
            {buttonValues[1]}
          </button>
        </div>

        <div className="price-container">
          <span style={{ color: "rgba(30, 30, 30, 50%)" }}>₾-</span>
          {buttonColor1 && (
            <input
              type="number"
              placeholder="1-500-მდე"
              className="plant-price-input"
              value={plantPrice1}
              onChange={(e) => setPlantPrice1(e.target.value)}
            />
          )}
          {buttonColor2 && (
            <input
              type="number"
              placeholder="ფასი 500-დან ზევით"
              className="plant-price-input"
              value={plantPrice2}
              onChange={(e) => setPlantPrice2(e.target.value)}
            />
          )}
        </div>
        {message && <p style={{ margin: "0 auto" }}>{message}</p>}
        <button onClick={handleFormSubmit} className="upload-btn">
          Upload
        </button>
      </div>
    </div>
  );
};

export default AddNewPlants;
