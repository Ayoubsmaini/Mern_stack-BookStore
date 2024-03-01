import React, { useEffect, useState } from "react";

const Select = ({
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
    onchange(e.target.value);
  };
  useEffect(() => {
    setValue((prev) => defaultValue);
  }, [defaultValue]);
  return (
    <div className={classParent}>
      {label && <label className={classLabel}>{label}</label>}
      <select
        name={field}
        id={field}
        onChange={handelChange}
        className={className}
      >
        <option value="">{titleOptions}</option>
        {options.length > 0 &&
          options.map((o) => <option value={o.value} key={o.value} >{o.e}</option>)}
      </select>
    </div>
  );
};

export default Select;
