const SelectElementOrientation = ({
  handleChangeInputOrientation,
  inputOrientation,
}) => {
  return (
    <select
      onChange={(event) => handleChangeInputOrientation(event.target.value)}
      className="border rounded-lg block w-full p-2 my-2"
      value={inputOrientation}
    >
      <option value="vertical">Vertical</option>
      <option value="horizontal">Horizontal</option>
    </select>
  );
};

export default SelectElementOrientation;
