import React, { useCallback, useEffect } from "react";
import SwipperContainer from "./shildren/SwiperContainer";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../../redux/api/apiCalls";
import { getBooks } from "../../redux/api/bookApiCall";

const Home = () => {
  const { categorys, loading, error, showTable } = useSelector(
    (state) => state.category
  );
  const { books } = useSelector(
    (state) => state.book
  );
  const dispatch = useDispatch();
  const getAll = useCallback(() => {
    dispatch(get("/api/categorys"));
   
  }, []);
  useEffect(() => {
    getAll(); 
    dispatch(getBooks('/api/books'))
  }, [getAll]);
  return (
    <div className="w-100 h-100 d-flex justify-content-start py-5 flex-column align-items-center">
  <div className="w-100 p-5 bg-light rounded-4">
 {books && categorys && <SwipperContainer categorys={categorys} books={books}/>}
  </div>

    </div>
  );
};

export default Home;
