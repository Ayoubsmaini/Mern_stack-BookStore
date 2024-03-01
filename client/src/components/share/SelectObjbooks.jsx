import React, { useEffect, useState } from "react";

const SelectObjbooks
 = ({
  label,
  defaultValue,
  onchange,
  classLabel,
  options = [],
  titleOptions,
  field = null,
  classParent,
  className,
}) => {
  const [value, setValue] = useState(defaultValue);
  const handelChange = (e) => {
    setValue((prev) => e.target.value);
    field ? onchange(field, e.target.value) : onchange(e.target.value);
  };
  useEffect(() => {
    setValue((prev) => defaultValue);
    console.log(options)
  }, [defaultValue]);
  return (
    <div className={classParent}>
      {label && <label className={classLabel}>{label}</label>}
      <select name={field} id={field} onChange={handelChange} className={className} value={value}>
        <option value="">{titleOptions}</option>
        {options && options.length > 0 &&
          options.map((o) => <option value={o._id} key={o._id}>{o.title}</option>)}
      </select>
    </div>
  );
};

export default SelectObjbooks
;
