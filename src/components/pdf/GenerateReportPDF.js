import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function generateReportPDF(formElements, templatereport_template_element_name) {
  let docContent = [
    { text: `${templatereport_template_element_name}`, style: "header" },
    {
      style: "bigTable",
      layout: {
        paddingLeft: () => 0,
        paddingRight: () => 0,
        paddingTop: () => 0,
        paddingBottom: () => 0,
        hLineWidth: () => 0,
        vLineWidth: () => 0,
      },
      table: { widths: ["*", "*", "*"], body: [["", "", ""]] },
    },
  ];

  let capacityLevel = 0;
  let rowIndex = 0;
  let elementCount = 0;
  formElements.map((element) => {
    let item;
    let width = 100;
    if (element.RTE.report_template_element_length === "short") {
      capacityLevel += 1;
      width = 100;
    }
    if (element.RTE.report_template_element_length === "medium") {
      capacityLevel += 2;
      width =
        element.RTE.report_template_element_orientation === "vertical"
          ? 206.2
          : 212.46;
    }
    if (element.RTE.report_template_element_length === "long") {
      capacityLevel += 3;
      width =
        element.RTE.report_template_element_orientation === "vertical"
          ? 312.35
          : 324.86;
    }
    if (capacityLevel > 3) {
      capacityLevel = 0;
      elementCount = 0;
      rowIndex += 1;
      docContent[1].table.body.push(["", "", ""]);
      if (element.RTE.report_template_element_length === "short") {
        capacityLevel += 1;
        width = 100;
      }
      if (element.RTE.report_template_element_length === "medium") {
        capacityLevel += 2;
        width =
          element.RTE.report_template_element_orientation === "vertical"
            ? 206.2
            : 212.46;
      }
      if (element.RTE.report_template_element_length === "long") {
        capacityLevel += 3;
        width =
          element.RTE.report_template_element_orientation === "vertical"
            ? 312.35
            : 324.86;
      }
    }
    if (element.RTE.report_template_element_type === "signature") {
      if (element.RTE.report_template_element_signature_position === "left") {
        elementCount = 0;
      } else if (
        element.RTE.report_template_element_signature_position === "centre"
      ) {
        elementCount = 1;
      } else if (
        element.RTE.report_template_element_signature_position === "right"
      ) {
        elementCount = 2;
      }
      capacityLevel = elementCount + 1;
      item = [
        {
          layout: {
            vLineWidth: () => 0,
            hLineWidth: function (i, node) {
              return i % 2 !== 0 ? 1 : 0;
            },
            paddingTop: function (i, node) {
              return 40;
            },
          },
          style: {
            alignment: "center",
          },
          table: {
            widths: ["100%"],
            body: [[""]],
          },
        },
        {
          style: {
            alignment: "center",
          },
          text: `${element.RTE.report_template_element_signature_text}`,
          margin: [0, 2, 0, 10],
        },
      ];
    } else if (element.RTE.report_template_element_type === "options") {
      let options = [];
      element.RTE.report_template_element_options.map((option) => {
        options.push([`${option}`]);
      });
      item = [
        {
          text: `${element.RTE.report_template_element_name}`,
          bold: true,
        },
        {
          table: {
            widths: [`${width}%`],
            body: options,
          },
        },
      ];
    } else if (element.RTE.report_template_element_type === "images") {
      let images = [];
      let widths = [];
      let report_template_element_image_count = 0;
      let imageProportions = [248, 248];

      if (element.RTE.report_template_element_images_column_count === "3") {
        imageProportions = [162, 162];
      }
      for (
        let i = 0;
        i < element.RTE.report_template_element_images_column_count;
        i += 1
      ) {
        widths.push(["*"]);
      }
      const rowNumb = Math.ceil(
        element.RTE.report_template_element_image_count /
          element.RTE.report_template_element_images_column_count
      );
      for (let i = 0; i < rowNumb; i += 1) {
        images.push([]);
        for (
          let j = 0;
          j < element.RTE.report_template_element_images_column_count;
          j += 1
        ) {
          report_template_element_image_count += 1;
          if (
            report_template_element_image_count <=
            element.RTE.report_template_element_image_count
          ) {
            images[i].push({
              image: "carl",
              fit: imageProportions,
            });
          } else {
            images[i].push([""]);
          }
        }
      }
      item = [
        {
          text: `${element.RTE.report_template_element_name}`,
          bold: true,
        },
        {
          table: {
            widths: widths,
            body: images,
          },
          layout: {
            paddingLeft: () => 5,
            paddingRight: () => 5,
            paddingTop: () => 5,
            paddingBottom: () => 5,
            hLineWidth: () => 0,
            vLineWidth: () => 0,
          },
        },
      ];
    } else {
      if (element.RTE.report_template_element_orientation === "vertical") {
        item = [
          {
            style: "smallTable",
            table: {
              widths: [`${width}%`],
              body: [
                [
                  {
                    text: element.RTE.report_template_element_name,
                    bold: true,
                  },
                ],
                [`${element.report_element_value}`],
              ],
            },
          },
        ];
      } else if (
        element.RTE.report_template_element_orientation === "horizontal"
      ) {
        item = [
          {
            style: "smallTable",
            table: {
              widths: ["37%", `${width - 37}%`],
              body: [
                [
                  {
                    text: element.RTE.report_template_element_name,
                    bold: true,
                  },
                  `${element.report_element_value}`,
                ],
              ],
            },
          },
        ];
      }
    }
    if (element.RTE.report_template_element_type !== "break") {
      docContent[1].table.body[rowIndex][elementCount] = item;
    } else {
      for (
        let i = 0;
        i < element.RTE.report_template_element_break_count;
        i += 1
      ) {
        rowIndex += 1;
        docContent[1].table.body.push([" ", " ", " "]);
      }
    }
    if (element.RTE.report_template_element_length === "short") {
      elementCount += 1;
    }
    if (element.RTE.report_template_element_length === "medium") {
      elementCount += 2;
    }
    if (element.RTE.report_template_element_length === "long") {
      elementCount += 3;
    }
  });

  const docDefinition = {
    content: docContent,
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      bigTable: {
        margin: [0, 0, 0, 0],
        padding: [0, 0, 0, 0],
        border: [false, false, false, false],
        fontSize: 10,
      },
    },
    images: {
      carl: "https://images.pexels.com/photos/2361952/pexels-photo-2361952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  };

  return pdfMake.createPdf(docDefinition);
}

export default generateReportPDF;
