import React, { useCallback, useEffect, useState } from "react";
import Input from "../../components/share/Input";
import Btn from "../../components/share/Btn";
import { useDispatch, useSelector } from "react-redux";
import { get, getBiId, update } from "../../redux/api/apiCalls";
import { useNavigate, useParams } from "react-router-dom";
import SpinerBs from "../../components/share/SpinerBs";
import { isEmpty } from "../../utils/functions";
import ErrorAlert from "../../components/share/ErrorAlert";

const Edite = () => {
  const { category, loading, error } = useSelector((state) => state.category);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    color: "",
  });
  const { id } = useParams();
  const dispatch = useDispatch();
  const handelChange = (field, value) =>
    setFormData({ ...formData, [field]: value });
  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(update(`api/categorys/${id}`, formData, () => navigate(-1), true));
  };

  const getById = useCallback(() => {
    dispatch(getBiId(`/api/categorys/${id}`));
  }, [id]);
  useEffect(() => {
    getById();
  }, [getById]);
  useEffect(() => {
    if (category) {
      setFormData((prev) => ({
        name: category.name || "",
        color: category.color || "",
      }));
    }
  }, [category]);
  const desableBtn = () => {
    return isEmpty(formData?.color) || isEmpty(formData?.name);
  };
  const isValueEqual = (value1, value2) => value1 === value2;

  const areValuesEqual = (formData, category) => {
    return (
      isValueEqual(formData?.name, category?.name) &&
      isValueEqual(formData?.color, category?.color)
    );
  };

  const isInputChanged = (formData, category) => {
    return !category || !areValuesEqual(formData, category);
  };

  console.log(!isInputChanged(formData, category));
  return (
    <div className="category-create container w-100 h-100 ">
      <div className="d-flex justify-content-start align-items-center">
        <div>
          <h1>Category Edite </h1>
        </div>
      </div>
      {error && <ErrorAlert error={error}/>}
      <form
        onSubmit={handelSubmit}
        className="create-container w-100 h-100  d-flex justify-content-center align-items-center"
      >
        {loading ? (
          <SpinerBs />
        ) : (
          category && (
            <div className="create-window border rounded-2 bg-light d-flex flex-column justify-content-center align-items-start gap-3">
              <Input
                type="text"
                label="Name"
                classLabel="fw-bold text-black"
                classParent=" form-input d-flex flex-column gap-2 w-75 ms-5"
                className="form-control"
                placeholder=" Name Category"
                field="name"
                defaultValue={category.name}
                onchange={handelChange}
              />
              <Input
                label="Color"
                classLabel="fw-bold text-black"
                classParent=" form-input d-flex flex-column gap-2 ms-5 "
                type="color"
                field="color"
                defaultValue={category.color || "#000000"}
                onchange={handelChange}
              />
              <div className="w-75 d-flex justify-content-center mx-auto gap-5">
                <Btn
                  type="submit"
                  className="btn btn-success "
                  text="update"
                  oncklick={handelSubmit}
                  disabled={desableBtn() || !isInputChanged(formData, category)}
                />
                <Btn
                  type="button"
                  className="btn btn-danger  "
                  text="cancel"
                  oncklick={() => navigate(-1)}
                />
              </div>
            </div>
          )
        )}
      </form>
    </div>
  );
};

export default Edite;
