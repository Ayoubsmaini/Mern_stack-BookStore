import React, { useState } from "react";
import SelectObj from "../../../components/share/SelectObj";
import Btn from "../../../components/share/Btn";
import SelectObjbooks from "../../../components/share/SelectObjbooks";

const SelectSection = ({ books, handelAdd, field }) => {
  const [bookSelected, setBookSelected] = useState("");

  const handelChange = (value) => {
    setBookSelected((prev) => value);
  };
  const handelSubmit = () => {
    if (bookSelected) {
      handelAdd(field, bookSelected);
    }
   
  };

  return (
    <div className="d-flex justify-content-start align-items-center gap-3 mt-3">
      <SelectObjbooks
        titleOptions="select products"
        className="form-select "
        classParent=""
        defaultValue={bookSelected}
        onchange={handelChange}
        options={books}
      />
      <Btn
        text="+"
        className="btn btn-primary btn-sm"
        oncklick={handelSubmit}
      />
    </div>
  );
};

export default SelectSection;
