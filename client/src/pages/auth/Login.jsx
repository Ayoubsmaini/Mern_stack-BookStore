import React, { useState } from "react";
import Input from "../../components/share/Input";
import { MdOutlineMailOutline, MdLockOpen } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import Btn from "../../components/share/Btn";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/api/authApiCalls";
import ErrorAlert from "../../components/share/ErrorAlert";
import SpinerBs from "../../components/share/SpinerBs";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);

  const handelChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData, () => navigate("/")));
  };

  return (
    <div className="d-flex justify-content-around m-3">
      <div>
        <img
          src="/src/assets/image/1.png"
          className="imag-logo "
          alt="logo"
        />
      </div>
      <div className="login-card d-flex justify-content-center align-items-start">
        <form
          onSubmit={handelSubmit}
          className="form-login d-flex align-items-center flex-column gap-3 bg-light text-dark p-5 rounded-4"
        >
          <div className="nav-logo d-flex align-items-center">
            <h2 className="text-primary">Login</h2>
          </div>
          {error && <ErrorAlert error={error} />}
          <Input
            field="email"
            classParent="border border-2 d-flex justify-content-start align-items-center rounded p-1 fs-6 w-100"
            className="input-login text-dark ps-2 w-100"
            placeholder="email"
            defaultValue={formData.email}
            onchange={handelChange}
            type="email"
          />
          <Input
            field="password"
            classParent="border border-2 d-flex justify-content-start align-items-center rounded p-1 fs-6 w-100"
            className="input-login text-dark ps-2 w-100"
            placeholder="password"
            defaultValue={formData.password}
            onchange={handelChange}
            type="password"
          />
          <Btn
            text={loading ? <SpinerBs /> : "login"}
            className="btn-login btn bg-primary fw-bolder w-100"
            type="submit"
          />
          <Link to="/register" className="btn-register">
            create acount
          </Link>
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
      </div>
    </div>
  );
};

export default Login;
