import { createSlice } from "@reduxjs/toolkit";

const commandeslice = createSlice({
  name: "commande",
  initialState: {
    commandes: null,
    commande: null,
    loading: false,
    error: null,
    deleteMessage: null,
  },
  reducers: {
    setCommandes(state, action) {
      state.commandes = action.payload?.sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
    },
    setCommande(state, action) {
      state.commande = action.payload;
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
    addCommande(state, action) {
      state.commandes = [...state.commandes, action.payload].sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
    },
    removeCommande(state, action) {
      state.commandes = state.commandes
        .filter((b) => b._id !== action.payload)
        .sort((a, b) => {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
    },
    updateCommande(state, action) {
      state.commandes = state.commandes
        ?.map((b) => (b._id === action.payload._id ? action.payload : b))
        .sort((a, b) => {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
    },
  },
});

const commandeActions = commandeslice.actions;
const commandeReducer = commandeslice.reducer;

export { commandeActions, commandeReducer };
