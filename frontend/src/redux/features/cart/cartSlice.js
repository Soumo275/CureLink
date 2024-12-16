import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
    cartItems: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            
            if (!existingItem) {
                // If item does not exist, add it to the cart with a quantity of 1
                state.cartItems.push({ ...action.payload, quantity: 1 });
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product Added to the Cart",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                // If item exists, increase its quantity
                existingItem.quantity += 1;
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Quantity Increased to ${existingItem.quantity}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
        updateQuantity: (state, action) => {
            const { _id, quantity } = action.payload;
            const existingItem = state.cartItems.find(item => item._id === _id);
            if (existingItem && quantity >= 1) {
                // Update the quantity if it's greater than or equal to 1
                existingItem.quantity = quantity;
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Quantity updated to ${quantity}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Quantity cannot be less than 1",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }
});

// export the actions
export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
