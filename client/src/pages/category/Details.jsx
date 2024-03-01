import React, { useCallback, useEffect } from "react";
import Btn from "../../components/share/Btn";
import { BsEye, BsPencil, BsTrash3 } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBiId } from "../../redux/api/apiCalls";
import SpinerBs from "../../components/share/SpinerBs";
import ErrorAlert from "../../components/share/ErrorAlert";
import TableBooks from "./shildren/TableBooks";
import { getBooks } from "../../redux/api/bookApiCall";

const Details = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { category, loading, error } = useSelector((state) => state.category);
  const { books } = useSelector((state) => state.book);
  const getById = useCallback(() => {
    dispatch(getBooks(`/api/books/category/${id}`));
    dispatch(getBiId(`/api/categorys/${id}`));
  }, [id]);
  useEffect(() => {
    getById();
  }, []);
  return (
    <div className="category-list w-100 h-100 p-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          {loading && <SpinerBs />}
          {category && (
            <h1 className="d-flex align-items-center gap-2">
              {" "}
              <div
                style={{ backgroundColor: category.color }}
                className="square-color "
              ></div>
              {category.name}
            </h1>
          )}
        </div>

        <div>
          {loading && <SpinerBs />}
          {category && (
            <div className="d-flex align-items-center gap-1">
              {" "}
              <Link
                className="btn btn-outline-light btn-sm rounded-circle "
                to={`/category/edite/${id}`}
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
          category && books && <TableBooks category={category} books={books} id={id} />
        )}
        {error && <ErrorAlert error={error} />}
      </div>
    </div>
  );
};

export default Details;
