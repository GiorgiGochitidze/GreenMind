import React from "react";
import "./CSS/comments.css";
import CommentsCard from "./CommentsCard";

const Comments = () => {
  const Cards = [
    {
      body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti veniam
        quibusdam inventore earum expedita enim similique quae fuga, dignissimos
        excepturi perferendis corporis minima veritatis nisi? Rerum explicabo ea
        laudantium corrupti?`,
      userName: "John Doe",
      userProfession: "Youtuber",
      rating: "4.5",
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
      <h1 style={{textAlign: 'center'}}>
        What customers say about <br /> GREEMIND?
      </h1>

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
