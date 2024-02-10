import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
// import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import Error from './Pages/Error';
import Body from './Components/Body';
import RestaurantMenu from './Components/RestaurantMenu';
import SearchMenus from './Components/SearchMenus';
import Cart from './Components/Cart';

const AboutUs = lazy(()=>import('./Pages/AboutUs'))
/**               ^
 *                |
 * ---------------|
 * Chunking 
 * code splitting
 * dynamic bundlig 
 * lazy loading 
 * on demand loading
 * dynamic import
 * 
 * when we use lazy loading code does not comes or load at once
 * it will only come or load when it is requested .
 * 
 * by using lazy loading , we can optimise our application to load faster 
 * f
 */


const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    
    children:[
      {
        path:'/',
        element:<Body/>
      },
      {
        path:'/about',
        element :(<Suspense fallback={<h1>Loading...</h1>}><AboutUs/></Suspense>)
      },
      {
        path:'/contact',
        element:<ContactUs/>
      },
      {
        path:"/restaurants/:resid",
        element:<RestaurantMenu/>
      },
      {
        path:"/restaurants/:resid/search",
        element:<SearchMenus/>
      },
      {
        path:"/cart",
        element:<Cart/>
      }
    ],
    errorElement:<Error/>,
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter}/>);

