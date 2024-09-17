import { useState } from "react";

const PasswordField = ({ label, placeholder, className, getPasswordVal }) => {
  const combinedClasses = `flex flex-col ${className}`;

  const [inputVal, setInputVal] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  function handleValue(val) {
    setInputVal(val);
    getPasswordVal(val);
  }

  return (
    <div className={combinedClasses}>
      <label className="mb-1">{label}</label>
      <div>
        <input
          className="rounded bg-white border-2 px-2 w-10/12"
          value={inputVal}
          onChange={(e) => handleValue(e.target.value)}
          placeholder={placeholder}
          type={passwordVisibility ? "text" : "password"}
        ></input>
        <button
          className="w-100 w-2/12"
          onClick={() => setPasswordVisibility(!passwordVisibility)}
        >
          {passwordVisibility ? "hide" : "show"}
        </button>
      </div>
    </div>
  );
};
export default PasswordField;
