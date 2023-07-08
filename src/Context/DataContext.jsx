import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { cuisineData, restaurantsData } from "../Data/index";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [currentCuisine, setCurrentCuisine] = useState("");
  const [cuisineList, setCuisineList] = useState(cuisineData);
  const [restaurantList, setRestaurantList] = useState(restaurantsData);

  const filteredRestaurantList = restaurantList.filter((currentRestaurant) => {
    return currentRestaurant.cuisine_id == currentCuisine;
  });

  return (
    <DataContext.Provider
      value={{
        cuisineList,
        restaurantList,
        currentCuisine,
        setCuisineList,
        setRestaurantList,
        setCurrentCuisine,
        filteredRestaurantList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => {
  return useContext(DataContext);
};

export { useData, DataProvider };
