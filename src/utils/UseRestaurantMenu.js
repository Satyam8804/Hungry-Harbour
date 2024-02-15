import { useContext, useEffect, useState } from "react";
import { CORS_URL, MENU_API_URL } from "./data";
import { LocationContext } from "./LocationContext";

const useRestaurantMenu=(resId)=>{
    const { userLocation } = useContext(LocationContext);

    const [resInfo, setResInfo] = useState(null)


    const fetchData = async () => {
        try {
            const data = await fetch(CORS_URL+MENU_API_URL+"lat="+userLocation?.latitude+"&lng="+userLocation?.longitude+"&submitAction=ENTER&restaurantId=" + resId);
            const json = await data.json();
            setResInfo(json.data);
        } catch (error) {
            console.error("Error fetching restaurant menu:", error);
        }
    };

    useEffect(()=>{
        fetchData();
    },[userLocation?.latitude ,userLocation?.longitude])

   

    return resInfo;
}

export default useRestaurantMenu;