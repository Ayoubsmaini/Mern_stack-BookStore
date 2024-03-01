import { toast } from "react-toastify";
import request from "../../utils/request";
import { bookActions } from "../slices/bookSlice";

export const getBooks = (resource) => {
  return async (dispatch) => {
    dispatch(bookActions.setLoading(true));
    dispatch(bookActions.setError(null));
    dispatch(bookActions.setBooks(null));
    await request
      .get(resource)
      .then((res) => {
        console.log(res)
        dispatch(bookActions.setError(null));
        dispatch(bookActions.setBooks(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(bookActions.setLoading(false));
        dispatch(bookActions.setError(err.message));
      })
      .finally(() => dispatch(bookActions.setLoading(null)));
  };
};

export const getBookById = (resource) => {
  return async (dispatch) => {
    dispatch(bookActions.setLoading(true));
    dispatch(bookActions.setBook(null));
    dispatch(bookActions.setError(null));
    await request
      .get(resource)
      .then((res) => {
        console.log(res.data);
        dispatch(bookActions.setError(null));
        dispatch(bookActions.setBook(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(bookActions.setBook(null));
        dispatch(bookActions.setLoading(false));
        dispatch(bookActions.setError(err.message));
      })
      .finally(() => dispatch(bookActions.setLoading(null)));
  };
};

export const createBook = (resource, data, cb) => {
  return async (dispatch) => {

    dispatch(bookActions.setError(null));
    await request
      .post(resource, data)
      .then((res) => {
        console.log(res.status)
        dispatch(bookActions.setError(null));
        dispatch(bookActions.addBook(res.data.book));
       toast.success(res.data.message);
        cb && cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch(bookActions.setLoading(false));
      
        toast.error(err.response.data.message);
      })
      .finally(() => dispatch(bookActions.setLoading(null)));
  };
};

export const removeBook = (resource, id) => {
  return async (dispatch) => {
    dispatch(bookActions.setError(null),);
    await request
      .delete(resource + "/" + id,{ headers: {
        token: `${JSON.parse(localStorage.getItem("userInfo")).token}`,
      }})
      .then((res) => {
        dispatch(bookActions.setError(null));
        dispatch(bookActions.removeBook(id));
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        dispatch(bookActions.setLoading(false));
      
        toast.error(err.response.data.message);
      })
      .finally(() => dispatch(bookActions.setLoading(null)));
  };
};

export const updateBook = (resource, data, cb) => {
  return async (dispatch) => {
    dispatch(bookActions.setError(null));
    await request
      .put(resource, data,{ headers: {
        token: `${JSON.parse(localStorage.getItem("userInfo")).token}`,
      }})
      .then((res) => {
        dispatch(bookActions.setError(null));
        toast.success(res.data.message);
        dispatch(bookActions.updateBook(res.data.book));
        cb && cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch(bookActions.setLoading(false));
       
        toast.error(err.response.data.message);
      })
      .finally(() => dispatch(bookActions.setLoading(null)));
  };
};
export const updateMenyBook = (resource, data, cb) => {
  dispatch(bookActions.setError(null));
  return async (dispatch) => {
    await request
      .put(resource, data,{ headers: {
        token: `${JSON.parse(localStorage.getItem("userInfo")).token}`,
      }})
      .then((res) => {
        dispatch(bookActions.setError(null));
        cb && cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch(bookActions.setLoading(false));
        
        toast.error(err.response.data.message);
      })
      .finally(() => dispatch(bookActions.setLoading(null)));
  };
};

