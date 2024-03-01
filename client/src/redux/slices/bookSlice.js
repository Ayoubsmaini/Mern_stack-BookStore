import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: null,
    book: null,
    loading: false,
    error: null,
    deleteMessage: null,
    showTable: true,
  },
  reducers: {
    setBooks(state, action) {
      state.books = action.payload?.sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
    },
    setBook(state, action) {
      state.book = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setDeleteMessage(state, action) {
      state.deleteMessage = action.payload;
    },
    addBook(state, action) {
      state.books = [...state.books, action.payload].sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
    },
    removeBook(state, action) {
      state.books = state.books
        .filter((b) => b._id !== action.payload)
        .sort((a, b) => {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
    },
    updateBook(state, action) {
      state.books = state.books?.map((b) =>
        b._id === action.payload._id ? action.payload : b
      ).sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
    },
    setShowTable(state, action) {
      state.showTable = action.payload;
    },
  },
});

const bookActions = bookSlice.actions;
const bookReducer = bookSlice.reducer;

export { bookActions, bookReducer };
