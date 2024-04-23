const SelectSignaturePosition = ({
  handleChangeSignaturePosition,
  inputSignaturePosition,
  disabled,
}) => {
  return (
    <select
      onChange={(event) => handleChangeSignaturePosition(event.target.value)}
      className="border rounded-lg block w-full p-2 my-2"
      value={inputSignaturePosition}
      disabled={disabled}
    >
      <option value="left">Left</option>
      <option value="centre">Centre</option>
      <option value="right">Right</option>
    </select>
  );
};

export default SelectSignaturePosition;
