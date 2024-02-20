import { useContext, useEffect, useState } from "react";
import { CORS_URL, MENU_API_URL, MOB_MENU_API_URL } from "./data";
import { LocationContext } from "./LocationContext";

const useRestaurantMenu = (resId) => {
  const { userLocation } = useContext(LocationContext);
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, [userLocation?.latitude, userLocation?.longitude,window.innerWidth]);

  const fetchData = async () => {
    try {
      const apiURL = window.innerWidth <= 768 ? MOB_MENU_API_URL : MENU_API_URL;
      const url = CORS_URL + apiURL;
      const params = `lat=${userLocation?.latitude}&lng=${userLocation?.longitude}&restaurantId=${resId}`;
      
      const data = await fetch(`${url}&${params}`);
      const json = await data.json();
      
      setResInfo(json && json.data);
      console.log(`${url}&${params}`);
    } catch (error) {
      console.error("Error fetching restaurant menu:", error);
    }
  };
  

  return resInfo;
};

export default useRestaurantMenu;
