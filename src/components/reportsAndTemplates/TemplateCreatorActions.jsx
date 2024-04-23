import Button from "../layout/buttons/Button";
import CloseButton from "../layout/buttons/CloseButton";
import DownloadButton from "../layout/buttons/DownloadButton";
import PrintButton from "../layout/buttons/PrintButton";
import InputOptions from "../layout/inputs/InputOptions";
import InputText from "../layout/inputs/InputText";
import SecondaryLabel from "../layout/labels/SecondaryLabel";
import PopupComponent from "../layout/popups/PopupComponent";

const TemplateCreatorActions = ({
  inputType,
  setShowOptions,
  showOptions,
  handleAddOption,
  inputOptions,
  handleChangeOption,
  handleRemoveOption,
  inputImageCount,
  setInputImageCount,
  handleDateChange,
  handleTimeChange,
  objectTemplates,
  setInputObject,
  inputObject,
  inputSignatureText,
  setInputSignatureText,
  isDisabled,
  index,
}) => {
  const dateChecked = inputType === "date" || inputType === "date/time";
  const timeChecked = inputType === "time" || inputType === "date/time";

  if (inputType === "text" || inputType === "options") {
    return (
      <>
        <Button
          clickFunction={
            index !== null
              ? () => setShowOptions(index)
              : () => setShowOptions(!showOptions)
          }
        >
          Options
        </Button>
        {showOptions && (
          <PopupComponent>
            <div className="flex flex-col gap-2">
              {!isDisabled && (
                <PrintButton
                  clickFunction={handleAddOption}
                  isDisabled={isDisabled}
                >
                  Add Option
                </PrintButton>
              )}
              {inputOptions.map((option, index) => (
                <div key={index} className="flex justify-between">
                  <input
                    type="text"
                    value={option}
                    onChange={(event) => handleChangeOption(event, index)}
                    className="p-2 border rounded"
                    placeholder="Option"
                    disabled={isDisabled}
                  />
                  {!isDisabled && (
                    <CloseButton
                      clickFunction={() => handleRemoveOption(index)}
                      className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-3xl"
                      isDisabled={isDisabled}
                    >
                      X
                    </CloseButton>
                  )}
                </div>
              ))}
              <DownloadButton
                clickFunction={
                  index
                    ? () => setShowOptions(null)
                    : () => setShowOptions(!showOptions)
                }
              >
                {isDisabled ? "Close" : "Save"}
              </DownloadButton>
            </div>
          </PopupComponent>
        )}
      </>
    );
  } else if (
    inputType === "date/time" ||
    inputType === "date" ||
    inputType === "time"
  ) {
    return (
      <div className="flex justify-between gap-2">
        <div className="flex flex-col justify-center gap-2">
          <SecondaryLabel>Date</SecondaryLabel>
          <input
            type="checkbox"
            name="date"
            checked={dateChecked}
            disabled={(!timeChecked && dateChecked) || isDisabled}
            onChange={handleDateChange}
          />
        </div>
        <div className="justify-center flex flex-col gap-2">
          <SecondaryLabel>Time</SecondaryLabel>
          <input
            type="checkbox"
            name="time"
            checked={timeChecked}
            onChange={handleTimeChange}
            disabled={(timeChecked && !dateChecked) || isDisabled}
          />
        </div>
      </div>
    );
  } else if (inputType === "images") {
    return (
      <div className="flex flex-col gap-2">
        <InputOptions
          items={[
            { name: 1 },
            { name: 2 },
            { name: 3 },
            { name: 4 },
            { name: 5 },
            { name: 6 },
            { name: 7 },
            { name: 8 },
            { name: 9 },
            { name: 10 },
          ]}
          value={inputImageCount}
          setItem={setInputImageCount}
          isDisabled={isDisabled}
        />
      </div>
    );
  } else if (inputType === "object") {
    return (
      <div className="flex flex-col gap-2">
        <select
          onChange={(e) => setInputObject(e.target.value)}
          value={inputObject}
          className="border rounded-lg block w-full p-2"
          disabled={isDisabled}
        >
          {objectTemplates.map((item, index) => (
            <option value={item.id} key={index}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    );
  } else if (inputType === "signature") {
    return (
      <div>
        <InputText
          placeholder={"Signature description"}
          value={inputSignatureText}
          onChange={setInputSignatureText}
          isDisabled={isDisabled}
        />
      </div>
    );
  }
};

export default TemplateCreatorActions;
