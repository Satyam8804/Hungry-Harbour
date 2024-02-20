import { useContext, useEffect, useState } from "react";
import { API_URL, CORS_URL, MOB_REST_API } from "./data";
import { LocationContext } from "./LocationContext";
import debounce from "lodash/debounce";

const useRestaurant = () => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [title, setTitle] = useState("");
  const [filteredRestaurantData, setFilteredRestaurantData] = useState(null);
  const { userLocation } = useContext(LocationContext);
  const [whatOnMind, setWhatOnMind] = useState(null);
  const [restroChain, setRestroChain] = useState(null);
  const [filter, setFilter] = useState(null);

    console.log(restaurantData);

  const fetchData = async () => {
    try {
      const apiURL = window.innerWidth <= 768 ? MOB_REST_API : API_URL;

      const data = await fetch(
        CORS_URL +
          apiURL +
          "lat=" +
          userLocation?.latitude +
          "&lng=" +
          userLocation?.longitude
      );
      console.log(
        CORS_URL +
          apiURL +
          "lat=" +
          userLocation?.latitude +
          "&lng=" +
          userLocation?.longitude
      );
      if (!data.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await data.json();
      console.log(json);
      setFilter(json?.data?.cards[3]?.card?.card?.facetList);
      setWhatOnMind(json?.data?.cards?.filter(
        (e) =>
          e?.card?.card?.id ===
          "whats_on_your_mind"
      )[0]?.card?.card);
      setRestroChain(json?.data?.cards?.filter(
        (e) =>
          e?.card?.card?.id ===
          "top_brands_for_you"
      )[0]?.card?.card);
      setRestaurantData(
        json?.data?.cards?.filter(
          (e) =>
            e?.card?.card?.id ===
            "restaurant_grid_listing"
        )[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );
      setTitle(json?.data?.cards?.filter(
        (e) =>
          e?.card?.card?.id ===
          "popular_restaurants_title"
      )[0].card?.card?.title);
      setFilteredRestaurantData(
        json?.data?.cards.filter(
          (e) =>
            e?.card?.card?.id ===
            "restaurant_grid_listing"
        )[0].card?.card?.gridElements?.infoWithStyle?.restaurants
      );
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };

  const debouncedFetchData = debounce(fetchData, 300); // Adjust the debounce delay as needed

  useEffect(() => {
    fetchData();
  }, [userLocation?.latitude, userLocation?.longitude]);

  // Listen for window resize events with debouncing
  useEffect(() => {
    const handleResize = () => {
      debouncedFetchData();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [debouncedFetchData]);

  return {
    filter,
    restroChain,
    whatOnMind,
    restaurantData,
    title,
    filteredRestaurantData,
    setFilteredRestaurantData,
  };
};

export default useRestaurant;
