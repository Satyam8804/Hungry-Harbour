// LocationContext.js
import { createContext, useState, useEffect } from 'react';

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, []);

  const value = {
    userLocation,
  };

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};

export { LocationProvider, LocationContext };
