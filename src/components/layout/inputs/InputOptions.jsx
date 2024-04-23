const InputOptions = ({ items, setItem, value, isDisabled, name }) => {
  return (
    <select
      onChange={
        name
          ? (e) => setItem(name, e.target.value)
          : (e) => setItem(e.target.value)
      }
      value={value}
      className="border rounded-lg block w-full p-2 my-2"
      disabled={isDisabled}
    >
      <option value="default" disabled>
        Please Select
      </option>
      {items.map((item, index) => (
        <option value={item.name} key={index}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default InputOptions;
