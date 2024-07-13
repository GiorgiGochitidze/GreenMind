import './CSS/categories.css';

const CategoriesCard = ({ imgUrl, plantDescription, index }) => {
    return ( 
        <div className={`categories-card ${index === 0 ? 'first-card' : ''} ${index === 2 ? 'third-card' : ''}`}>
            <img src={imgUrl} alt={plantDescription} />
            <p>{plantDescription}</p>
        </div>
    );
}
 
export default CategoriesCard;
