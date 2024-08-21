import { useState, useRef, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosStar } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { motion } from "framer-motion";
import axios from "axios";

const token = sessionStorage.getItem("token");

const CommentsCard = ({ body, userName, userProfession, rating, cardId }) => {
  const [editState, setEditState] = useState(false);
  const [editTxt, setEditTxt] = useState(body);
  const [message, setMessage] = useState("");
  const [animationState, setAnimationState] = useState("appear");

  const editContainerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (editContainerRef.current && !editContainerRef.current.contains(event.target)) {
      setEditState(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditComment = () => {
    if (editTxt.trim() === "") {
      setMessage("Please fill the text field to save changes");
      setAnimationState("appear");
      return;
    } else {
      setMessage("Comment edit saved Successfully");
      setAnimationState("appear");
    }

    axios
      .post("https://greenmind-2844.onrender.comeditComment", { editTxt, cardId })
      .then((response) => {
        setMessage("Edits saved successfully");
        console.log(response.data);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        setMessage("Error occurred while trying to save comment text changes");
        console.log(err);
      });
  };

  const handleSaveClick = () => {
    handleEditComment();
    setTimeout(() => {
      setAnimationState("disappear");
    }, 2000);
  };

  const handleCommentDelete = () => {
    axios.post('https://greenmind-2844.onrender.comdeleteComment', { cardId })
      .then((response) => {
        console.log(response.data);
        console.log('card deleted');
        window.location.reload();
      })
      .catch((err) => {
        console.log('Error deleting comment', err);
      });
  };

  return (
    <div className="comments-card">
      {message && (
        <motion.div
          initial={{ scale: 0, borderRadius: "50%" }}
          animate={
            animationState === "appear"
              ? { scale: 1, borderRadius: "0%" }
              : { scale: 0, borderRadius: "50%" }
          }
          transition={{ duration: 0.2 }}
          onAnimationComplete={() => {
            if (animationState === "disappear") {
              setMessage("");
              setAnimationState("appear");
            }
          }}
          className="hint-container"
        >
          <p>{message}</p>
        </motion.div>
      )}
      {token && (
        <div className="edits-container" ref={editContainerRef}>
          <MdEdit
            onClick={() => setEditState(!editState)}
            className="edit-icons"
            color="black"
            size={20}
          />
          <AiOutlineDelete
            className="edit-icons"
            style={{ marginRight: "30px" }}
            color="black"
            size={20}
            onClick={handleCommentDelete}
          />
        </div>
      )}

      {!editState && (
        <p style={{ color: "rgba(30, 30, 30, 75%)", marginTop: "50px" }}>
          {body}
        </p>
      )}
      {editState && (
        <>
          <textarea
            value={editTxt}
            onChange={(e) => setEditTxt(e.target.value)}
            placeholder="Write a new text for your comment"
            className="txt-edit-textarea"
          ></textarea>

          <button className="save-btn" onClick={handleSaveClick}>
            Save
          </button>
        </>
      )}

      <div className="user-info-container">
        <p>
          {userName} <br />
          <span style={{ fontSize: "10px", color: "rgba(30, 30, 30, 50%)" }}>
            {userProfession}
          </span>
        </p>
        <div className="rate-container">
          <IoIosStar style={{ marginBottom: "2px" }} />
          {rating}
        </div>
      </div>
    </div>
  );
};

export default CommentsCard;
