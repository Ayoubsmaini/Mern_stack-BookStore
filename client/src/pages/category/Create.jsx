import React, { useState } from "react";
import Input from "../../components/share/Input";
import Btn from "../../components/share/Btn";
import { useDispatch } from "react-redux";
import { create } from "../../redux/api/apiCalls";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const [formData, setFormData] = useState({
    name: "",
    color: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelChange = (field, value) =>
    setFormData({ ...formData, [field]: value });
  const handelSybmit = (e) => {
    e.preventDefault();
    dispatch(create("/api/categorys", formData, () => navigate("/category")));
  };
  return (
    <div className="category-create  w-100 h-100 p-3 ">
      <div className="d-flex justify-content-start align-items-center">
        <div>
          <h1>Category Create </h1>
        </div>
      </div>
      <form
        onSubmit={handelSybmit}
        className="create-container w-100 h-100  d-flex justify-content-center align-items-center"
      >
        <div className="create-window border rounded-2 bg-light d-flex flex-column justify-content-center align-items-start gap-3">
          <Input
            type="text"
            label="Name"
            classLabel="fw-bold text-black"
            classParent=" form-input d-flex flex-column gap-2 w-75 ms-5"
            className="form-control"
            placeholder=" Name Category"
            field="name"
            defaultValue={formData.name}
            onchange={handelChange}
          />
         
          <Input
            label="Color"
            classLabel="fw-bold text-black"
            classParent=" form-input d-flex flex-column gap-2 ms-5 "
            type="color"
            field="color"
            defaultValue={formData.color || "#000000"}
            onchange={handelChange}
          />
          <Btn
            type="submit"
            className="btn btn-success mx-auto w-75"
            text="create"
            oncklick={handelSybmit}
          />
        </div>
      </form>
    </div>
  );
};

export default Create;
