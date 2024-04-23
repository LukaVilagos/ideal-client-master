const InputTextField = ({ placeholder }) => {
  return (
    <textarea
      placeholder={placeholder}
      rows={5}
      cols={87}
      className=" resize-none rounded border p-2"
      maxLength={3000}
    ></textarea>
  );
};

export default InputTextField;
