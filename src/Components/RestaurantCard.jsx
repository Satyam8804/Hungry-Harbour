import React from "react";
import { IMG_URL } from "../utils/data";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurantData }) => {
  const { name, cloudinaryImageId, avgRating, cuisines, sla, id } =
    restaurantData;
  return (
    <Link to={"/restaurants/" + id}>
      <div className="h-auto w-56 p-4 shadow-md rounded-md transition-transform duration-300 flex flex-col gap-4 bg-white">
        <img
          className="w-full h-40 rounded-md transition-all ease-in-out duration-300"
          src={IMG_URL + cloudinaryImageId}
          alt="res-logo"
        />
        <p className="text-lg font-bold overflow-hidden overflow-ellipsis whitespace-nowrap m-0 no-underline">
          {name}
        </p>
        <span className="text-xs block break-words">
          {cuisines.slice(0, 3).join(",")}
        </span>
        <div className="flex justify-between">
          <span className="text-xs">{avgRating} stars</span>
          <span className="text-xs">{sla.deliveryTime} mins</span>
        </div>
      </div>
    </Link>
  );
};

/**
 * Higher order Component
 * 
 * takes ---> restaurantCard as input --> return restaurantCardPromoted ;
 */

export const withPromotedLabel = (RestaurantCard) =>{
  return (props)=>{
    return (
      <div>
        <label htmlFor="">Promoted</label>
        <RestaurantCard  {...props}/>
      </div>
    )
  }
}

export default RestaurantCard;
