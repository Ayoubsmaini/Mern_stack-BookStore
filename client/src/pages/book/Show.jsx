import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ListBooks from "./shildren/ListBooks";
import SpinerBs from "../../components/share/SpinerBs";
import ErrorAlert from "../../components/share/ErrorAlert";
import { getBooks } from "../../redux/api/bookApiCall";

const Show = () => {
  const dispatch = useDispatch()
  const { books, error, loading } = useSelector((state) => state.book);
  const get=useCallback(()=>{
   dispatch(getBooks('/api/books')) 
  },[])
  useEffect(()=>{
    get()
  },[get])
  return (
    <div className="category-list w-100 h-100 p-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
        </div>

        <div>
          <Link className="btn-create btn btn-sm" to="/book/create">
            Create Book
          </Link>
        </div>
      </div>
      <div className="table-container py-3">
        {loading ? <SpinerBs /> : books && <ListBooks books={books} />}
        {error && <ErrorAlert error={error} />}
      </div>
    </div>
  );
};

export default Show;
