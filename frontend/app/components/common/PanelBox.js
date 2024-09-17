const PanelBox = ({ children, className }) => {
  const combinedClass = `bg-slate-50 rounded p-10 shadow ${className} lg:min-w-[450px] md:sm:min-w-[450px] sm:min-w-[300px]`;
  return <div className={combinedClass}>{children}</div>;
};
export default PanelBox;
