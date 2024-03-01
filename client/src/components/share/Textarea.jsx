import React, { useEffect, useState } from "react";

const Textarea = ({
  field,
  classParent,
  className,
  label,
  classLabel,
  defaultValue,
  placeholder,
  onchange,
  rows, // added prop for rows
  cols, // added prop for cols
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (e) => {
    setValue(e.target.value);
    onchange(field, e.target.value);
  };

  return (
    <div className={classParent}>
      {label && (
        <label htmlFor={field} className={classLabel}>
          {label}
        </label>
      )}
      <textarea
        className={className}
        name={field}
        id={field}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows} // setting rows attribute
        cols={cols} // setting cols attribute
      />
    </div>
  );
};

export default Textarea;
