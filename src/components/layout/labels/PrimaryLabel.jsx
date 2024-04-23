const PrimaryLabel = ({ children, refernce }) => {
  return (
    <label className="text-xl font-bold" htmlFor={refernce}>
      {children}
    </label>
  );
};

export default PrimaryLabel;
