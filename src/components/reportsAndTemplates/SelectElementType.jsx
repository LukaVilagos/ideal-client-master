const SelectElementType = ({ handleChangeInputType, inputType }) => {
  return (
    <select
      onChange={(event) => handleChangeInputType(event.target.value)}
      className="border rounded-lg block w-full p-2"
      value={
        inputType === "date" || inputType === "time" ? "date/time" : inputType
      }
    >
      <option value="text">Text</option>
      <option value="options">Options</option>
      <option value="number">Number</option>
      <option value="date/time">Date/Time</option>
      {/* <option value="images">Images</option> */}
      {/* <option value="object">Object</option>*/}
      <option value="signature">Signature</option>
    </select>
  );
};

export default SelectElementType;
