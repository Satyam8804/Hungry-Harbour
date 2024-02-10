import React, { useEffect, useState } from 'react';
import { GoArrowLeft } from "react-icons/go";
import { useNavigate, useParams } from 'react-router-dom';
import useRestaurantMenu from '../utils/UseRestaurantMenu';
import Menus from './Menus';
import { CiSearch } from "react-icons/ci";

import NoData from './NoData.js';


const SearchMenus = () => {
    let menusList = []
    const [filterMenu, setFilterMenu] = useState([]);
    const [searchText, setSearchText] = useState("");

    const { resid } = useParams('resid');
    const resInfo = useRestaurantMenu(resid);

    let navigate = useNavigate()

    const categories = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR.cards.filter(e => e?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");
    const menus = categories?.flatMap((e) => e?.card?.card?.itemCards);
    menusList.push(menus);
    console.log(filterMenu)

    useEffect(() => {
      const handleSearch = setTimeout(() => {

          if(searchText !== ""){
            const filteredData = menusList[0]?.filter(item => item?.card?.info.name.toLowerCase().includes(searchText.toLowerCase()));
            setFilterMenu(filteredData);    
            }else{
                setFilterMenu(null)
            }
          
      }, 500);

      return () => clearTimeout(handleSearch);
  }, [searchText]);


    const resDetails = resInfo?.cards[0]?.card?.card?.info;

    return (
        <div className='w-full flex flex-col justify-center items-center '>
            <div className="md:w-1/2 mt-4 w-[70%]">
                <div className="w-full flex justify-start items-center border-b-2">
                    <span className='cursor-pointer' ><GoArrowLeft onClick={() => { navigate(-1) }} /></span>
                    <input type="text" placeholder={"Search in " + resDetails?.name} value={searchText} className='p-4 w-[100%] border-0 outline-none focus:border-0' onChange={(e) => { setSearchText(e.target.value) }} />
                    <CiSearch />
                </div>

                <div className="">
                    {
                        filterMenu && filterMenu.length === 0 ?(
                            <NoData data ={"No Data Found !!"}/>
                        ):(
                            filterMenu?.map((data) => (
                            <Menus item={data} key={data?.card?.info?.id} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchMenus;
