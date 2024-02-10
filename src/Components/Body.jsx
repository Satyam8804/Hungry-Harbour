import React, { useState } from 'react';
import RestaurantCard from './RestaurantCard';
import Shimmer from './Shimmer';
import useRestaurant from '../utils/UseRestaurant.js';
import NoData from './NoData.js';

const Body = () => {
  const [searchText, setSearchText] = useState("");


  const { restaurantData, title, filteredRestaurantData, setFilteredRestaurantData } = useRestaurant();
  console.log(restaurantData)

  const handleSearch = () => {
    const filteredData = restaurantData.filter(e => e.info.name.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredRestaurantData(filteredData);
  }


  return restaurantData && restaurantData.length === 0 ? (
    <Shimmer />
  ) : (
    <div className='flex flex-col items-center justify-center bg-[#e9ecee]'>
      <div className="w-full p-4 ">
        <div className="flex items-center justify-center gap-4">
          <input
            type="text"
            name="search"
            className='p-2 border-2 border-gray-300 rounded-lg'
            placeholder='Search...'
            value={searchText}
            onChange={(e) => { setSearchText(e.target.value) }}
          />
          <button onClick={handleSearch} className='p-2 bg-blue-500 text-white rounded-lg cursor-pointer bg-green-400'>Search</button>
        </div>
      </div>
      <div className="w-full p-4 flex flex-wrap justify-center items-center">
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <div className="w-full py-4 flex flex-wrap justify-center items-center gap-4">
        {
          filteredRestaurantData && filteredRestaurantData?.length === 0 ? (
            <NoData data="No Restaurant Found !" />
          ) : (
            filteredRestaurantData?.map((data) => (
            <RestaurantCard restaurantData={data?.info} key={data?.info?.id} />)
            ))
          }
      </div>
    </div>
  );
}

export default Body;
