import Button from "../layout/buttons/Button";
import CloseButton from "../layout/buttons/CloseButton";
import EditButton from "../layout/buttons/EditButton";
import TertiaryHeading from "../layout/headings/TertiaryHeading";
import InputOptions from "../layout/inputs/InputOptions";
import InputText from "../layout/inputs/InputText";
import SelectElementType from "./SelectElementType";
import TemplateCreatorActions from "./TemplateCreatorActions";

const TemplateCreatorElements = ({
  formElements,
  editingElement,
  handleMoveUp,
  handleMoveDown,
  handleChangeInputName,
  handleChangeInputType,
  setShowOptionsElements,
  showOptionsElements,
  handleAddOption,
  handleRemoveOption,
  handleChangeOption,
  handleSave,
  handleEdit,
  handleRemoveElement,
  setInputImageCount,
  handleDateChange,
  handleTimeChange,
  objectTemplates,
  setInputObject,
  setInputSignatureText,
  handleChangeInputLengthElement,
  handleChangeInputOreintation,
  handleChangeInputSignaturePosition,
  setInputImagesColumnCount,
  handleChangeBreakCountElement,
}) => {
  return (
    <>
      <table className="w-full">
        <thead className="text-center uppercase">
          <tr className="border-y">
            <th className="px-4 py-2 max-w-[3rem]">Order</th>
            <th className="px-4 py-2 border-l">Input Name</th>
            <th className="px-4 py-2 border-x">Input Type</th>
            <th className="px-4 py-2 border-l">Special</th>
            <th className="px-4 py-2 w-52 border-l">Design</th>
            <th className="px-4 py-2 border-l">Actions</th>
          </tr>
        </thead>
        <tbody>
          {formElements.map((element, index) => {
            return (
              <tr key={index} className="border-t border-gray-300 text-center">
                <td className="px-4 py-2 ">
                  <button type="button" onClick={() => handleMoveUp(index)}>
                    ▲
                  </button>
                  <button type="button" onClick={() => handleMoveDown(index)}>
                    ▼
                  </button>
                </td>
                {index === editingElement.index ? (
                  <td className="px-4 py-2 ">
                    <InputText
                      value={element.report_template_element_name}
                      onChange={handleChangeInputName}
                    />
                  </td>
                ) : (
                  <td>{element.report_template_element_name}</td>
                )}
                {index === editingElement.index &&
                element.report_template_element_type !== "break" ? (
                  <td className="px-4 py-2 ">
                    <SelectElementType
                      handleChangeInputType={handleChangeInputType}
                      inputType={element.report_template_element_type}
                    />
                  </td>
                ) : (
                  <td>{element.report_template_element_type}</td>
                )}
                <td className="px-4 py-2">
                  <TemplateCreatorActions
                    inputType={element.report_template_element_type}
                    setShowOptions={setShowOptionsElements}
                    showOptions={showOptionsElements === index ? true : false}
                    handleAddOption={handleAddOption}
                    handleRemoveElement={handleRemoveElement}
                    inputOptions={element.report_template_element_options}
                    inputImageCount={
                      element.report_template_element_image_count
                    }
                    handleChangeOption={handleChangeOption}
                    handleRemoveOption={handleRemoveOption}
                    setInputImageCount={setInputImageCount}
                    handleDateChange={handleDateChange}
                    handleTimeChange={handleTimeChange}
                    objectTemplates={objectTemplates}
                    setInputObject={setInputObject}
                    inputObject={element.object_template_id}
                    inputSignatureText={
                      element.report_template_element_signature_text
                    }
                    setInputSignatureText={setInputSignatureText}
                    isDisabled={index !== editingElement.index}
                    index={index}
                  />
                </td>
                <td className="px-4 py-2 w-32">
                  <div className="flex gap-2">
                    {element.report_template_element_type !== "signature" &&
                      element.report_template_element_type !== "options" &&
                      element.report_template_element_type !== "break" &&
                      element.report_template_element_type !== "images" && (
                        <InputOptions
                          items={
                            element.report_template_element_type === "options"
                              ? [{ name: "long" }]
                              : [
                                  { name: "short" },
                                  { name: "medium" },
                                  { name: "long" },
                                ]
                          }
                          value={
                            element.report_template_element_type ===
                              "options" ||
                            element.report_template_element_type === "images"
                              ? "long"
                              : element.report_template_element_length
                          }
                          setItem={handleChangeInputLengthElement}
                          isDisabled={index !== editingElement.index}
                        />
                      )}
                    {element.report_template_element_type !== "options" &&
                      element.report_template_element_type !== "break" &&
                      element.report_template_element_type !== "images" &&
                      element.report_template_element_type !== "signature" && (
                        <InputOptions
                          items={[{ name: "vertical" }, { name: "horizontal" }]}
                          value={element.report_template_element_orientation}
                          setItem={handleChangeInputOreintation}
                          isDisabled={index !== editingElement.index}
                        />
                      )}
                    {element.report_template_element_type === "signature" && (
                      <InputOptions
                        items={[
                          { name: "left" },
                          { name: "centre" },
                          { name: "right" },
                        ]}
                        value={
                          element.report_template_element_signature_position
                        }
                        setItem={handleChangeInputSignaturePosition}
                        isDisabled={index !== editingElement.index}
                      />
                    )}
                    {element.report_template_element_type === "images" && (
                      <InputOptions
                        items={[{ name: "2" }, { name: "3" }]}
                        value={
                          element.report_template_element_images_column_count
                        }
                        isDisabled={index !== editingElement.index}
                        setItem={setInputImagesColumnCount}
                      />
                    )}
                    {element.report_template_element_type === "break" && (
                      <InputOptions
                        items={[
                          { name: "1" },
                          { name: "2" },
                          { name: "3" },
                          { name: "4" },
                          { name: "5" },
                          { name: "6" },
                          { name: "7" },
                          { name: "8" },
                          { name: "9" },
                          { name: "10" },
                          { name: "11" },
                          { name: "12" },
                          { name: "13" },
                          { name: "14" },
                          { name: "15" },
                          { name: "16" },
                          { name: "17" },
                          { name: "18" },
                          { name: "19" },
                          { name: "20" },
                        ]}
                        value={element.report_template_element_break_count}
                        isDisabled={index !== editingElement.index}
                        setItem={handleChangeBreakCountElement}
                      />
                    )}
                  </div>
                </td>
                {index === editingElement.index ? (
                  <td className="px-4 py-2 flex justify-center gap-4 items-center">
                    <Button clickFunction={() => handleSave(index)}>
                      Save
                    </Button>
                  </td>
                ) : (
                  <td className="px-4 py-2 flex justify-center gap-4 items-center">
                    <EditButton
                      clickFunction={() => handleEdit(element, index)}
                    >
                      Edit
                    </EditButton>
                    <CloseButton
                      clickFunction={() => handleRemoveElement(index)}
                    >
                      Delete
                    </CloseButton>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      {formElements.report_template_element_length < 1 && (
        <TertiaryHeading>No elements added</TertiaryHeading>
      )}
    </>
  );
};

export default TemplateCreatorElements;
