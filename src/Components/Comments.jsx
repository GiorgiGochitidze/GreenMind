import React, { useState } from "react";
import "./CSS/comments.css";
import CommentsCard from "./CommentsCard";
import { ImStarEmpty, ImStarFull } from "react-icons/im";

const Comments = () => {
  const [hoverState, setHoverState] = useState([false, false, false, false, false]);

  const handleMouseEnter = (index) => {
    const newHoverState = hoverState.map((_, i) => i <= index);
    setHoverState(newHoverState);
  };

  const handleMouseLeave = () => {
    setHoverState([false, false, false, false, false]);
  };

  const Cards = [
    {
      body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti veniam
        quibusdam inventore earum expedita enim similique quae fuga, dignissimos
        excepturi perferendis corporis minima veritatis nisi? Rerum explicabo ea
        laudantium corrupti?`,
      userName: "John Doe",
      userProfession: "Youtuber",
      rating: "4",
    },
    {
      body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti veniam
        quibusdam inventore earum expedita enim similique quae fuga, dignissimos
        excepturi perferendis corporis minima veritatis nisi? Rerum explicabo ea
        laudantium corrupti?`,
      userName: "Roberto",
      userProfession: "Manager",
      rating: "5",
    },
  ];

  return (
    <div className="comments-container">
      <h1 style={{ textAlign: "center" }}>
        What customers say about <br /> GREEMIND?
      </h1>

      <div className="comment-input-container">
        <textarea name="comment" id="comment" placeholder="Write Your Comment"></textarea>
        <div className="options-container">
          <div className="user-info-box">
            <input type="text" placeholder="Your Name" />
            <input type="text" placeholder="Your Profession (optional)" />
          </div>

          <div 
            className="star-container" 
            onMouseLeave={handleMouseLeave}
          >
            {hoverState.map((hover, index) => (
              <div
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                className="star-wrapper"
                style={{ display: 'inline-block', margin: '0 2px' }}
              >
                {hover ? (
                  <ImStarFull size={25} style={{ color: 'orange' }} />
                ) : (
                  <ImStarEmpty size={25} style={{ color: 'orange' }} />
                )}
              </div>
            ))}
          </div>
        </div>
        <button className="comment-btn">Comment</button>
      </div>

      <div className="cards-list">
        {Cards.map((card, index) => (
          <CommentsCard
            body={card.body}
            userName={card.userName}
            userProfession={card.userProfession}
            rating={card.rating}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
