import Shimmer from "./Shimmer";
import { Link, useParams } from "react-router-dom";
import RestaurantInfo from "./RestaurantInfo";
import useRestaurantMenu from "../utils/UseRestaurantMenu.js";
import ResCategory from "./ResCategory.jsx";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const RestaurantMenu = () => {
  const { resid } = useParams();
  const resInfo = useRestaurantMenu(resid);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [showIdx, setShowIdx] = useState(0);

  const [category , setCategory] = useState(null)


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const isVisible = scrollPosition > 130; 
      setIsHeaderVisible(isVisible);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(()=>{
    let apiURL = window.innerWidth <= 768;
    // Ensure resInfo is available and not null before processing
    if (resInfo && resInfo.cards) {
      let categories = apiURL
        ? resInfo.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
            (e) =>
              e?.card?.card?.["@type"] ===
              "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
          )
        : resInfo.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
            (e) =>
              e?.card?.card?.["@type"] ===
              "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
          );
      setCategory(categories);
    }
  }, [resInfo, window.innerWidth]);

  if (resInfo === null || !resInfo?.cards ) {
    return <Shimmer/>
  }

  const resDetails = window.innerWidth <= 768? resInfo?.cards[2]?.card?.card?.info :resInfo?.cards[0]?.card?.card?.info ;
  console.log(resDetails)

    return (
    <div className="w-full flex flex-col justify-center items-center bg-[#e9ecee]">
      <div className="md:w-1/2 mt-2 w-full p-4 flex flex-col gap-8 bg-white">
        <div className="w-full mb-4">
          <span className="text-xs">
            Home / {resDetails?.city} / {resDetails?.name}
          </span>
        </div>
        <div
          className={`w-full mb-4 flex justify-between items-center sticky top-0 bg-white py-4 z-9 border-b-2 ${
            isHeaderVisible ? "block" : "hidden"
          }`}
        >
          <span className="text-sm font-bold">{resDetails?.name}</span>
          <Link to={"/restaurants/" + resid + "/search"}>
            <CiSearch />
          </Link>
        </div>
        <RestaurantInfo resDetails={resDetails} />
        <div className="mt-4 flex flex-col gap-2 bg-slate-100 ">
          {category?.map((category, idx) => (
            <ResCategory
              data={category?.card?.card}
              show={idx === showIdx ? true : false}
              key={idx}
              setShowIdx={setShowIdx}
              idx={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
