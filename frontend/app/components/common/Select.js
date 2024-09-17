const Select = ({ label, options, onChange }) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue); // Pass the selected value to the parent
  };
  return (
    <select
      name="cars"
      id="cars"
      className="mx-5 bg-slate-50 px-3 py-2 rounded max-w-[250px]"
      onChange={handleChange}
    >
      <option value="">{label}</option>
      {options.map((el, index) => {
        return (
          <option key={index} value={el}>
            {el}
          </option>
        );
      })}
    </select>
  );
};
export default Select;
