const InputImages = ({ handleFileChange, name }) => {
  return (
    <input
      type="file"
      accept="image/png, image/gif, image/jpeg"
      onChange={handleFileChange}
      name={name}
      multiple
      className="border rounded w-full my-2 p-2"
    />
  );
};

export default InputImages;
