import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import CartItems from "./CartItems";
import { clearCart } from "../utils/Slices/cartSlice";
import emptyCart from '../Assets/emptyCart.png'
import { Link } from "react-router-dom";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const cart = useSelector((store) => store.cart.items);

  const dispatch = useDispatch()

  useEffect(() => {
    if(cart !== null){
      setCartItems(cart);
    }
  }, [cart]);

  console.log(cartItems)

  const handleClearCart =()=>{
      dispatch(clearCart(cart))
  }


  return cartItems?.length === 0 ? (
    <div className="w-full h-[100vh] flex justify-center bg-[#e9ecee]">
        <div className="mt-2 w-[70%] flex flex-col  items-center p-4 h-auto gap-4">
        <img src={emptyCart} alt="empty" className="h-80 w-100"/>
        <span className="font-bold text-xl">Your cart is empty</span>
        <span className="text-sm">You can go to home page to view more restaurants</span>
        <Link to={'/'}>
        <button className="text-sm text-white font-bold  bg-green-500 rounded-md p-2 px-4 shadow-lg  border-gray-500 uppercase">
         See Restaurant Near You 
        </button>
        </Link>
        </div>
    </div>
  ):(
    <div className="w-full h-[100vh] flex justify-center bg-[#e9ecee]">
      <div className="mt-2 w-[70%] flex flex-col  items-center bg-white p-4 h-auto gap-4">
        <span className="font-bold text-xl p-4 mb-4 border-b-8 w-full text-center">
          Checkout
        </span>
        {cartItems !== null &&
          cartItems.map((item) => (
            <CartItems item={item} key={item?.card?.info?.id}  />
          ))}

        <button className="text-sm text-white font-bold  bg-green-500 rounded-md p-2 px-4 shadow-lg  border-gray-500"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
