import React from "react";
import Menus from "./Menus";
import { IoIosArrowDown ,IoIosArrowUp } from "react-icons/io";

const ResCategory = ({ data ,show,setShowIdx,idx}) => {

  return (
    <div className="flex flex-col bg-white justify-between w-[100%] hover:cursor-pointer mt-2" >
      <div className="flex flex-row justify-between px-4 py-4" onClick={()=>{setShowIdx((prevIdx) => (prevIdx === idx ? !show : idx))}}>
        <span className="font-bold text-lg text-gray-500">{data?.title} ({data?.itemCards?.length})</span>
        <span>{show?<IoIosArrowUp />:<IoIosArrowDown/>}</span>
      </div>
      <div className={show?"block":"hidden"}>
        {
        data?.itemCards &&
          data?.itemCards.map((item) => (
            <Menus item={item} key={item?.card?.info?.id} />
          ))
        }
      </div>
    </div>
  );
};

export default ResCategory;
