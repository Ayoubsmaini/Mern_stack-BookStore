import React, { useCallback, useEffect, useState } from "react";
import Input from "../../components/share/Input";
import SelectObj from "../../components/share/SelectObj";
import Textarea from "../../components/share/Textarea";
import { FcAddImage } from "react-icons/fc";
import Btn from "../../components/share/Btn";
import { useDispatch, useSelector } from "react-redux";
import {Navigate, useNavigate} from 'react-router-dom'
import { get, update } from "../../redux/api/apiCalls";

import NormalSelect from "../../components/share/NormalSelect";
import { formatImageName } from "../../utils/functions";
import { createBook, getBooks } from "../../redux/api/bookApiCall";
import { upload } from "../../redux/api/upload/useUpload";
const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categorys } = useSelector((state) => state.category);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: 0,
    category: "",
    dateReleased: "",
    numberOfPages: 0,
    language: "",
    summary: "",
    image: "",
    sizeInMB: 0,
  });
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const handelFileChange = (value) => {
    if (value) {
      setFile(value);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(value);
    } else {
      setFile(null);
      setImagePreview(null);
    }
  };
  const languages = [
    "English",
    "Chinese (Mandarin)",
    "Hindi",
    "Spanish",
    "French",
    "Arabic",
    "Russian",
    "Portuguese",
    "Bengali",
    "Urdu",
  ];

  const handelChange = async(field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(file);
    if(file){
       
    upload("/api/images",file)
    }
   
    dispatch(createBook("/api/books",formData ,()=>navigate(-1)))
  };
  const getCategoryOption = useCallback(() => {
    dispatch(get("/api/categorys"));
    dispatch(getBooks('/api/books'))
  }, []);
  useEffect(() => {
    getCategoryOption();
  }, []);
  useEffect(() => {
    
    if (file) {
      const imageName = formatImageName(formData.title, file.name); 
    setFormData({ ...formData, image: imageName });
      const updatedFile = new File([file], imageName, { type: file.type });
      setFile(updatedFile);
    }
  }, [formData.title,file?.name]);
  return (
    <div className="category-create w-100 h-100 p-3">
      <div className="d-flex justify-content-start align-items-center">
        <h2 className="text-primary">New Book </h2>
      </div>
      <div className="form-container container">
        <form className="bg-light row text-dark p-3" onSubmit={handelSubmit}>
          <div className="image-create col-md-3 col-sm-12 ">
            <div className="h-100 d-flex justify-content-center align-items-center flex-column">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="image-upload"
                />
              )}
              <label htmlFor="image" className="pointer">
                {" "}
                <div className=" mx-auto d-flex flex-column align-items-center">
                  <FcAddImage size={50} />{" "}
                  <div className="fw-semibold">Choose an image</div>
                </div>
              </label>
              <input
                type="file"
                id="image"
                style={{ display: "none" }}
                onChange={(e) => handelFileChange(e.target.files[0])}
              />
            </div>
          </div>
          <div className="inputs-create col-md-9 col-sm-12 ">
            <div className="d-flex gap-3">
              <Input
                label="Title"
                field="title"
                defaultValue={formData.title}
                className="form-control"
                classParent="my-2 w-50"
                placeholder="Title ?"
                classLabel="fw-semibold"
                onchange={handelChange}
              />
              <Input
                label="Author"
                field="author"
                defaultValue={formData.author}
                className="form-control"
                classParent="my-2"
                placeholder="Author ?"
                classLabel="fw-semibold"
                onchange={handelChange}
              />
            </div>

            <div className="d-flex gap-3">
              <NormalSelect
                label="Language"
                field="language"
                defaultValue={formData.language}
                classParent="my-2"
                titleOptions="Language"
                className="form-select"
                classLabel="fw-semibold"
                onchange={handelChange}
                options={languages}
              />

              <SelectObj
                label="Category"
                field="category"
                defaultValue={formData.category}
                classParent="my-2"
                titleOptions="No category"
                className="form-select"
                classLabel="fw-semibold"
                onchange={handelChange}
                options={categorys}
              />
              <Input
                label="Released"
                field="dateReleased"
                type="date"
                defaultValue={formData.dateReleased}
                className="form-control"
                classParent="my-2"
                classLabel="fw-semibold"
                onchange={handelChange}
              />
            </div>
            <div className="d-flex gap-3">
              <Input
                label="Price"
                field="price"
                defaultValue={formData.price}
                className="form-control"
                classParent="my-2"
                type="number"
                placeholder="pages ? ?"
                classLabel="fw-semibold"
                onchange={handelChange}
              />

              <Input
                label="Pages"
                field="numberOfPages"
                defaultValue={formData.numberOfPages}
                className="form-control"
                classParent="my-2"
                type="number"
                classLabel="fw-semibold"
                onchange={handelChange}
              />
            </div>
            <div className="">
              <Textarea
                label="Summary"
                className="form-control"
                classParent="my-2"
                placeholder="Summary"
                field="summary"
                defaultValue={formData.summary}
                classLabel="fw-semibold"
                onchange={handelChange}
              />
            </div>
          </div>
          <div className="col-12 my-2">
            <div className="d-flex justify-content-end  gap-3">
              <Btn text="cancel" className="btn btn-dark" />
              <Btn text="create" className="btn btn-primary" type="submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
