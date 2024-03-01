import React from "react";

import { returnDate } from "../../utils/functions";

const CardBookCommandeDetails = ({ book }) => {
  return (
    <div className="card-book border rounded-2 my-2 p-1 text-center">
      <div className="badge bg-danger">
        {" "}
        {book.price === 0 ? (
          <span className="text-info">FREE</span>
        ) : (
          book.price + "$"
        )}{" "}
      </div>

      <div className="card-image-container my-2">
        <img
          src={
            book.image
              ? "http://localhost:5000/api/images/name/" + book.image
              : "/book.jpg"
          }
          className="card-image rounded"
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-autor fs-6">{book.author} </p>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-end p-2 rounded-pill">
        <div className="card-year fs-6 fw-bolder">
          {returnDate(book.dateReleased)}{" "}
        </div>
        <div className="card-action  d-flex justify-content-center align-items-end gap-2">
        
        </div>
      </div>
    </div>
  );
};

export default CardBookCommandeDetails;
