import { useState } from "react";
import axios from "axios";
import "./CSS/addnewplant.css";
import { useNavigate } from "react-router-dom";

const AddNewPlants = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [plantName, setPlantName] = useState("");
  const [plantPrice, setPlantPrice] = useState("");
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

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

  const handleFormSubmit = async (e) => {

  if(!plantName || !plantPrice || !selectedFile){
    setMessage('Please fill all inputs')
    setTimeout(() => {
      setMessage('')
    }, 1500)
    return
  }    

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("plantName", plantName);
      formData.append("plantPrice", plantPrice);

      // Send POST request to backend (Cloudinary endpoint)
      await axios
        .post("http://localhost:5000/addNewPlant", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Plant added successfully:", response.data);

          setMessage('Succesfully added new Plant')
          setTimeout(() => {
            navigate('/Products')
            window.location.reload()
          }, 1100)
        })
        .catch((err) => {
            console.log('smth wrong with .thens"s, catch err', err)
        })
      // Optionally, reset form fields or show success message
    } catch (error) {
      console.error("Error adding plant:", error);
      // Handle error state
    }
  };

  return (
    <div className="addPlant-container">
      <div className="plants-card">
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
          placeholder="Plant Name"
          className="plant-name-input"
          value={plantName}
          onChange={(e) => setPlantName(e.target.value)}
        />
        <div className="price-container">
          <span style={{ color: "rgba(30, 30, 30, 50%)" }}>₾-</span>
          <input
            type="number"
            placeholder="Price"
            className="plant-price-input"
            value={plantPrice}
            onChange={(e) => setPlantPrice(e.target.value)}
          />
        </div>
        {message && <p style={{margin: '0 auto'}}>{message}</p>}
        <button onClick={handleFormSubmit} className="upload-btn">
          Upload
        </button>
      </div>
    </div>
  );
};

export default AddNewPlants;
