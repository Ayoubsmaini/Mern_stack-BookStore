import React, { useEffect, useState } from "react";

const Input = ({
  field,
  classParent,
  className,
  label,
  classLabel,
  defaultValue,
  placeholder,
  onchange,
  type = "text",
}) => {
  const [Value, setValue] = useState(defaultValue);
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  const handelChange = (e) => {
    setValue((prev) => e.target.value);
    onchange(field, e.target.value);
  };
  return (
    <div className={classParent}>
      {label && (
        <label htmlFor={field} className={classLabel}>
          {label}
        </label>
      )}
      <input
        className={className}
        type={type}
        name={field}
        id={field}
        value={Value}
        onChange={handelChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
