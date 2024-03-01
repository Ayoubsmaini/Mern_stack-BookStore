import React, { useCallback, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookById } from "../../redux/api/bookApiCall";
import SpinerBs from "../../components/share/SpinerBs";
import Btn from "../../components/share/Btn";
import { BsEye, BsPencil, BsTrash3 } from "react-icons/bs";
import ContainerDetails from "./shildren/ContainerDetails";
import { get } from "../../redux/api/apiCalls";
const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { book, loading, error } = useSelector((state) => state.book);
  const { categorys } = useSelector((state) => state.category);
  const getBook = useCallback(() => {
    dispatch(getBookById(`/api/books/${id}`));
    dispatch(get("/api/categorys"));
  }, [id]);
  useEffect(() => {
    getBook();
  }, []);
  return (
    <div className="category-list w-100 h-100 p-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          {loading && <SpinerBs />}
          {book && (
            <h1 className="d-flex align-items-center gap-2">
              <BsEye />
              Details Book
            </h1>
          )}
        </div>

        <div>
          {loading && <SpinerBs />}
          {book && (
            <div className="d-flex align-items-center gap-1">
              {" "}
              <Link
                className="btn btn-outline-light btn-sm rounded-circle "
                to={`/book/edite/${id}`}
              >
                <BsPencil />
              </Link>{" "}
              <Btn
                className="btn btn-outline-light btn-sm rounded-circle"
                text={<BsTrash3 />}
              />
            </div>
          )}
        </div>
      </div>
      <div className="table-container ">
        {loading ? (
          <SpinerBs />
        ) : (
          categorys &&
          book && <ContainerDetails categorys={categorys} book={book} />
        )}
        {error && <ErrorAlert error={error} />}
      </div>
    </div>
  );
};

export default Details;
