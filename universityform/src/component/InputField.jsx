// InputField.jsx
import React from "react";  

const InputField = ({ label, name, value, onChange,  onBlur , error, type = "text", ...props }) => {
  return (
    <div className="form-group">
      <label>{label}:</label>
      <input 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{ borderColor: error ? "red" : "black" }}
        {...props} // Spreads extra props like placeholder.
      />
      {error && <span style={{ color: "red", fontSize: "12px" }}>{error}</span>}
    </div>
  );
};

export default InputField;