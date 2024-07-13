const CriteriumsCard = ({IconName, txtTitle, cardTxt}) => {
    return ( 
        <div className="criteriums-card">
        <div className="icon-container">
          <IconName size={35} />
        </div>

        <b>{txtTitle}</b>
        <p className="card-txt">{cardTxt}</p>
      </div>
     );
}
 
export default CriteriumsCard;