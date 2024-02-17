import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import useRestaurant from "../utils/UseRestaurant.js";
import NoData from "./NoData.js";
import { IMG_URL } from "../utils/data.js";
import Filter from "./Filter.jsx";

const Body = ({ searchVisible }) => {
  const [searchText, setSearchText] = useState("");

  const [onMind, setOnMind] = useState(null);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true)
  };
  const closeModal = () => setModalOpen(false);

  const {
    filter,
    restroChain,
    whatOnMind,
    restaurantData,
    title,
    filteredRestaurantData,
    setFilteredRestaurantData,
  } = useRestaurant();
  // console.log(restaurantData)

  const { restaurants } = restroChain?.gridElements?.infoWithStyle ?? {};

  const handleSearch = () => {
    const filteredData = restaurantData.filter((e) =>
      e.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurantData(filteredData);
  };

  // console.log(whatOnMind)

  useEffect(() => {
    setOnMind(whatOnMind?.gridElements?.infoWithStyle?.info);
  }, [whatOnMind]);

  return restaurantData && restaurantData.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="flex flex-col items-center justify-center gap-8 sm:w-full p-2">
      <div className={`w-full sm:p-4 ${searchVisible ? "hidden" : "hidden"}`}>
        <div className="flex items-center justify-center gap-4">
          <input
            type="text"
            name="search"
            className="p-2 border-2 border-gray-300 rounded-lg"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={handleSearch}
            className="p-2 bg-blue-500 text-white rounded-lg cursor-pointer bg-green-400"
          >
            Search
          </button>
        </div>
      </div>

      {/*whats on mind  */}

      <div className="w-full md:w-10/12 sm:p-4 border-b-2">
        <div className="">
          <span className="text-2xl font-extrabold">
            {whatOnMind?.header?.title}
          </span>
        </div>

        <div className="flex flex-row px-4 py-4 overflow-x-scroll scroll">
          {onMind &&
            onMind.map((item) => (
              <img
                src={IMG_URL + item?.imageId}
                alt="img"
                key={item?.id}
                className="w-[150px] cursor-pointer "
              />
            ))}
        </div>
      </div>

      <div className="w-full sm:w-10/12 p-4 border-b-2">
        <div className="">
          <span className="text-2xl font-extrabold">
            {restroChain?.header?.title}
          </span>
        </div>

        <div className="flex flex-row sm:px-4 py-4 overflow-x-scroll scroll justify-start">
          {restaurants &&
            restaurants.map((item) => (
              <RestaurantCard
                restaurantData={item?.info}
                key={item?.info?.id}
                flex ={'col'}
                width= {'250px'}
              />
            ))}
        </div>
      </div>

      {/* online delivery */}

      <div className="w-full sm:w-10/12 sm:p-4 flex flex-wrap flex-col">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="">
          <button className="border px-4 py-1 rounded-xl" onClick={openModal}>Filter</button>
          <Filter isOpen={isModalOpen} onClose={closeModal} filter = {filter}/>
        </div>
        <div className="w-full py-4 flex flex-wrap sm:justify-center items-center gap-2 ">
          {filteredRestaurantData && filteredRestaurantData?.length === 0 ? (
            <NoData data="No Restaurant Found !" />
          ) : (
            filteredRestaurantData?.map((data) => (
              <RestaurantCard
                restaurantData={data?.info}
                key={data?.info?.id}
                flex ={'row'}
                width = {'full'}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
