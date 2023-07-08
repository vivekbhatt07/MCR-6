import React from "react";
import Card from "../Card";

const OuterCard = (props) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl">Dishes by {props.name}</h3>
      <ul className="flex flex-wrap gap-4">
        {props.menu.map((currentMenu, menuIndex) => {
          return (
            <li key={menuIndex}>
              <Card {...currentMenu} restaurantName={props.name} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OuterCard;
