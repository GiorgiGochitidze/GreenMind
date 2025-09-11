type CardTypes = {
  cardIcon: string;
  cardHeader: string;
  cardDescription: string;
};

const AboutCard = ({ cardIcon, cardHeader, cardDescription }: CardTypes) => {
  return (
    <div className="about-items-card">
      <div className="about-items-image-container">
        <img src={cardIcon} alt="About Card Icon" />
      </div>
      <p>{cardHeader}</p>
      <p>{cardDescription}</p>
    </div>
  );
};

export default AboutCard;
