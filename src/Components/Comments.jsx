import React, { useEffect, useState } from "react";
import "./CSS/comments.css";
import CommentsCard from "./CommentsCard";
import { ImStarEmpty, ImStarFull } from "react-icons/im";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const token = sessionStorage.getItem("token");
const decoded = token ? jwtDecode(token) : "token doesnt exists";

const Comments = () => {
  const [hoverState, setHoverState] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [userName, setUserName] = useState(decoded.userName || "");
  const [profession, setProfession] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState(
    "The empty fields will be set as Anonymous"
  );
  const [commentBody, setCommentBody] = useState("");
  const [commentsArray, setCommentsArray] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/loadComments/")
      .then((response) => {
        console.log(response.data);
        setCommentsArray(response.data);
      })
      .catch((err) => {
        console.log(
          "Error accoursed while trying to get access to comments data"
        );
      });
  }, []);

  const handleMouseEnter = (index) => {
    const newHoverState = hoverState.map((_, i) => i <= index);
    setHoverState(newHoverState);
  };

  const handleMouseLeave = () => {
    const newHoverState = hoverState.map((_, i) => i < rating);
    setHoverState(newHoverState);
  };

  const handleClick = (index) => {
    setRating(index);
    console.log(index); // This will give the rating
  };

  const handleAddComment = () => {
    if (!rating) {
      setMessage(
        "Please rate us, it's very important to know how you like our services"
      );
      setTimeout(() => {
        setMessage("The empty fields will be set as Anonymous");
      }, 1500);
      return;
    }

    if (!commentBody) {
      setMessage("Please fill the comment text field");
      setTimeout(() => {
        setMessage("The empty fields will be set as Anonymous");
      }, 1500);
      return;
    }

    let finalUserName = userName.trim() === "" ? "Anonymous" : userName;
    let finalProfession = profession.trim() === "" ? "Anonymous" : profession;

    setMessage("Comment added Successfully");

    axios
      .post("http://localhost:5000/addNewComment/", {
        userName: finalUserName,
        profession: finalProfession,
        rating,
        comment: commentBody,
        userId: decoded.userId,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log("Something went wrong while sending comment data", err);
      });

    setTimeout(() => {
      // Resetting the state (optional)
      setUserName(decoded.userName);
      setProfession("");
      setRating(0);
      setHoverState([false, false, false, false, false]);
      setCommentBody("");

      window.location.reload();
    }, 1500);

    setTimeout(() => {
      setMessage("The empty fields will be set as Anonymous");
    }, 2000);
  };

  return (
    <div className="comments-container">
      <h1 style={{ textAlign: "center" }}>
        What customers say about <br /> GREEMIND?
      </h1>

      <div className="comment-input-container">
        <textarea
          name="comment"
          id="comment"
          placeholder="Write Your Comment"
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
        ></textarea>
        <div className="options-container">
          <div className="user-info-box">
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Your Name"
            />
            <input
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              type="text"
              placeholder="Your Profession (optional)"
            />
          </div>

          <div className="star-container" onMouseLeave={handleMouseLeave}>
            {hoverState.map((hover, index) => (
              <div
                key={index + 1} // Adjust the key to start from 1
                onMouseEnter={() => handleMouseEnter(index)}
                onClick={() => handleClick(index + 1)}
                className="star-wrapper"
                style={{
                  display: "inline-block",
                  margin: "0 2px",
                  cursor: "pointer",
                }}
              >
                {hover ? (
                  <ImStarFull size={25} style={{ color: "orange" }} />
                ) : (
                  <ImStarEmpty size={25} style={{ color: "orange" }} />
                )}
              </div>
            ))}
          </div>
        </div>
        {message && <p>{message}</p>}
        <button onClick={handleAddComment} className="comment-btn">
          Comment
        </button>
      </div>

      <div className="cards-list">
        {commentsArray.length > 0 ? (
          commentsArray.map((card, index) => (
            <CommentsCard
              body={card.comment}
              userName={card.userName}
              userProfession={card.profession}
              rating={card.rating}
              key={index}
              cardId={card._id}
            />
          ))
        ) : (
          <p>Comments doesn't exist or wait 50 seconds to load comments</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
