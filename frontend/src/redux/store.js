import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import itemsApi from './features/items/itemsApi'
import ordersApi from './features/orders/ordersApi'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemsApi.middleware, ordersApi.middleware),
})