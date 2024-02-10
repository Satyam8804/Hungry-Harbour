import { createSlice } from "@reduxjs/toolkit";


const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    return serializedCart ? JSON.parse(serializedCart) : { items: [] };
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return { items: [] };
  }
};

// Function to save the cart state to localStorage
const saveCartToLocalStorage = (cartState) => {
  try {
    const serializedCart = JSON.stringify(cartState);
    localStorage.setItem("cart", serializedCart);
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const cartSlice = createSlice({
    name : 'cart',
    initialState :loadCartFromLocalStorage(),
    reducers :{
        addItems: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item?.card?.info?.id === newItem?.card?.info?.id );
      
            if (existingItem) {
              existingItem.quantity += 1;
            } else {
              state.items.push({ ...newItem, quantity: 1 });
            }
            saveCartToLocalStorage(state);
          },
          removeItem: (state, action) => {

            const itemToRemove = action.payload;
      
            const existingItem = state.items.find(item => item?.card?.info?.id  === itemToRemove?.card?.info?.id );
      
            if (existingItem) {
              if (existingItem.quantity > 1) {
                existingItem.quantity -= 1;
              } else {
                // If the item's quantity is 1 or less, remove the entire item from the cart
                state.items = state.items.filter(item => item?.card?.info?.id  !== itemToRemove?.card?.info?.id );
              }
            }
            saveCartToLocalStorage(state);
          },
        clearCart:(state)=>{
            state.items.length=0;
            localStorage.removeItem('cart');
        }
    }
})
export const {addItems,removeItem,clearCart} = cartSlice.actions;
export default cartSlice.reducer;