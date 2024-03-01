import React, { useEffect } from "react";
import { BsAward, BsBook, BsPencil, BsTrash3 } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Btn from "../../../components/share/Btn";
import { categoryActions } from "../../../redux/slices/categorySlice";
import swal from "sweetalert";
import { remove } from "../../../redux/api/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, updateMenyBook } from "../../../redux/api/bookApiCall";
import { getNumberOfBooks } from "../../../utils/functions";
const ListCardsCategory = ({ categorys }) => {
  const { deleteMessage } = useSelector((state) => state.category);
  const { books } = useSelector((state) => state.book);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    dispatch(getBooks('/api/books'))
  },[])
  const handelDelet = (e, id) => {
    // dispatch(remove("/api/categorys",id))
    e.stopPropagation();
    e.preventDefault();
    dispatch(
      categoryActions.seytdeleteMessage({
        message: " Are you sure you want to remove this category ? ",
        id,
      })
    );
  };
  if (deleteMessage) {
    swal({
      title: deleteMessage.message,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(categoryActions.seytdeleteMessage(null));
        dispatch(remove("/api/categorys", deleteMessage.id));
        dispatch(updateMenyBook(`/api/books/updateMany/${deleteMessage.id}`,{category:""}))
      }
      dispatch(categoryActions.seytdeleteMessage(null));
    });
  }
  const navigateToDetails = (e, id) => {
    e.stopPropagation();
    navigate(`/category/details/${id}`);
  };
  return (
    <div className="container">
      <div className="row py-2">
        {categorys.length > 0 ? (
          categorys.map((c) => (
            <div className="col-md-3 col-sm-6 col-xs-12 my-2" key={c._id}>
              <div
                className="card "
                onClick={(e) => navigateToDetails(e, c._id)}
              >
                <div className="actions d-flex justify-content-between p-1">
                  <div className="count-book fw-bold text-end mb-2">
                    <span className="fs-4 d-flex align-items-center gap-2">{getNumberOfBooks(books,c._id)} <BsBook size={25} /></span>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <Link
                      className="btn btn-outline-dark btn-sm rounded-circle "
                      to={`/category/edite/${c._id}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <BsPencil className="fw-bolder" />
                    </Link>
                    <Btn
                      text={<BsTrash3 className="fw-bolder" />}
                      oncklick={(e) => handelDelet(e, c._id)}
                      className="btn btn-outline-dark btn-sm rounded-circle "
                    />
                  </div>
                </div>
                <div className="img1">
                  <div
                    className="image-1"
                    style={{ backgroundColor: c.color }}
                  ></div>
                </div>
                <div className="img2">
                  <div className="image-2 d-flex justify-content-center align-items-center">
                    <BsAward color="" size={70} />
                  </div>{" "}
                  <div className="main-text ">
                    <h2>{c.name}</h2>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>empty</div>
        )}
      </div>
    </div>
  );
};

export default ListCardsCategory;
