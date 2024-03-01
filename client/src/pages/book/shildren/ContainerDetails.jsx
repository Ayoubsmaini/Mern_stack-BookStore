import React from "react";
import { FaPenFancy } from "react-icons/fa";
const ContainerDetails = ({ book,categorys }) => {
  return (
    <div className="row bg-light p-5 text-dark ">
      <div className="col-md-2">
        <img
          src={`http://localhost:5000/api/images/name/${book.image}`}
          className="image-details"
          alt=""
        />
      </div>
      <div className="col-md-10 ">
        <div className="h-100 w-100 p-5 d-flex flex-column ">
          <h2 className="fw-bolder text-primary">{book.title}</h2>
          <div className="d-flex">
            
           <strong> Author : </strong>
            <p>  { book.author }  </p>
          </div>
          <div className="d-flex">
            
            <strong>Summary : </strong>
            <p> { book.summary } </p>
          </div>
          <div className="d-flex">
            
            <strong>Price : </strong>
            <p> { book.price } MAD</p>
          </div>
          <div className="d-flex">
            
            <strong>Category : </strong>
            <p className="d-flex align-items-center ps-2 gap-2">  <div
                style={{ backgroundColor: getCategory(categorys,book.category)?.color }}
                className="square-color "
              ></div> { getCategory(categorys,book.category)?.name } </p>
          </div>
          <div className="d-flex justify-content-between align-items-center"></div>
        </div>
      </div>
    </div>
  );
};

export default ContainerDetails;

const getCategory =(categorys,id)=>{
return categorys.find(c=>c._id===id)
}
