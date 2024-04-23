const InputTextDataList = ({ element, onChange, value }) => {
  return (
    <>
      <input
        name={element.report_template_element_name}
        type={"text"}
        list={element.report_template_element_id}
        onChange={(e) =>
          onChange(element.report_template_element_id, e.target.value)
        }
        className="border rounded w-full my-2 p-2"
        value={value}
      />
      <datalist id={element.report_template_element_id}>
        {element.report_template_element_options.map((option) => (
          <option value={option} key={option} />
        ))}
      </datalist>
    </>
  );
};

export default InputTextDataList;
