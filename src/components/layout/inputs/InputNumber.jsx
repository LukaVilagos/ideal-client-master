const InputNumber = ({
  name,
  placeholder,
  maxNumb,
  minNumb,
  onChange,
  value,
}) => {
  console.log(value);
  return (
    <input
      type="number"
      max={maxNumb}
      min={minNumb}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      className="border rounded w-full my-2 p-2"
    />
  );
};

export default InputNumber;
