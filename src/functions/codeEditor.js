import { basicSetup, EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { createCustomCode } from "./api";
import { showCheck } from "./visualValidation";
import { handlePipeBinding, getPipesForFilter } from "./pipeBinding";

let editorValues = {
  doc: "const amqp = require('amqplib/callback_api');\n\nconst rabbitmqUrl = 'amqp://mquser:mqpass@rabbit:5672';\n\namqp.connect(rabbitmqUrl, (error0, connection) => {\n    if (error0) {\n        throw error0;\n    }\n    connection.createChannel((error1, channel) => {\n        if (error1) {\n            throw error1;\n        }\n\n\n\n        //TODO: Code logic here\n});\n",
  extensions: [basicSetup, javascript()],
};

let editorStartState = EditorState.create(editorValues);
const editor = new EditorView({
  state: editorStartState,
});

export const codeEditorElement = (instance) => {
  if (document.getElementById(`codeEditor${window.selectedFilter}`)) {
    const codeEditor = document.getElementById(
      `codeEditor${window.selectedFilter}`
    );
    codeEditor.style.visibility = "visible";
    handlePipeBinding(getPipesForFilter(instance), editor);
  } else {
    var diagram = document.getElementById("Diagram");

    const editorContainer = document.createElement("div");
    editorContainer.classList.add("editorContainer");
    editorContainer.id = `codeEditor${window.selectedFilter}`;

    const containerHeading = document.createElement("h4");
    containerHeading.appendChild(document.createTextNode("CODE EDITOR"));
    containerHeading.style.marginTop = "6px";
    containerHeading.style.marginBottom = "0px";
    editorContainer.appendChild(containerHeading);

    diagram.appendChild(editorContainer);

    const filterToCode = {
      type: document
        .getElementById(window.selectedFilter)
        .innerHTML.split("\n")[1],
      id: window.selectedFilter,
    };

    const filterToCodeElement = document.createElement("p");
    filterToCodeElement.appendChild(
      document.createTextNode(`${filterToCode.type}: ${filterToCode.id}`)
    );
    editorContainer.appendChild(filterToCodeElement);

    const closingX = document.createElement("div");
    closingX.classList.add("closingX");
    closingX.appendChild(document.createTextNode("X"));
    closingX.addEventListener("click", () => handleCancel(editorContainer));
    editorContainer.appendChild(closingX);

    handlePipeBinding(getPipesForFilter(instance), editor);
    editorContainer.appendChild(editor.dom);

    var buttonContainer = document.createElement("div");
    buttonContainer.classList.add("codeEditorButtons");

    const submitButton = document.createElement("button");
    submitButton.appendChild(document.createTextNode("SUBMIT"));
    submitButton.classList.add("submitButton");
    submitButton.addEventListener("click", () =>
      handleSubmit(editorContainer, editor.state.doc.toString())
    );

    const cancelButton = document.createElement("button");
    cancelButton.appendChild(document.createTextNode("CANCEL"));
    cancelButton.classList.add("cancelButton");
    cancelButton.addEventListener("click", () => handleCancel(editorContainer));

    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(submitButton);
    editorContainer.appendChild(buttonContainer);

    instance.draggable(editorContainer.id);
  }
};

const handleCancel = (node) => {
  node.style.visibility = "hidden";
};
const handleSubmit = (node, code) => {
  const requestBody = {
    type: document
      .getElementById(window.selectedFilter)
      .innerHTML.split("\n")[1],
    id: window.selectedFilter,
    code: code,
    pipe: "",
    isDeployed: false,
    isPaused: false,
    isScaled: "",
  };
  createCustomCode(requestBody);
  node.style.visibility = "hidden";
  showCheck(window.selectedFilter);
  document.getElementById("Deploy").removeAttribute("disabled");
};
