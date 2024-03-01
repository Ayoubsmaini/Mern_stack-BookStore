import React from "react";

const Btn = ({
  text,

  oncklick,
  className,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={oncklick}
      className={className}
      type={type}
    >
      {text && text}{" "}
    </button>
  );
};

export default Btn;
