import React from "react";
// import "./RestaurantMenu.css";

const RestaurantInfo = ({ resDetails }) => {
  const { name, cuisines, totalRatingsString, avgRating, areaName } = resDetails || {};

  if (!name || !cuisines || !totalRatingsString || !avgRating || !areaName) {
    return <div>Error: Invalid restaurant details</div>;
  }

  return (
    <div className="flex items-center justify-between w-full border-b-2 border-gray-300 pb-8 res-info " >
      <div className="res-details">
        <h3 className="text-lg font-semibold">{name?name:""}</h3>
        <span className="text-sm text-gray-500">{cuisines ? cuisines.join(",") : "No cuisines available"}</span>
        <br />
        <span className="text-sm">{areaName}</span>
      </div>

      <div className="res-rating flex flex-col items-center justify-center font-bold border border-gray-300 rounded p-2 gap-2">
        <div className="rating">
          <span className="text-green-500">{avgRating}</span>
        </div>
        <div className="rating-count text-xs border-t-2 border-gray-300 pt-2 text-gray-500">
        <span>{totalRatingsString || "No ratings available"}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;
