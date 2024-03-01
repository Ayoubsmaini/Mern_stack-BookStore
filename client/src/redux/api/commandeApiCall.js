import { toast } from "react-toastify";
import request from "../../utils/request";
import { commandeActions } from "../slices/commandeSlice";

export const getCommandes = (resource) => {
  return async (dispatch) => {
    dispatch(commandeActions.setLoading(true));
    dispatch(commandeActions.setError(null));
    dispatch(commandeActions.setCommandes(null));
    await request
      .get(resource)
      .then((res) => {
        console.log(res.data)
        dispatch(commandeActions.setError(null));
        dispatch(commandeActions.setCommandes(res.data));
      })
      .catch((err) => {
        dispatch(commandeActions.setLoading(false));
        dispatch(commandeActions.setError(err.message));
      })
      .finally(() => dispatch(commandeActions.setLoading(null)));
  };
};

export const getCommandeById = (resource,cb) => {
  return async (dispatch) => {

    dispatch(commandeActions.setLoading(true));
    dispatch(commandeActions.setCommande(null));
    dispatch(commandeActions.setError(null));
    await request
      .get(resource)
      .then((res) => {
        console.log(res.data)
        dispatch(commandeActions.setError(null));
        dispatch(commandeActions.setCommande(res.data));
        cb && cb(res.data)
      })
      .catch((err) => {
        dispatch(commandeActions.setCommande(null));
        dispatch(commandeActions.setLoading(false));
        dispatch(commandeActions.setError(err.message));
      })
      .finally(() => dispatch(commandeActions.setLoading(null)));
  };
};

export const createCommande = (resource, data, cb) => {
  return async (dispatch) => {
    dispatch(commandeActions.setError(null));
    await request
      .post(resource, data)
      .then((res) => {
        console.log(res.data)
        dispatch(commandeActions.setError(null));
        dispatch(commandeActions.addCommande(res.data.commande));
        toast.success(res.data.message);
        cb && cb();
      })
      .catch((err) => {
        console.log(err)
        dispatch(commandeActions.setLoading(false));
       
        toast.error(err.response.data.message);
      })
      .finally(() => dispatch(commandeActions.setLoading(null)));
  };
};

export const removeCommande = (resource, id) => {
  return async (dispatch) => {
    dispatch(commandeActions.setError(null));
    await request
      .delete(resource + "/" + id, { headers: {
        token: `${JSON.parse(localStorage.getItem("userInfo")).token}`,
      }},)
      .then((res) => {
        console.log(res.data)
        dispatch(commandeActions.setError(null));
        dispatch(commandeActions.removeCommande(id));
        toast.success(res.data.message);
      })
      .catch((err) => {
        dispatch(commandeActions.setLoading(false));
     
        toast.error(err.response.data.message);
      })
      .finally(() => dispatch(commandeActions.setLoading(null)));
  };
};

export const updateCommande = (resource, data, cb) => {
  return async (dispatch) => {
    dispatch(commandeActions.setError(null));
    await request
      .put(resource, data,{ headers: {
        token: `${JSON.parse(localStorage.getItem("userInfo")).token}`,
      }})
      .then((res) => {
        console.log(res.data)
        dispatch(commandeActions.setError(null));
        toast.success(res.data.message);
        dispatch(commandeActions.updateCommande(res.data.commande));
        cb && cb();
      })
      .catch((err) => {
        console.log(err)
        dispatch(commandeActions.setLoading(false));
 
        toast.error(err.response.data.message);
      })
      .finally(() => dispatch(commandeActions.setLoading(null)));
  };
};