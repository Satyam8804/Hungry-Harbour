import React from "react";
import { IMG_URL } from "../utils/data";
import { Link } from "react-router-dom";
import { MdStars } from "react-icons/md";


const RestaurantCard = ({ restaurantData }) => {
  const { name, cloudinaryImageId, avgRating, cuisines, sla, id ,areaName } =
    restaurantData ?? {};

  return (
    <Link to={"/restaurants/" + id}>
      <div className="sm:h-auto sm:w-[250px] w-full p-2 transition-transform duration-300 flex flex-row hover:scale-105 sm:flex-col gap-4 justify-center">
        <img
          className="sm:w-full w-[150px] h-40 rounded-2xl transition-all ease-in-out duration-300 "
          src={IMG_URL + cloudinaryImageId}
          alt="res-logo"
        />
        <div className="w-full px-4 flex flex-col">
        <span className="text-lg font-bold overflow-hidden overflow-ellipsis whitespace-nowrap m-0 no-underline text-gray-700">
          {name}
        </span>
        <div className="flex gap-2 items-center">
          <span><MdStars color="green" size={20}/></span>
          <span className="text-sm text-gray-500 font-bold">{avgRating} stars</span>
          <span className="text-sm text-gray-500 font-bold">{sla.deliveryTime} mins</span>
        </div>
        <span className="text-sm block break-words text-gray-500">
          {cuisines.slice(0, 3).join(",")}
        </span>
       <span className="text-sm text-gray-500">{areaName}</span>
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
