import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
export const loginUser = (user, cb) => {
  return async (dispatch) => {
    dispatch(authActions.setLoading(true));
    request
      .post("/api/user/login",user)
      .then((res) => {
        
        dispatch(authActions.setError(null));
        dispatch(authActions.login(res.data));
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        toast.success(res.data.message);
        cb && cb()
      })
      .catch((err) => {
        console.log(err.response.data.message);
        dispatch(authActions.setError(err.response.data.message));
        dispatch(authActions.login(null));
      })
      .finally(() => dispatch(authActions.setLoading(false)));
  };
};

export const LogoutUser =(cb)=>{
    return async (dispatch)=>{
        dispatch(authActions.logout())
        localStorage.removeItem("userInfo");
        cb && cb()
    }
}
export const registerUser =(user,cb)=>{
  return async (dispatch)=>{
    dispatch(authActions.setLoading(true));
    request
    .post("/api/user/register",user)
    .then((res) => {
      console.log(res.data.message)
      dispatch(authActions.setError(null));
      toast.success(res.data.message);
      cb && cb()
    })
    .catch((err) => {
      console.log(err.response.data.message);
      dispatch(authActions.setError(err.response.data.message));
    })
    .finally(() => dispatch(authActions.setLoading(false)));
};
  }


  export const getusers = (resource="/api/user/all") => {
    return async (dispatch) => {
      dispatch(authActions.setLoading(true));
      dispatch(authActions.setError(null));
      dispatch(authActions.setUsers(null));
      await request
        .get(resource)
        .then((res) => {
          
          dispatch(authActions.setError(null));
          dispatch(authActions.setUsers(res.data));
        })
        .catch((err) => {
          console.log(err);
          dispatch(authActions.setLoading(false));
          dispatch(authActions.setError(err.message));
        })
        .finally(() => dispatch(authActions.setLoading(null)));
    };
  };
