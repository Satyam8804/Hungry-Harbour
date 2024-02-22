import { useContext, useEffect, useState } from "react";
import { CORS_URL, MENU_API_URL, MOB_MENU_API_URL } from "./data";
import { LocationContext } from "./LocationContext";
import debounce from "lodash/debounce";

const useRestaurantMenu = (resId) => {
  const { userLocation } = useContext(LocationContext);
  const [resInfo, setResInfo] = useState(null);

  
  const fetchData = async () => {
    try {
      const apiURL = window.innerWidth <= 768 ? MOB_MENU_API_URL : MENU_API_URL;
      const url = CORS_URL + apiURL;
      const params = `lat=${userLocation?.latitude}&lng=${userLocation?.longitude}&restaurantId=${resId}`;
      
      const data = await fetch(`${url}&${params}`);
      const json = await data.json();
      // console.log(json?.data)
      
      setResInfo(json?.data);
      // console.log(`${url}&${params}`);
    } catch (error) {
      console.error("Error fetching restaurant menu:", error);
    }
  };
  
  const debouncedFetchData = debounce(fetchData, 2000); // Adjust the debounce delay as needed
  useEffect(() => {
    const handleResize = () => {
      debouncedFetchData();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [debouncedFetchData]);

  useEffect(() => {
    console.log("useEffect - userLocation", userLocation);
    if (userLocation?.latitude && userLocation?.longitude) {
      fetchData();
    }
  }, [userLocation?.latitude, userLocation?.longitude]);
  
  

  return resInfo;
};

export default useRestaurantMenu;
