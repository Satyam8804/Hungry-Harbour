import { useContext, useEffect, useState } from "react"
import {  API_URL} from "./data";
import { LocationContext } from "./LocationContext";

const useRestaurant = () =>{
    const [restaurantData , setRestaurantData] = useState([])
    const [title , setTitle] = useState("");
    const [filteredRestaurantData ,setFilteredRestaurantData] = useState(null)
    const { userLocation } = useContext(LocationContext);
    
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const data = await fetch(API_URL + "lat=" + userLocation?.latitude + "&lng=" + userLocation?.longitude + "&page_type=DESKTOP_WEB_LISTING");
                if (!data.ok) {
                    throw new Error("Network response was not ok");
                }
                const json = await data.json();
                setRestaurantData(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
                setTitle(json?.data?.cards[2]?.card?.card?.title);
                setFilteredRestaurantData(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
            } catch (error) {
                console.error("Error fetching restaurant data:", error);
            }
        };
        fetchData();
    },[userLocation?.latitude,userLocation?.longitude])
 
    // 13.00535708692319, 77.58995360194062
    return {restaurantData,title,filteredRestaurantData ,setFilteredRestaurantData}
}

export default useRestaurant;