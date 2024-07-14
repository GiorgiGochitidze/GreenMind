const CategoriesCard = ({ imgUrl, plantDescription, children, className }) => {
    return ( 
        <div className={`categories-card ${className}`}>
            <img src={imgUrl} alt={imgUrl} />
            <p>{plantDescription}</p>
            {children}
        </div>
     );
}

export default CategoriesCard;
