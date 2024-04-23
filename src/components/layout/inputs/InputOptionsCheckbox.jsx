import { useEffect, useState } from "react";

const InputOptionsCheckbox = ({ options, onChange, name, value }) => {
  const [checkedOptions, setCheckedOptions] = useState(value ? value : []);
  const [saved, setSaved] = useState(false);

  const handleItemSelect = (event, value) => {
    const selectedItem = value;
    if (event.target.checked) {
      setCheckedOptions([...checkedOptions, selectedItem]);
    } else {
      setCheckedOptions(checkedOptions.filter((item) => item !== selectedItem));
    }
    if (saved) {
      setSaved(false);
    }
  };

  useEffect(() => {
    onChange(name, checkedOptions);
  }, [checkedOptions]);

  return (
    <>
      {options.map((option, index) => (
        <div
          className="container grid grid-cols-[1fr,_40px] border-b-2 my-2 max-w-full items-center grid-flow-row w-full"
          key={option}
        >
          <label className="border-r-2 p-2" htmlFor={index}>
            {option}
          </label>
          <div className="w-12 grid content-center">
            <input
              checked={checkedOptions.includes(option)}
              id={index}
              type="checkbox"
              className=" accent-black"
              onChange={(e) => handleItemSelect(e, option)}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default InputOptionsCheckbox;
