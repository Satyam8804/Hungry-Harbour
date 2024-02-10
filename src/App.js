import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import { LocationProvider } from "./utils/LocationContext";

import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  return (
    <Provider store={appStore}>
    <LocationProvider>
      <div className="App">
        <Header />
        <Outlet />
      </div>
    </LocationProvider>  
    </Provider>
  );
}

export default App;

/*
  according to the route path 
  <outlet/> will be replaced
*/
