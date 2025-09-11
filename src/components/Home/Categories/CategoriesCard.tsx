import { BsArrowRight } from "react-icons/bs";

type CategoriesType = {
  cardImage: string;
  cardHeader: string;
  showButton?: boolean;
};

const CategoriesCard = ({
  cardImage,
  cardHeader,
  showButton,
}: CategoriesType) => {   
  return (
    <div className={`categories-card ${!showButton && "categories-up"}`}>
      <img src={cardImage} alt="Plant Images" />
      <p>{cardHeader}</p>
      {showButton && (
        <button className="explore-button">
          Explore <BsArrowRight size={20} />
        </button>
      )}
    </div>
  );
};

export default CategoriesCard;
