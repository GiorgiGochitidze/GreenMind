const PlantsCard = ({imgURL, PlantsName, Price}) => {
    return ( 
        <div className="plants-card">
                <img className='plant-img' src={imgURL} alt="naturalPlant" />
                <p>{PlantsName}</p>
                <p style={{color: '1E1E1E', opacity: '50%'}}>₾ {Price}</p>
        </div>
     );
}
 
export default PlantsCard;