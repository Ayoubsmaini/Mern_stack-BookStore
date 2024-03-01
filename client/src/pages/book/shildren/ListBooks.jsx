import React, { useState } from 'react'
import Card from '../../../components/share/Card'
import Select from '../../../components/share/Select'
import Input from '../../../components/share/Input'

const ListBooks = ({books}) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(1000);
    const prices = Array.from({ length: 11 }, (_, index) => index * 10).map(
      (value) => ({ value, e: value + " >" })
    );
    const booksFilter = books
      .filter((e) => e.title.toUpperCase().includes(title.toUpperCase()))
      .filter((e) => e.price <= price);
    const handelInputChange = (field, value) => {
      setTitle((prev) => value);
    };
    const handelSelectChange = (value) => {
      setPrice(value);
    };

  return (
    <div className="w-100 bg-light text-dark p-3 rounded-2">
    <div className="d-flex justify-content-between align-items-center">
      <h2>Books List</h2>
      <div className="d-flex align-items-center gap-2">
        <Input
          classParent=""
          className="form-control"
          placeholder="Title"
          defaultValue={title}
          onchange={handelInputChange}
        />
        <Select
          className="form-select"
          titleOptions="price"
          options={prices}
          defaultValue=""
          onchange={handelSelectChange}
        />
      </div>
    </div>
    <div className="cards-container my-3">
      <div className="row">
        { booksFilter.length === 0 ? (
          <div className="col-12 text-center ">
            <div className="fw-bolder">There are no books !</div>
          </div>
        ) : (
           booksFilter.map((b) => (
            <div className="col-md-3 col-sm-4 col-xs-6" key={b._id}>
              <Card book={b} />
            </div>
          ))
        )}
      </div>
    </div>
  </div>
  )
}

export default ListBooks