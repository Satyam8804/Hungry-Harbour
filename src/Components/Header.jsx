import React, {  useState } from 'react';
import logo from '../Assets/logo.png';
import { NavLink ,Link} from 'react-router-dom';
import useOnlineStatus from "../utils/UseOnlineStatus.js";
import { useSelector } from 'react-redux';
import { TiShoppingCart } from "react-icons/ti";
import { CiSearch } from "react-icons/ci";

const Header = ({setSearchVisible ,searchVisible}) => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();

  const [searchShow , setSearchShow] = useState(false)
 
// subscribing to the store using selector
  const cart = useSelector((store)=>store.cart.items);

  // console.log(cart)

  return (
    <div className='flex justify-between items-center p-4 header shadow-lg'>
      <Link to={'/'}>
        <div className="cursor-pointer">
        <img className='w-8 ml-6 hover:scale-110' src={logo} alt="logo" />
        </div>
      </Link>
      <div className="sm:relative sm:block fixed bottom-0 flex  left-0 w-full sm:w-auto bg-white sm:bg-inherit h-16 justify-center z-10">
        <ul className="md:flex sm:gap-8 text-lg flex items-center justify-evenly w-full">
          <li className={`flex flex-row items-center gap-2 justify-center cursor-pointer hover:text-orange-500 font-bold ${searchShow?'border-b-2':''}`} ><input type="text" className={`${searchShow?'block':'hidden'} border-0 outline-none focus:border-0 text-sm p-2 rounded-lg transition-all ease-in-out duration-2000`} autoFocus /><CiSearch/><span onClick={()=>{setSearchShow(!searchShow)}} >search</span></li>
          <li className=' hover:text-orange-500 font-bold'><NavLink to={"/"} >Home</NavLink></li>
          <li className=' hover:text-orange-500 font-bold hidden sm:block'><NavLink to={"/about"} >About Us</NavLink></li>
          <li className=' hover:text-orange-500 font-bold hidden sm:block'><NavLink to={"/contact"}>Contact Us</NavLink></li>
          <li className='flex justify-center items-center  hover:text-orange-500 font-bold'>
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
          {/* <li>Status {onlineStatus ? "✅" : "🔴"}</li> */}
          <button className='w-20 px-2 py-1 border rounded cursor-pointer transition-all ease-in-out text-slate-500 hidden sm:block' onClick={() => { btnName === "Login" ? setBtnName("Logout") : setBtnName("Login") }}>{btnName}</button>
        </ul>
      </div>
    </div>
  );
}

export default Header;
