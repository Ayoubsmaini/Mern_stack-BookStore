import React from "react";
import { BsPencil, BsStarFill, BsTrash3 } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Btn from "./Btn";
import { returnDate } from "../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { removeBook } from "../../redux/api/bookApiCall";
import { bookActions } from "../../redux/slices/bookSlice";
import swal from "sweetalert";
import { deleteImage } from "../../redux/api/upload/useDelete";


const Card = ({ book }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
 const{deleteMessage} = useSelector(state=>state.book)
  const handelDelete = (e,id,image) => {
    e.stopPropagation();
    // dispatch(remove("/api/categorys",id))
    dispatch(bookActions.setDeleteMessage({message:" Are you sure you want to remove this Book ? ",id,image}))
   };
   if(deleteMessage){
    swal({
      title: deleteMessage.message,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(removeBook("/api/books",deleteMessage.id))
        deleteImage("/api/images/name",deleteMessage.image)
        dispatch(bookActions.setDeleteMessage(null));
      }
      dispatch(bookActions.setDeleteMessage(null));
    });
   }
   const navigateToDetails = (e, id) => {
    e.stopPropagation();
    navigate(`/book/details/${id}`);
  };
  return (
    <div className="card-book bg-white border rounded-2 my-2 p-1 text-center" onClick={e=>navigateToDetails(e,book._id)}>
      <div className="badge bg-primary">
        {" "}
        {book.price === 0 ? <span className="text-info">FREE</span> : book.price + "Dh"}{" "}
      </div>
      
      <div className="card-image-container my-2">
        <img src={book.image ? ("http://localhost:5000/api/images/name/"+book.image):("/book.jpg")} className="card-image rounded" />
      </div>
      <div className="card-body">
        <h5 className="card-title text-primary">{book.title}</h5>
        <p className="card-autor fs-6">{book.author} </p>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-end p-2 rounded-pill">
        <div className="card-year text-secondary fs-6 fw-bolder">
          {returnDate(book.dateReleased)}{" "}
        </div>
        <div className="card-action  d-flex justify-content-center align-items-end gap-2">
          {" "}
          <Link
            className="btn btn-outline-warning btn-sm rounded-circle "
            onClick={e=>e.stopPropagation()}
            to={`/book/edite/${book._id}`}
          >
            <BsPencil />
          </Link>
          <Btn
            text={<BsTrash3 />}
            oncklick={(e) => handelDelete(e,book._id,book.image)}
            className="btn btn-outline-danger btn-sm rounded-circle "
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
