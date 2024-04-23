import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  editTemplate,
  editTemplateElement,
} from "../../store/templates/templateSlice";
import { postTemplate } from "../../store/templates/templatesSlice";
import SubmitButton from "../layout/buttons/SubmitButton";
import SecondaryHeading from "../layout/headings/SecondaryHeading";
import InputOptions from "../layout/inputs/InputOptions";
import InputText from "../layout/inputs/InputText";
import generatePDF from "../pdf/GeneratePDF";
import SelectElementType from "../reportsAndTemplates/SelectElementType";
import TemplateCreatorActions from "../reportsAndTemplates/TemplateCreatorActions";
import TemplateCreatorElements from "../reportsAndTemplates/TemplateCreatorElements";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const CreatorComponent = ({
  type,
  objectTemplates,
  elements,
  mode,
  companyId,
  employeeId,
  name,
  template,
}) => {
  const [templateName, setTemplateName] = useState("");
  const [formElements, setFormElements] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputType, setInputType] = useState("text");
  const [inputOptions, setInputOptions] = useState([]);
  const [inputImageCount, setInputImageCount] = useState(1);
  const [inputLength, setInputLength] = useState("short");
  const [inputObject, setInputObject] = useState(undefined);
  const [inputSignatureText, setInputSignatureText] = useState("");
  const [inputOrientation, setInputOrientation] = useState("vertical");
  const [inputSignaturePosition, setInputSignaturePosition] = useState("right");
  const [inputImagesColumnCount, setInputImagesColumnCount] = useState(2);
  const [showOptions, setShowOptions] = useState(false);
  const [showOptionsElements, setShowOptionsElements] = useState(-1);
  const [editingElement, setEditingElement] = useState({});
  const [viewPreview, setViewPreview] = useState(false);
  const [pdfUrl, setPDFUrl] = useState(null);
  const [errorText, setErrorText] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (name) {
      setTemplateName(name);
    }
    if (elements) {
      setFormElements(elements);
    }
  }, [elements]);

  const createTemplate = () => {
    dispatch(
      postTemplate({
        reportTemplateData: {
          report_template_name: templateName,
          created_at: new Date(),
          company_id: companyId,
          employee_id: employeeId,
        },
        formElements: [...formElements],
      })
    );
  };

  const handleEditTemplate = () => {
    formElements.map((element) =>
      dispatch(
        editTemplateElement({
          template_element: element,
          templateId: template.report_template_id,
        })
      )
    );

    dispatch(
      editTemplate({
        report_template_id: template.report_template_id,
        report_template_name: templateName,
        created_at: new Date(),
        company_id: template.company_id,
        employee_id: template.employee_id,
      })
    );
  };

  useEffect(() => {
    const pdfDocGenerator = generatePDF(formElements, templateName);

    pdfDocGenerator.getDataUrl((dataUrl) => {
      setPDFUrl(dataUrl);
    });
  }, [formElements, templateName]);

  const handleAddElement = () => {
    let length = inputLength;

    if (inputType === "options" || inputType === "images") {
      length = "long";
    }

    if (inputType === "options" && inputOptions.length < 1) {
      setErrorText([...errorText, "Options cannot be empty"]);
      return;
    }

    const filteredOptions = inputOptions.filter((str) => str !== "");
    const newElement = {
      report_template_element_name: inputName,
      report_template_element_type: inputType,
      report_template_element_options: filteredOptions,
      report_template_element_image_count: inputImageCount,
      report_template_element_length: length,
      object_template_id: inputObject,
      report_template_element_signature_text: inputSignatureText,
      report_template_element_orientation: inputOrientation,
      report_template_element_signature_position: inputSignaturePosition,
      report_template_element_images_column_count: inputImagesColumnCount,
      report_template_element_break_count: undefined,
      is_required: false,
    };
    setFormElements([...formElements, newElement]);
    setInputName("");
    setInputType("text");
    setInputOptions([]);
    setInputImageCount(1);
    setInputLength("short");
    setInputObject(undefined);
    setInputSignatureText("");
    setInputOrientation("vertical");
    setInputSignaturePosition("right");
    setInputImagesColumnCount(2);
  };

  const handleAddBreakElement = () => {
    const newElement = {
      report_template_element_name: "break",
      report_template_element_type: "break",
      report_template_element_options: undefined,
      report_template_element_image_count: undefined,
      report_template_element_length: "long",
      object_template_id: undefined,
      report_template_element_signature_text: undefined,
      report_template_element_orientation: undefined,
      report_template_element_signature_position: undefined,
      report_template_element_images_column_count: undefined,
      report_template_element_break_count: 1,
      is_required: false,
    };
    setFormElements([...formElements, newElement]);
  };

  const handleChangeInputName = (event) => {
    setInputName(event.target.value);
  };

  const handleChangeInputOreintation = (value) => {
    setInputOrientation(value);
  };

  const handleChangeInputSignaturePosition = (value) => {
    setInputSignaturePosition(value);
  };

  const handleChangeInputType = (value) => {
    setInputType(value);
    if (value !== "object") {
      setInputObject(undefined);
    }
    if (value === "object" && objectTemplates) {
      setInputObject(objectTemplates[0].id);
    }
  };

  const handleChangeOption = (event, index) => {
    const newOptions = [...inputOptions];
    newOptions[index] = event.target.value;
    setInputOptions(newOptions);
  };

  const handleAddOption = () => {
    setInputOptions([...inputOptions, ""]);
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...inputOptions];
    newOptions.splice(index, 1);
    setInputOptions(newOptions);
  };

  const handleRemoveElement = (index) => {
    const newElements = [...formElements];
    newElements.splice(index, 1);
    setFormElements(newElements);
  };

  const handleMoveUp = (index) => {
    const newElements = [...formElements];
    if (index > 0) {
      [newElements[index], newElements[index - 1]] = [
        newElements[index - 1],
        newElements[index],
      ];
    }
    setFormElements(newElements);
  };

  const handleMoveDown = (index) => {
    const newElements = [...formElements];
    if (index < formElements.length - 1) {
      [newElements[index], newElements[index + 1]] = [
        newElements[index + 1],
        newElements[index],
      ];
    }
    setFormElements(newElements);
  };

  const handleDateChange = (event) => {
    if (event.target.checked) {
      if (inputType === "time") {
        setInputType("date/time");
      } else {
        setInputType("date");
      }
    } else {
      if (inputType === "date/time") {
        setInputType("time");
      } else {
        setInputType(null);
      }
    }
  };

  const handleTimeChange = (event) => {
    if (event.target.checked) {
      if (inputType === "date") {
        setInputType("date/time");
      } else {
        setInputType("time");
      }
    } else {
      if (inputType === "date/time") {
        setInputType("date");
      } else {
        setInputType(null);
      }
    }
  };

  const handleChangeInputNameElement = (value) => {
    setFormElements((prevState) => {
      const updatedElements = [...prevState];
      updatedElements[editingElement.index] = {
        ...updatedElements[editingElement.index],
        report_template_element_name: value,
      };
      return updatedElements;
    });
  };

  const handleChangeInputSignatureElement = (value) => {
    setFormElements((prevState) => {
      const updatedElements = [...prevState];
      updatedElements[editingElement.index] = {
        ...updatedElements[editingElement.index],
        report_template_element_signature_text: value,
      };
      return updatedElements;
    });
  };

  const handleChangeInputObjectElement = (value) => {
    setFormElements((prevState) => {
      const updatedElements = [...prevState];
      updatedElements[editingElement.index] = {
        ...updatedElements[editingElement.index],
        object_template_id: value,
      };
      return updatedElements;
    });
  };

  const handleChangeInputImageCountElement = (value) => {
    setFormElements((prevState) => {
      const updatedElements = [...prevState];
      updatedElements[editingElement.index] = {
        ...updatedElements[editingElement.index],
        report_template_element_image_count: value,
      };
      return updatedElements;
    });
  };

  const handleChangeInputLengthElement = (value) => {
    setFormElements((prevState) => {
      const updatedElements = [...prevState];
      updatedElements[editingElement.index] = {
        ...updatedElements[editingElement.index],
        report_template_element_length: value,
      };
      return updatedElements;
    });
  };

  const handleChangeInputOrientationElement = (value) => {
    setFormElements((prevState) => {
      const updatedElements = [...prevState];
      updatedElements[editingElement.index] = {
        ...updatedElements[editingElement.index],
        report_template_element_orientation: value,
      };
      return updatedElements;
    });
  };

  const handleChangeInputSignaturePositionElement = (value) => {
    setFormElements((prevState) => {
      const updatedElements = [...prevState];
      updatedElements[editingElement.index] = {
        ...updatedElements[editingElement.index],
        report_template_element_signature_position: value,
      };
      return updatedElements;
    });
  };

  const handleChangeInputImagesColumnCountElement = (value) => {
    setFormElements((prevState) => {
      const updatedElements = [...prevState];
      updatedElements[editingElement.index] = {
        ...updatedElements[editingElement.index],
        report_template_element_images_column_count: value,
      };
      return updatedElements;
    });
  };

  const handleChangeInputTypeElement = (value) => {
    setFormElements((prevState) => {
      const updatedElements = [...prevState];
      updatedElements[editingElement.index] = {
        ...updatedElements[editingElement.index],
        report_template_element_type: value,
      };
      if (value !== "object") {
        updatedElements[editingElement.index].object = undefined;
      } else if (objectTemplates) {
        updatedElements[editingElement.index].object = objectTemplates[0].id;
      }
      return updatedElements;
    });
  };

  const handleDateChangeElement = (event) => {
    if (event.target.checked) {
      if (editingElement.report_template_element_type === "time") {
        handleChangeInputTypeElement("date/time");
        setEditingElement(
          { ...editingElement, report_template_element_type: "date/time" },
          editingElement.index
        );
      } else {
        handleChangeInputTypeElement("date");
        setEditingElement(
          { ...editingElement, report_template_element_type: "date" },
          editingElement.index
        );
      }
    } else {
      if (editingElement.report_template_element_type === "date/time") {
        handleChangeInputTypeElement("time");
        setEditingElement(
          { ...editingElement, report_template_element_type: "time" },
          editingElement.index
        );
      } else {
        handleChangeInputTypeElement("date/time");
        setEditingElement(
          { ...editingElement, report_template_element_type: "date/time" },
          editingElement.index
        );
      }
    }
  };

  const handleTimeChangeElement = (event) => {
    if (event.target.checked) {
      if (editingElement.report_template_element_type === "date") {
        handleChangeInputTypeElement("date/time");
        setEditingElement(
          { ...editingElement, report_template_element_type: "date/time" },
          editingElement.index
        );
      } else {
        handleChangeInputTypeElement("time");
        setEditingElement(
          { ...editingElement, report_template_element_type: "time" },
          editingElement.index
        );
      }
    } else {
      if (editingElement.report_template_element_type === "date/time") {
        handleChangeInputTypeElement("date");
        setEditingElement(
          { ...editingElement, report_template_element_type: "date" },
          editingElement.index
        );
      } else {
        handleChangeInputTypeElement("date/time");
        setEditingElement(
          { ...editingElement, report_template_element_type: "date/time" },
          editingElement.index
        );
      }
    }
  };

  const handleChangeBreakCountElement = (value) => {
    if (editingElement.type === "break") {
      setFormElements((prevState) => {
        const updatedElements = [...prevState];
        updatedElements[editingElement.index] = {
          ...updatedElements[editingElement.index],
          report_template_element_break_count: value,
        };
        return updatedElements;
      });
    }
  };

  const handleChangeOptionElement = (event, optionIndex) => {
    setFormElements((prevState) => {
      const updatedElements = [...prevState];
      const updatedOptions = [
        ...updatedElements[editingElement.index]
          .report_template_element_options,
      ];
      updatedOptions[optionIndex] = event.target.value;
      updatedElements[editingElement.index].report_template_element_options =
        updatedOptions;
      return updatedElements;
    });
  };

  const handleAddOptionElement = () => {
    setFormElements((prevState) => {
      const updatedElements = [...prevState];
      updatedElements[editingElement.index].report_template_element_options = [
        ...updatedElements[editingElement.index]
          .report_template_element_options,
        "",
      ];
      return updatedElements;
    });
  };

  const handleRemoveOptionElement = (optionIndex) => {
    setFormElements((prevState) => {
      const updatedElements = [...prevState];
      updatedElements[
        editingElement.index
      ].report_template_element_options.splice(optionIndex, 1);
      return updatedElements;
    });
  };

  const handleEdit = (element, index) => {
    const newElement = {
      index: index,
      report_template_element_name: element.name,
      report_template_element_type: element.type,
      report_template_element_options: element.options,
      report_template_element_image_count: element.imageCount,
      report_template_element_length: element.length,
      object_template_id: element.object,
      report_template_element_signature_text: element.signature,
      report_template_element_orientation: element.orientation,
      report_template_element_signature_position: element.signaturePosition,
      report_template_element_images_column_count: element.imageColumnCount,
    };
    setEditingElement(newElement);
  };

  const handleSave = (index) => {
    // Save the changes to the element here
    setEditingElement({});
  };

  return (
    <div className={"grid md:grid-cols-3 grid-cols-1 min-w-[100vw] px-8 gap-2"}>
      <div className="h-[75vh] overflow-y-scroll p-1 col-span-2">
        {errorText.length > 0 && (
          <div className="flex justify-center w-full pr-12 my-4">
            <div>
              {errorText.map((error) => (
                <p>{error}</p>
              ))}
            </div>
          </div>
        )}
        <div className="bg-white border-2 rounded-3xl ">
          <div className="flex justify-between px-4 py-2 items-center">
            <h2 className="text-2xl uppercase tracking-widest">Creator</h2>
            <div className="w-64">
              <InputText
                onChange={setTemplateName}
                value={templateName}
                placeholder={`${type} name`}
              />
            </div>
          </div>
          <table className="w-full">
            <thead className="text-center uppercase">
              <tr className="border-y">
                <th className="px-4 py-2">Input Name</th>
                <th className="px-4 py-2 border-x">Input Type</th>
                <th className="px-4 py-2 border-l">Special</th>
                <th className="px-4 py-2 w-52 border-l">Design</th>
                <th className="px-4 py-2 border-l">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className=" border-gray-300 text-center">
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={inputName}
                    onChange={handleChangeInputName}
                    placeholder={"Name..."}
                    className="border rounded-full bg-gray-300 placeholder-gray-800 w-full text-black my-2 py-2 px-4"
                  />
                </td>
                <td className="px-4 py-2 border-l">
                  <SelectElementType
                    handleChangeInputType={handleChangeInputType}
                    inputType={inputType}
                  />
                </td>
                <td className="px-4 py-2 flex justify-around gap-4 items-center border-l">
                  <TemplateCreatorActions
                    inputType={inputType}
                    setShowOptions={setShowOptions}
                    showOptions={showOptions}
                    handleAddOption={handleAddOption}
                    handleRemoveElement={handleRemoveElement}
                    inputOptions={inputOptions}
                    inputImageCount={inputImageCount}
                    handleChangeOption={handleChangeOption}
                    handleRemoveOption={handleRemoveOption}
                    setInputImageCount={setInputImageCount}
                    handleDateChange={handleDateChange}
                    handleTimeChange={handleTimeChange}
                    objectTemplates={objectTemplates}
                    setInputObject={setInputObject}
                    inputObject={inputObject}
                    inputSignatureText={inputSignatureText}
                    setInputSignatureText={setInputSignatureText}
                    isDisabled={false}
                    index={null}
                  />
                </td>
                <td>
                  <div className="flex gap-2 border-l px-4">
                    {inputType !== "signature" &&
                      inputType !== "images" &&
                      inputType !== "options" && (
                        <InputOptions
                          items={
                            inputType === "options"
                              ? [{ name: "long" }]
                              : [
                                  { name: "short" },
                                  { name: "medium" },
                                  { name: "long" },
                                ]
                          }
                          value={
                            inputType === "options" || inputType === "images"
                              ? "long"
                              : inputLength
                          }
                          setItem={setInputLength}
                        />
                      )}
                    {inputType !== "options" &&
                      inputType !== "signature" &&
                      inputType !== "images" && (
                        <InputOptions
                          items={[{ name: "vertical" }, { name: "horizontal" }]}
                          value={inputOrientation}
                          setItem={handleChangeInputOreintation}
                        />
                      )}
                    {inputType === "signature" && (
                      <InputOptions
                        items={[
                          { name: "left" },
                          { name: "centre" },
                          { name: "right" },
                        ]}
                        value={inputSignaturePosition}
                        setItem={handleChangeInputSignaturePosition}
                      />
                    )}
                    {inputType === "images" && (
                      <InputOptions
                        items={[{ name: "2" }, { name: "3" }]}
                        value={inputImagesColumnCount}
                        setItem={setInputImagesColumnCount}
                      />
                    )}
                  </div>
                </td>
                <td className="border-l">
                  <SubmitButton clickFunction={handleAddElement}>
                    Add
                  </SubmitButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-white border-2 rounded-3xl mt-4">
          <div className="flex items-center justify-between py-1 px-4">
            <SecondaryHeading>Elements</SecondaryHeading>
            <SubmitButton clickFunction={handleAddBreakElement}>
              ADD BREAK
            </SubmitButton>
          </div>
          <TemplateCreatorElements
            formElements={formElements}
            editingElement={editingElement}
            handleMoveUp={handleMoveUp}
            handleMoveDown={handleMoveDown}
            handleChangeInputName={handleChangeInputNameElement}
            handleChangeInputType={handleChangeInputTypeElement}
            setShowOptionsElements={setShowOptionsElements}
            showOptionsElements={showOptionsElements}
            handleAddOption={handleAddOptionElement}
            handleChangeOption={handleChangeOptionElement}
            handleRemoveOption={handleRemoveOptionElement}
            handleSave={handleSave}
            handleEdit={handleEdit}
            handleRemoveElement={handleRemoveElement}
            inputImageCount={inputImageCount}
            setInputImageCount={handleChangeInputImageCountElement}
            handleDateChange={handleDateChangeElement}
            handleTimeChange={handleTimeChangeElement}
            objectTemplates={objectTemplates}
            setInputObject={handleChangeInputObjectElement}
            setInputSignatureText={handleChangeInputSignatureElement}
            handleChangeInputLengthElement={handleChangeInputLengthElement}
            handleChangeInputOreintation={handleChangeInputOrientationElement}
            handleChangeInputSignaturePosition={
              handleChangeInputSignaturePositionElement
            }
            setInputImagesColumnCount={
              handleChangeInputImagesColumnCountElement
            }
            handleChangeBreakCountElement={handleChangeBreakCountElement}
          />
        </div>

        <div className="flex justify-end m-4">
          <SubmitButton
            clickFunction={
              mode === "edit" ? handleEditTemplate : createTemplate
            }
          >
            Create
          </SubmitButton>
        </div>
      </div>
      <div>
        <iframe
          id="pdfViewer"
          title="PDF Viewer"
          src={pdfUrl}
          className="w-full h-full rounded-xl"
        ></iframe>
      </div>
    </div>
  );
};

export default memo(CreatorComponent);
