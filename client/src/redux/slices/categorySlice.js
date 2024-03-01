import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categorys: null,
    category: null,
    loading: false,
    error: null,
    deleteMessage: null,
    showTable: true,
  },
  reducers: {
    setCategorys(state, action) {
      state.categorys = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    seytdeleteMessage(state, action) {
      state.deleteMessage = action.payload;
    },
    addCategory(state, action) {
      state.categorys = [...state.categorys, action.payload].sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
    },
    removeCategory(state, action) {
      state.categorys = state.categorys
        .filter((c) => c._id !== action.payload)
        .sort((a, b) => {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
    },
    updateCategory(state, action) {
      state.categorys = state.categorys
        ?.map((c) => (c._id === action.payload._id ? action.payload : c))
        .sort((a, b) => {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
    },
    setShowTable(state, action) {
      state.showTable = action.payload;
    },
  },
});
const categoryActions = categorySlice.actions;
const categoryReducer = categorySlice.reducer;
export { categoryActions, categoryReducer };
