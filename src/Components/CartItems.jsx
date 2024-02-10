import React from "react";
import veg from "../Assets/veg.png";
import non_veg from "../Assets/non_veg.png";
import { IMG_URL } from "../utils/data";
import { useDispatch } from "react-redux";
import { addItems, removeItem } from "../utils/Slices/cartSlice";

const CartItems = ({ item }) => {
  const { name, defaultPrice, price, imageId, itemAttribute } =
    item?.card?.info;
  const { vegClassifier } = itemAttribute;

  const itemCount = item?.quantity;

  const dispatch = useDispatch();

  return (
    <div className="w-full md:w-6/12 flex justify-between items-start flex-col p-4 border-b-2 border-gray-300">
      <img
        className="h-[50px] w-[50px] rounded-lg"
        src={IMG_URL + imageId}
        alt="items_img"
      />

      <div className="w-full flex flex-row justify-between items-center gap-4">
        <div>
          {vegClassifier === "VEG" ? (
            <img className="h-3 w-3" src={veg} alt="veg icon" />
          ) : (
            <img className="h-3 w-3" src={non_veg} alt="non veg icon" />
          )}
        </div>
        <div className="text-sm md:font-semibold text-wrap">{name}</div>
        <div className="flex justify-center items-center px-2">
          <div className=" text-sm text-green-500 font-bold  bg-white  px-2 py-1 bottom-7 border-gray-200 border-[1px] -m-7 flex justify-between items-center gap-2" >
            <button className="text-lg font-bold text-gray-500 w-4/12"
            onClick={()=>dispatch(removeItem(item))}
            >
              −
            </button>
            <span className="text-base">{itemCount}</span>
            <button className="text-lg font-bold w-4/12" 
              onClick={()=>dispatch(addItems(item))}
            >+</button>
          </div>
        </div>
        <div className="text-sm">
          ₹{(defaultPrice ? defaultPrice / 100 : price / 100) * itemCount}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
