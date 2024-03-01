import React, { useCallback, useEffect, useState } from "react";
import Input from "../../components/share/Input";
import SelectObj from "../../components/share/SelectObj";
import Textarea from "../../components/share/Textarea";
import { FcAddImage } from "react-icons/fc";
import Btn from "../../components/share/Btn";
import SpinerBs from "../../components/share/SpinerBs";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { get, getBiId, update } from "../../redux/api/apiCalls";

import NormalSelect from "../../components/share/NormalSelect";
import { formatImageName, returnDate } from "../../utils/functions";
import { getBookById, updateBook } from "../../redux/api/bookApiCall";
import { upload } from "../../redux/api/upload/useUpload";
import { deleteImage } from "../../redux/api/upload/useDelete";
const Edite = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categorys, category } = useSelector((state) => state.category);
  const { book, loading, error } = useSelector((state) => state.book);
  const [formData, setFormData] = useState({});
  const { id } = useParams();
  const getCategoryOption = useCallback(() => {
    dispatch(get("/api/categorys"));
  }, []);
  const getCategory = useCallback(() => {
    dispatch(getBiId(`/api/categorys/${book?.category}`));
  }, []);
  const getbookById = useCallback(() => {
    dispatch(getBookById(`/api/books/${id}`));
  }, [id]);
  useEffect(() => {
    getCategoryOption();
    getbookById();
  }, [id]);
  useEffect(() => {
    if (book) {
      getCategory();
    }
  }, [book?.category]);
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

  const handelChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    let BookId;
    if (book) {
      BookId = book?._id;
      delete formData?._id;
      delete formData.createdAt;
      delete formData.updatedAt;
    }

    console.log(formData);
    console.log(file);
    if (file) {
      deleteImage("/api/images/name", book.image);
      upload("/api/images", file);
    }
    dispatch(updateBook(`/api/books/${id}`, formData, () => navigate(-1)));
    console.log(BookId);

    if (category) {
      dispatch(
        update(`/api/categorys/${book.category}`, {
          books: [...category.books, BookId],
        })
      );
    }
  };

  useEffect(() => {
    if (file) {
      if (formData.title.length >= 3) {
        const imageName = formatImageName(formData.title, file.name);
        setFormData({ ...formData, image: imageName });
        const updatedFile = new File([file], imageName, { type: file.type });
        setFile(updatedFile);
      }
    }
  }, [formData?.title, file?.name]);
  useEffect(() => {
    setFormData(book);
  }, [id, book?._id]);
  console.log(book);
  return (
    <div className="category-create w-100 h-100 p-3">
      <div className="d-flex justify-content-start align-items-center">
        <h1>Edite Book </h1>
      </div>
      <div className="form-container container">
        <form className="bg-light row text-dark p-3" onSubmit={handelSubmit}>
          {loading && <SpinerBs />}
          {book && categorys && (
            <>
              <div className="image-create col-md-3 col-sm-12 ">
                <div className="h-100 d-flex justify-content-center align-items-center flex-column">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="image-upload"
                    />
                  ) : (
                    <img
                      src={`http://localhost:5000/api/images/name/${book.image}`}
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
                    defaultValue={book.title}
                    className="form-control"
                    classParent="my-2 w-50"
                    placeholder="Title ?"
                    classLabel="fw-semibold"
                    onchange={handelChange}
                  />
                  <Input
                    label="Author"
                    field="author"
                    defaultValue={book.author}
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
                    defaultValue={book.language}
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
                    defaultValue={book.category}
                    classParent="my-2"
                    titleOptions="No Category"
                    className="form-select"
                    classLabel="fw-semibold"
                    onchange={handelChange}
                    options={categorys}
                  />
                  <Input
                    label="Released"
                    field="dateReleased"
                    type="date"
                    defaultValue={returnDate(book.dateReleased)}
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
                    defaultValue={book.price}
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
                    defaultValue={book.numberOfPages}
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
                    defaultValue={book.summary}
                    classLabel="fw-semibold"
                    onchange={handelChange}
                  />
                </div>
              </div>
              <div className="col-12 my-2">
                <div className="d-flex justify-content-end  gap-5">
                  <Btn text="cancel" className="btn btn-danger" />
                  <Btn
                    text="update"
                    className="btn btn-success"
                    type="submit"
                  />
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Edite;
