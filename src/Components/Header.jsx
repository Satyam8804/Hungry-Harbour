import React, {  useState } from 'react';
import logo from '../Assets/logo.png';
import { NavLink ,Link} from 'react-router-dom';
import useOnlineStatus from "../utils/UseOnlineStatus.js";
import { useSelector } from 'react-redux';
import { TiShoppingCart } from "react-icons/ti";
const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();

// subscribing to the store using selector
  const cart = useSelector((store)=>store.cart.items);

  // console.log(cart)

  return (
    <div className='flex justify-between items-center p-4 header'>
      <div className="logo-container">
        <img className='w-12' src={logo} alt="logo" />
      </div>
      <div className="nav-items">
        <ul className="md:flex gap-8 text-lg hidden md:block">
          <li><NavLink to={"/"} >Home</NavLink></li>
          <li><NavLink to={"/about"} >About Us</NavLink></li>
          <li><NavLink to={"/contact"}>Contact Us</NavLink></li>
          <li className='flex justify-center items-center'>
            <Link to = {"/cart"}>
              <div className="flex relative">
              <TiShoppingCart size={30} />
              {
                cart.length !==0 ? (
                  <span className='absolute text-[10px] text-white bg-green-500 rounded-xl  h-4 w-4 font-bold flex items-center justify-center left-6 bottom-4'>{cart.length}</span>
                ): ("")
              }
              </div>
            </Link>
            </li>
          <li>Status {onlineStatus ? "✅" : "🔴"}</li>
          <button className='w-20 px-2 py-1 border rounded cursor-pointer transition-all ease-in-out text-slate-500' onClick={() => { btnName === "Login" ? setBtnName("Logout") : setBtnName("Login") }}>{btnName}</button>
        </ul>
      </div>
    </div>
  );
}

export default Header;
