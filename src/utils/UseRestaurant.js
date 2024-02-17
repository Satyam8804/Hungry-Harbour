import { useContext, useEffect, useState } from "react"
import {  API_URL, CORS_URL, MOB_REST_API} from "./data";
import { LocationContext } from "./LocationContext";

const useRestaurant = () =>{
    const [restaurantData , setRestaurantData] = useState([])
    const [title , setTitle] = useState("");
    const [filteredRestaurantData ,setFilteredRestaurantData] = useState(null)
    const { userLocation } = useContext(LocationContext);
    const [whatOnMind ,setWhatOnMind] = useState(null)

    const [restroChain , setRestroChain] = useState(null)

    const [filter , setFilter] = useState(null)

    // bangalore

    // let lat = '13.00535708692319'
    // let lng =  '77.58995360194062'

    useEffect(()=>{
        const fetchData = async () => {
            try {

                const apiURL = window.innerWidth <= 768 ? MOB_REST_API : API_URL;
        
                const data = await fetch(CORS_URL+apiURL+"lat="+userLocation?.latitude + "&lng="+ userLocation?.longitude);
                if (!data.ok) {
                    throw new Error("Network response was not ok");
                }
                const json = await data.json();
                setFilter(json?.data?.cards[3]?.card?.card?.facetList)
                setWhatOnMind(json?.data?.cards[0]?.card?.card)
                setRestroChain(json?.data?.cards[1]?.card?.card)
                setRestaurantData(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
                setTitle(json?.data?.cards[2]?.card?.card?.title);
                setFilteredRestaurantData(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
            } catch (error) {
                console.error("Error fetching restaurant data:", error);
            }
        };
        fetchData();
    },[userLocation?.latitude,userLocation?.longitude])
 
    // 13.00535708692319, 77.58995360194062
    return {filter,restroChain,whatOnMind, restaurantData,title,filteredRestaurantData ,setFilteredRestaurantData}
}

export default useRestaurant;