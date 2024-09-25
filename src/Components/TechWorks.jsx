import { useEffect } from "react";
import "./CSS/techworks.css";

const TechWorks = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container12">
      <h1 style={{ textAlign: "center" }}>Technical Works are in progress...</h1>
      <div className="subcontainer">
        <div className="circle1">
          <div className="circle2"></div>
        </div>
      </div>
    </div>
  );
};

export default TechWorks;
