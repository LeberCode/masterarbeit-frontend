import { basicSetup, EditorView } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { createCustomCode } from "./api";

export const codeEditor = (instance) => {
  if (document.getElementById(`codeEditor${window.selectedFilter}`)) {
    const codeEditor = document.getElementById(
      `codeEditor${window.selectedFilter}`
    );
    codeEditor.style.visibility = "visible";
  } else {
    var diagram = document.getElementById("Diagram");

    const editorContainer = document.createElement("div");
    editorContainer.classList.add("editorContainer");
    editorContainer.id = `codeEditor${window.selectedFilter}`;

    const containerHeading = document.createElement("h4");
    containerHeading.appendChild(document.createTextNode("CODE EDITOR"));
    editorContainer.appendChild(containerHeading);

    const filterToCode = {
      type: document.getElementById(window.selectedFilter).innerHTML,
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

    let editorValues;
    switch (filterToCode.type) {
      case "Sender":
        editorValues = {
          doc: "// publisher.js\nconst amqp = require('amqplib/callback_api');\n\nconst rabbitmqUrl = 'amqp://mquser:mqpass@rabbit:5672';\n\namqp.connect(rabbitmqUrl, (error0, connection) => {\n    if (error0) {\n        throw error0;\n    }\n    connection.createChannel((error1, channel) => {\n        if (error1) {\n            throw error1;\n        }\n\n        const queue = 'hello';\n\n        channel.assertQueue(queue, {\n            durable: false\n        });\n\n        const sendMessage = () => {\n            const msg = 'Hello World! ' + new Date().toISOString();\n            channel.sendToQueue(queue, Buffer.from(msg));\n            console.log(\" [x] Sent '%s'\", msg);\n        };\n\n        setInterval(sendMessage, 1000);\n    });\n});\n",
          extensions: [basicSetup, javascript()],
          parent: editorContainer,
        };
        break;
      case "Receiver":
        editorValues = {
          doc: "// consumer.js\nconst amqp = require('amqplib/callback_api');\n\nconst rabbitmqUrl = 'amqp://mquser:mqpass@rabbit:5672';\n\namqp.connect(rabbitmqUrl, (error0, connection) => {\n    if (error0) {\n        throw error0;\n    }\n    connection.createChannel((error1, channel) => {\n        if (error1) {\n            throw error1;\n        }\n\n        const queue = 'hello';\n\n        channel.assertQueue(queue, {\n            durable: false\n        });\n\n        console.log(\" [*] Waiting for messages in %s. To exit press CTRL+C\", queue);\n\n        channel.consume(queue, (msg) => {\n            console.log(\" [x] Received '%s'\", msg.content.toString());\n        }, {\n            noAck: true\n        });\n    });\n});\n",
          extensions: [basicSetup, javascript()],
          parent: editorContainer,
        };
        break;
      default:
        editorValues = {
          doc: "const amqp = require('amqplib/callback_api');\n\nconst rabbitmqUrl = 'amqp://mquser:mqpass@rabbit:5672';\n\namqp.connect(rabbitmqUrl, (error0, connection) => {\n    if (error0) {\n        throw error0;\n    }\n    connection.createChannel((error1, channel) => {\n        if (error1) {\n            throw error1;\n        }\n\n        //TODO: Code logic here\n});\n",
          extensions: [basicSetup, javascript()],
          parent: editorContainer,
        };
        break;
    }
    const editor = new EditorView(editorValues);

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

    diagram.appendChild(editorContainer);
    instance.draggable(editorContainer.id);
  }
};

const handleCancel = (node) => {
  node.style.visibility = "hidden";
};
const handleSubmit = (node, code) => {
  const requestBody = {
    type: document.getElementById(window.selectedFilter).innerHTML,
    id: window.selectedFilter,
    code: code,
  };
  createCustomCode(requestBody);
  node.style.visibility = "hidden";
};
