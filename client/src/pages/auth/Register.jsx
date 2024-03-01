import React, { useState } from 'react'
import Input from "../../components/share/Input";
import { MdOutlineMailOutline, MdLockOpen } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import Btn from "../../components/share/Btn";
import {Link, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { loginUser, registerUser } from "../../redux/api/authApiCalls";
import ErrorAlert from "../../components/share/ErrorAlert";
import SpinerBs from "../../components/share/SpinerBs";
import { ToastContainer } from "react-toastify";
const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "",user_name:"" });
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {error,loading} = useSelector(state=>state.auth)
  const handelChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));
  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(registerUser(formData,()=>navigate('/login')))
  };
  return (
    <div className="login d-flex justify-content-center align-items-start">
      <form
        onSubmit={handelSubmit}
        className="form-login d-flex align-items-center flex-column gap-3 bg-light text-dark p-3 rounded-2"
      >
        <h1 className="fw-bolder">
          {" "}
          <FaUserPlus />
          Register
        </h1>
        {error && <ErrorAlert error={error}/>}
        <Input
          field="user_name"
          classParent="bg-secondary d-flex justify-content-start align-items-center rounded p-1 fs-6 w-100"
          className="input-login text-light ps-2 w-100"
          placeholder="user name"
          defaultValue={formData.user_name}
          label={<FaRegUser size={35} />}
          onchange={handelChange}
          type="text"
        />
        <Input
          field="email"
          classParent="bg-secondary d-flex justify-content-start align-items-center rounded p-1 fs-6 w-100"
          className="input-login text-light ps-2 w-100"
          placeholder="email"
          defaultValue={formData.email}
          label={<MdOutlineMailOutline size={35} />}
          onchange={handelChange}
          type="email"
        />
        <Input
          field="password"
          classParent="bg-secondary d-flex justify-content-start align-items-center rounded p-1 fs-6 w-100"
          className="input-login text-light ps-2 w-100"
          placeholder="password"
          defaultValue={formData.password}
          label={<MdLockOpen size={35} />}
          onchange={handelChange}
          type="password"
        />
        <Btn text={loading ? <SpinerBs/> :"register"} className="btn-login fw-bolder w-100" type="submit" />
        <Link to="/login" className="btn-register">Have an account ? log in</Link>
      </form>
      <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          draggablePercent={60}
        />
    </div>)
}

export default Register