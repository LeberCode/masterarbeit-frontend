import { v4 as uuidv4 } from "uuid";
import { createEndpoints } from "./endpoints";
import { appState } from "./state";

export const duplicatePipe = (instance) => {
  const selectedPipe = document.getElementById(window.selectedPipe);

  const newPipe = selectedPipe.cloneNode(true);
  newPipe.id = uuidv4();

  const top = selectedPipe.offsetTop + 36;
  const topStr = top.toString() + "px";

  const left = selectedPipe.offsetLeft + 48;
  const leftStr = left.toString() + "px";

  newPipe.style.top = topStr;
  newPipe.style.left = leftStr;

  const container = document.getElementById("Diagram");
  container.appendChild(newPipe);

  instance.draggable(newPipe.id, { containment: true });
  createEndpoints(instance, newPipe.id, newPipe.dataset.type);
};

export const duplicateFilter = (instance) => {
  const selectedFilter = document.getElementById(window.selectedFilter);

  const newFilter = selectedFilter.cloneNode(true);
  newFilter.id = uuidv4();

  const top = selectedFilter.offsetTop + 48;
  const topStr = top.toString() + "px";

  const left = selectedFilter.offsetLeft + 72;
  const leftStr = left.toString() + "px";

  newFilter.style.top = topStr;
  newFilter.style.left = leftStr;

  const container = document.getElementById("Diagram");
  container.appendChild(newFilter);

  instance.draggable(newFilter.id, { containment: true });
  createEndpoints(instance, newFilter.id, newFilter.dataset.type);
};

export const extendPipe = () => {
  let newPipeName = prompt("Bitte geben Sie einen Pipe Namen ein:");
  const pipeToName = document.getElementById(window.selectedPipe);
  if (pipeToName) {
    var textIndex = pipeToName.innerHTML.indexOf("Queue");
    textIndex === -1
      ? (textIndex = pipeToName.innerHTML.indexOf("Topic"))
      : null;

    if (textIndex !== -1) {
      var beforeQueue = pipeToName.innerHTML.slice(
        0,
        textIndex + "Queue".length
      );
      var afterQueue = pipeToName.innerHTML.slice(textIndex + "Queue".length);

      var newContent = beforeQueue + `<br> "${newPipeName}"` + afterQueue;

      pipeToName.innerHTML = newContent;
    }
    appState.addPipe(pipeToName.id, newPipeName);
  }
};
