type CardType = {
  cardImage: string;
  cardTitle: string;
  cardPrice: number;
};

const BestSellingCard = ({ cardImage, cardTitle, cardPrice }: CardType) => {
  return (
    <div className="bestSelling-card">
      <img src={cardImage} alt={cardTitle} />
      <p>{cardTitle}</p>
      <p>₾ {cardPrice}</p>
    </div>
  );
};

export default BestSellingCard;
