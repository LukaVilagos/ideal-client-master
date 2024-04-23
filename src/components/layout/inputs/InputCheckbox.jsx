const InputCheckbox = ({ name, onChange, labelText, value }) => {
  return (
    <div className="flex gap-8 my-2">
      <label htmlFor={name}>{labelText}</label>
      <input
        className=" accent-black"
        type="checkbox"
        name={name}
        checked={value}
        onChange={(e) => onChange(name, e.target.checked)}
      />
    </div>
  );
};

export default InputCheckbox;
