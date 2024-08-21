import { useState, createContext, useContext } from 'react';

// Create a Context for the card data
const CardDataContext = createContext();

// Custom hook to provide the context
export const useCardData = () => {
  return useContext(CardDataContext);
};

// Provider component that wraps your app and makes card data available
const CardDataProvider = ({ children }) => {
  const [cardData, setCardData] = useState(null);

  const handleGetCardData = ({ imgURL, PlantsName, Price, cardId, purchashes }) => {
    const newData = { imgURL, PlantsName, Price, cardId, purchashes };
    setCardData(newData);
  };

  return (
    <CardDataContext.Provider value={{ cardData, handleGetCardData }}>
      {children}
    </CardDataContext.Provider>
  );
};

export default CardDataProvider;
