import React, { useState } from "react";
import { IMG_URL, MOB_IMG_URL } from "../utils/data";
import veg from "../Assets/veg.png";
import non_veg from "../Assets/non_veg.png";
import { useDispatch } from "react-redux";
import { addItems,removeItem } from "../utils/Slices/cartSlice";

// import './Menus.css';

const Menus = ({ item }) => {
  const { name, description, defaultPrice, price, imageId, itemAttribute } =
    item?.card?.info;
    console.log(item?.card?.info)
  const { vegClassifier } = itemAttribute;

  const [itemCount, setItemCount] = useState(0);

  const dispatch = useDispatch();

  const handleAddItem = () => {
   
    dispatch(addItems(item));
    setItemCount((prev) => prev + 1);
  };

  const handleRemoveItem = () => {
    dispatch(removeItem(item));
    setItemCount((prev) => prev - 1);
  };

  return (
    <div className="flex justify-between items-center p-4 border-b-2 border-gray-300">
      <div className="menu-details">
        <div>
          {vegClassifier === "VEG" ? (
            <img className="h-5 w-5" src={veg} alt="veg icon" />
          ) : (
            <img className="h-5 w-5" src={non_veg} alt="non veg icon" />
          )}
        </div>
        <span className="text-base font-semibold">{name}</span>
        <br />
        <span className="text-base">
          ₹{defaultPrice ? defaultPrice / 100 : price / 100}
        </span>
        <p className="w-[200px] desc text-sm text-gray-500 overflow-hidden text-nowrap">
          {description ? description : ""}
        </p>
      </div>
      <div className=" flex flex-col justify-center items-center py-8">
        <img
          className="h-[100px] w-[120px] rounded-lg "
          src={IMG_URL + imageId}
          alt="items_img"
        />

        {itemCount === 0 ? (
          <button
            className=" text-sm text-green-500 font-bold  bg-white w-[80%] rounded-md p-2 px-4 shadow-xl bottom-7 border-gray-200 border-[1px] -m-7"
            onClick={handleAddItem}
          >
            Add
          </button>
        ) : (
          <div className=" text-sm text-green-500 font-bold  bg-white w-[80%] rounded-md px-2 py-1 shadow-xl bottom-7 border-gray-200 border-[1px] -m-7 flex justify-between items-center">
            <button onClick={handleRemoveItem} className="text-lg font-bold text-gray-500 w-4/12">−</button>
            <span>{itemCount}</span>
            <button onClick={handleAddItem} className="text-lg font-bold w-4/12">+</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menus;
