const InputObject = ({ element, objects }) => {
  return (
    <>
      <select
        name="objects"
        id={element.name}
        className="border rounded w-full my-2 p-2"
        required
        defaultValue={"default"}
      >
        <option disabled value={"default"}>
          Select an object...
        </option>
        {objects.map((object) => (
          <option value={object.id} key={object.id}>
            {object.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default InputObject;
