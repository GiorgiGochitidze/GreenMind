import React, { useRef } from "react";
import CommentsCard from "./CommentsCard";
import "./CSS/Comments.css";

const Comments = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;

    const startX = e.pageX;
    const scrollLeft = el.scrollLeft;

    const onMove = (ev: MouseEvent) => {
      el.scrollLeft = scrollLeft - (ev.pageX - startX);
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <div className="comments-container">
      <h5>
        What customers say about <br /> GREEMIND?
      </h5>

      <div ref={scrollRef} className="comments-list" onMouseDown={onMouseDown}>
        <CommentsCard
          commentText={`
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Voluptates, et! Nam provident omnis consectetur voluptas magnam
            cumque odio mollitia illo ducimus, recusandae modi deserunt id
            itaque! Quibusdam enim praesentium amet. Nulla vero amet asperiores
            voluptatum ex aspernatur necessitatibus reiciendis magni, aperiam
            suscipit atque, ipsam neque, fuga ipsum at dolor nobis adipisci
            explicabo voluptate. Nostrum excepturi blanditiis accusamus corporis
            rerum similique?
            `}
          commentAuthor={"John Doe"}
          starRate={"4.5"}
        />
        <CommentsCard
          commentText={`
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Voluptates, et! Nam provident omnis consectetur voluptas magnam
            cumque odio mollitia illo ducimus, recusandae modi deserunt id
            itaque! Quibusdam enim praesentium amet. Nulla vero amet asperiores
            voluptatum ex aspernatur necessitatibus reiciendis magni, aperiam
            suscipit atque, ipsam neque, fuga ipsum at dolor nobis adipisci
            explicabo voluptate. Nostrum excepturi blanditiis accusamus corporis
            rerum similique?
            `}
          commentAuthor={"John Doe"}
          starRate={"4.5"}
        />
        <CommentsCard
          commentText={`
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Voluptates, et! Nam provident omnis consectetur voluptas magnam
            cumque odio mollitia illo ducimus, recusandae modi deserunt id
            itaque! Quibusdam enim praesentium amet. Nulla vero amet asperiores
            voluptatum ex aspernatur necessitatibus reiciendis magni, aperiam
            suscipit atque, ipsam neque, fuga ipsum at dolor nobis adipisci
            explicabo voluptate. Nostrum excepturi blanditiis accusamus corporis
            rerum similique?
            `}
          commentAuthor={"John Doe"}
          starRate={"4.5"}
        />
      </div>
    </div>
  );
};

export default Comments;
