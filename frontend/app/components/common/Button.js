const Button = ({ label, className, onClick, disabled }) => {
  const combinedClasses = `bg-black text-white py-2 px-6 rounded ${className} hover:bg-slate-700 disabled:opacity-75`;

  return (
    <button
      disabled={disabled}
      className={combinedClasses}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
export default Button;
