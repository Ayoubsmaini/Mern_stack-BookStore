import { configureStore } from "@reduxjs/toolkit";
import { categoryReducer } from "./slices/categorySlice";
import { bookReducer } from "./slices/bookSlice";
import { commandeReducer } from "./slices/commandeSlice";
import { authReducer } from "./slices/authSlice";
const store = configureStore({
  reducer: {
    category: categoryReducer,
    book: bookReducer,
    commande: commandeReducer,
    auth: authReducer,
  },
});
export default store;
