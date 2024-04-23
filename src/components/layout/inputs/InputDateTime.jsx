const InputDateTime = ({ name, onChange, value }) => {
  return (
    <input
      type="datetime-local"
      name={name}
      className="border rounded w-full my-2 p-2"
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
    />
  );
};

export default InputDateTime;
