import { IoIosStar } from "react-icons/io";

const CommentsCard = ({ body, userName, userProfession, rating }) => {
  return (
    <div className="comments-card">
      <p style={{ color: "rgba(30, 30, 30, 75%)", marginTop: "50px" }}>
        {body}
      </p>

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
