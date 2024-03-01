import React from "react";
import { BsEye, BsPencil} from "react-icons/bs";
import{BiAlarm}  from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { remove } from "../../../redux/api/apiCalls";
import Btn from "../../../components/share/Btn";
import { categoryActions } from "../../../redux/slices/categorySlice";
import swal from "sweetalert"
import { updateBook, updateMenyBook } from "../../../redux/api/bookApiCall";
const TableCategory = ({ categorys }) => {
  const {deleteMessage} = useSelector(state=>state.category)
  const dispatch = useDispatch();
  const handelDelet = (id) => {
    // dispatch(remove("/api/categorys",id))
    dispatch(categoryActions.seytdeleteMessage({message:" Are you sure you want to remove this category ? ",id}))
   };
   if(deleteMessage){
    swal({
      title: deleteMessage.message,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(categoryActions.seytdeleteMessage(null));
        dispatch(remove("/api/categorys",deleteMessage.id))
        dispatch(updateMenyBook(`/api/books/updateMany/${deleteMessage.id}`,{category:""}))
      }
      dispatch(categoryActions.seytdeleteMessage(null));
    });
   }
  return (
    <table className="table table-hover">
      <thead>
        <tr className="table-primary">
          <th>#</th>
          <th>Name</th>
          <th>Color</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {categorys.length > 0 ? (
          categorys.map((c,i) => (
            <tr key={c._id}>
              <td>{i}</td>
              <td>{c.name}</td>
              <td>
                <div
                  className="square-color ms-2"
                  style={{ backgroundColor: c.color }}
                ></div>
              </td>
              <td>
                <div className="w-100 d-flex justify-content-center align-items-center gap-2 pe-2">
                  <Link
                    className="btn btn-outline-primary btn-sm rounded-circle "
                    to={`/category/details/${c._id}`}
                  >
                    <BsEye />
                  </Link>
                  <Link
                    className="btn btn-outline-warning btn-sm rounded-circle "
                    to={`/category/edite/${c._id}`}
                  >
                    <BsPencil />
                  </Link>
                  <Btn
                    text={<MdDelete />}
                    oncklick={(e) => handelDelet(c._id)}
                    className="btn btn-outline-danger btn-sm rounded-circle "
                  />
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}> no category her</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableCategory;
