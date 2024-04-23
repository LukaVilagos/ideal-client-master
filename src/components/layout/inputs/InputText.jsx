const InputText = ({
  name,
  value,
  onChange,
  required,
  placeholder,
  isDisabled,
}) => {
  return (
    <input
      disabled={isDisabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={"text"}
      className="rounded-full bg-gray-300 placeholder-gray-800 text-black w-full my-2 py-2 px-4"
      name={name}
      required={required ? true : false}
    />
  );
};

export default InputText;
