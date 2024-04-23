const InputPassword = ({ name, value, onChange, required }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      type={"password"}
      className="border rounded w-full p-2"
      name={name}
      required={required ? true : false}
    />
  );
};

export default InputPassword;
