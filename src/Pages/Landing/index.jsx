import React, { useState } from "react";
import { ContainedActionBtn, OuterCard, PageContainer } from "../../Components";
import { useData } from "../../Context/DataContext";
import FoodLottie from "../../assets/FoodLottie";

const Landing = () => {
  const {
    cuisineList,
    restaurantList,
    setCurrentCuisine,
    currentCuisine,
    filteredRestaurantList,
  } = useData();

  return (
    <PageContainer className="flex flex-col gap-12">
      <h1 className="text-3xl text-center">Food Ordering App</h1>
      <div className="flex flex-col gap-6 mx-auto">
        <h2 className="text-center text-xl">Select Your Cuisine:</h2>
        <ul className="flex gap-3 max-w-[600px] mx-auto mb-8">
          {cuisineList.map((activeCuisine) => {
            return (
              <li key={activeCuisine.id}>
                <ContainedActionBtn
                  handleClick={() => {
                    setCurrentCuisine(activeCuisine.id);
                  }}
                  btnStyle={{
                    backgroundColor:
                      activeCuisine.id == currentCuisine && "orange",
                  }}
                >
                  {activeCuisine.name}
                </ContainedActionBtn>
              </li>
            );
          })}
        </ul>
        <ul className="flex flex-col gap-6">
          {filteredRestaurantList.length == 0 && <FoodLottie />}
          {filteredRestaurantList.map((currentRestaurant) => {
            return (
              <OuterCard key={currentRestaurant.id} {...currentRestaurant} />
            );
          })}
        </ul>
      </div>
    </PageContainer>
  );
};

export default Landing;
