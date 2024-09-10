import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtils'

// Get cart items from local storage if available
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Add to cart
      const item = action.payload
      const existItem = state.cartItems.find((x) => x._id === item._id)
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x,
        )
      } else {
        state.cartItems = [...state.cartItems, item]
      }

      return updateCart(state)
    },
    removeFromCart: (state, action) => {
      // Remove from cart
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)

      return updateCart(state)
    },
  },
})

// Export actions
export const { addToCart, removeFromCart } = cartSlice.actions

// Export reducer
export default cartSlice.reducer
