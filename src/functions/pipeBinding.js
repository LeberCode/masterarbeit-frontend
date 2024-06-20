import { appState } from "./state";
import { errorFeedbackSimple } from "./feedback";

export const createPipesElements = () => {
  const codeEditor = document.getElementById(
    `codeEditor${window.selectedFilter}`
  );
  const pipesDiv = document.createElement("div");
  pipesDiv.classList.add("pipes");

  const incomingPipesDiv = document.createElement("div");
  incomingPipesDiv.id = "IncomingPipes";
  const incomingPipesHeading = document.createElement("h5");
  incomingPipesHeading.style.margin = "6px";
  incomingPipesHeading.appendChild(document.createTextNode("Incoming Pipes"));
  incomingPipesDiv.appendChild(incomingPipesHeading);

  const outgoingPipesDiv = document.createElement("div");
  outgoingPipesDiv.id = "OutgoingPipes";
  const outgoingPipesHeading = document.createElement("h5");
  outgoingPipesHeading.style.margin = "6px";
  outgoingPipesHeading.appendChild(document.createTextNode("Outgoing Pipes"));
  outgoingPipesDiv.appendChild(outgoingPipesHeading);

  pipesDiv.appendChild(incomingPipesDiv);
  pipesDiv.appendChild(outgoingPipesDiv);

  codeEditor.appendChild(pipesDiv);
  createPipeButtons(getPipesForFilter());
};

export const getPipesForFilter = () => {
  const filter = window.selectedFilter;
  const connections = appState.getConnection(filter);
  const pipeMapping = [];
  connections &&
    connections.forEach((connection) => {
      const pipeName = appState.getPipe(connection.pipeId);
      if (!pipeName) {
        errorFeedbackSimple("Name Your Pipes!");
      } else {
        const pipe = { pipeName, ...connection };
        pipeMapping.push(pipe);
      }
    });
  return pipeMapping;
};

export const createPipeButtons = (pipeMapping) => {
  const incomingPipesDiv = document.getElementById("IncomingPipes");
  const outgoingPipesDiv = document.getElementById("OutgoingPipes");

  pipeMapping.forEach((pipe) => {
    if (document.getElementById(`Button${pipe.pipeId}`)) {
      return;
    } else {
      const pipeButton = document.createElement("button");
      pipeButton.id = `Button${pipe.pipeId}`;
      pipeButton.appendChild(document.createTextNode(pipe.pipeName));
      pipe.direction === "in"
        ? incomingPipesDiv.appendChild(pipeButton)
        : outgoingPipesDiv.appendChild(pipeButton);
    }
  });
};
