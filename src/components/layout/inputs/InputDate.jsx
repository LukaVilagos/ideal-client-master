const InputDate = ({ name, onChange, value }) => {
  return (
    <input
      value={value}
      className="border rounded w-full my-2 p-2"
      type="date"
      name={name}
      onChange={(e) => onChange(name, e.target.value)}
    />
  );
};

export default InputDate;
