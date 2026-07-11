import React from "react";

const Button = ({ text, type = "button" }) => {
  return (
    <button
      type={type}
      className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
    >
      {text}
    </button>
  );
};

export default Button;