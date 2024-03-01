import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get } from "../../redux/api/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import TableCategory from "./shildren/TableCategory";
import SpinerBs from "../../components/share/SpinerBs";
import ErrorAlert from "../../components/share/ErrorAlert";
import { BsListUl } from "react-icons/bs";
import { GrApps } from "react-icons/gr";
import Btn from "../../components/share/Btn";
import ListCardsCategory from "./shildren/ListCardsCategory";
import { categoryActions } from "../../redux/slices/categorySlice";
const Show = () => {
  // const [showTable, setShowTable] = useState(true);
  const { categorys, loading, error, showTable } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();
  const getAll = useCallback(() => {
    dispatch(get("/api/categorys"));
  }, []);
  useEffect(() => {
    getAll();
  }, [getAll]);

  return (
    <div className="category-list w-100 h-100 p-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2>Category List </h2>
        </div>
        <div className="toggle-display bg-primary-subtle rounded-pill py-1 px-3 d-flex gap-2 btn btn-sm">
          <Btn
            text={<BsListUl size={20} />}
            className={
              showTable ? "btn btn-dark btn-sm" : "btn btn-light btn-sm"
            }
            oncklick={(e) => dispatch(categoryActions.setShowTable(true))}
          />
          <Btn
            text={<GrApps size={20} />}
            className={
              showTable ? "btn btn-light btn-sm " : "btn btn-dark btn-sm "
            }
            oncklick={(e) => dispatch(categoryActions.setShowTable(false))}
          />
        </div>
        <div>
          <Link className="btn-create btn bg-primary text-hover text-light btn btn-sm" to="/category/create">
            Create Category
          </Link>
        </div>
      </div>
      <div className="table-container mt-5 ">
        {loading ? (
          <SpinerBs />
        ) : (
          categorys &&
          (showTable ? (
            <TableCategory categorys={categorys} />
          ) : (
            <ListCardsCategory categorys={categorys} />
          ))
        )}
        {error && <ErrorAlert error={error} />}
      </div>
    </div>
  );
};

export default Show;
