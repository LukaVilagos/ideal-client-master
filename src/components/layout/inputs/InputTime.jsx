const InputTime = ({ name, onChange, value }) => {
  return (
    <input
      className="border rounded w-full my-2 p-2"
      type="time"
      value={value}
      name={name}
      onChange={(e) => onChange(name, e.target.value)}
    />
  );
};

export default InputTime;
