import React from 'react';
import CategoriesCard from './CategoriesCard';
import './CSS/categories.css';
import plantAccessories from '../assets/plantAccessories.png';
import naturalPlants from '../assets/naturalPlants.png';
import artificialPlants from '../assets/artificialPlants.png';

const Categories = () => {
    const cards = [
        { imgUrl: plantAccessories, plantDescription: "Plant Accessories" },
        { imgUrl: naturalPlants, plantDescription: "Natural Plants" },
        { imgUrl: artificialPlants, plantDescription: "Artificial Plants" }
    ];

    return ( 
        <div className="categories-container">
            <h1 style={{ textAlign: 'center' }}>Categories</h1>
            <p style={{ textAlign: 'center', color: 'rgba(30, 30, 30, 50%)' }}>Find what you are looking for</p>

            <div className="categories-list">
                {cards.map((card, index) => (
                    <CategoriesCard 
                        key={index}
                        imgUrl={card.imgUrl}
                        plantDescription={card.plantDescription}
                        index={index}
                    />
                ))}
                <button className='explore-btn'>Explore</button>
            </div>
        </div>
    );
}
 
export default Categories;
