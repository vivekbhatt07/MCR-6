import React from "react";
import { useParams } from "react-router-dom";
import {
  ContainedActionBtn,
  PageContainer,
  ReviewCard,
} from "../../Components";
import { useData } from "../../Context/DataContext";

const Detail = () => {
  const { restaurantId } = useParams();
  const { restaurantList } = useData();

  const getRestaurant = restaurantList.find((currentRestaurant) => {
    return currentRestaurant.id == restaurantId;
  });

  return (
    <PageContainer className="flex flex-col">
      <div className="flex justify-between pb-4 border-b-2 border-stone-400">
        <div className="flex flex-col gap-1">
          <h1 className="text-5xl mb-2">{getRestaurant?.name}</h1>
          <p className="text-stone-500 font-normal">
            {getRestaurant?.menu
              .map((currentMenuItem) => {
                return currentMenuItem.name;
              })
              .join(",  ")}
          </p>
          <span className="text-stone-500 font-normal">
            {getRestaurant?.address}
          </span>
          <span className="text-stone-500 font-normal">
            {getRestaurant?.phone}
          </span>
        </div>
        <div className="flex items-center">
          <ContainedActionBtn>Add Review</ContainedActionBtn>
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-8">
        <h3 className="text-3xl">Reviews</h3>
        <ul className="flex flex-col gap-2">
          {getRestaurant?.ratings.map((currentRating, ratingIndex) => {
            return (
              <li key={ratingIndex}>
                <ReviewCard {...currentRating} />
              </li>
            );
          })}
        </ul>
      </div>
    </PageContainer>
  );
};

export default Detail;
