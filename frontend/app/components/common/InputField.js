import { useState } from "react";

const InputField = ({ className, label, placeholder, type, getInputValue }) => {
  
    const combinedClasses = `flex flex-col ${className}`;
    const [inputVal, setInputVal] = useState("");

  function handleValue(val) {
    setInputVal(val);
    getInputValue(val);
  }

  return (
    <div className={combinedClasses}>
      <label className="mb-1">{label}</label>
      <input
        className="rounded bg-white border-2 px-2"
        value={inputVal}
        onChange={(e) => handleValue(e.target.value)}
        placeholder={placeholder}
        type={type}
        required
      ></input>
    </div>
  );
};
export default InputField;
