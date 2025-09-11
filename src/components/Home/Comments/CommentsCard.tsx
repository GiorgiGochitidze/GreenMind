type CommentType = {
    commentText: string;
    commentAuthor: string;
    starRate: string;
}

const CommentsCard = ({commentText, commentAuthor, starRate}: CommentType) => {
    return ( 
        <div className="comments-card">
          <p>
            {commentText}
          </p>

          <p>
            <span style={{ fontWeight: "bold" }}>{commentAuthor}</span> <br />
            {starRate}
          </p>
        </div>
     );
}
 
export default CommentsCard;