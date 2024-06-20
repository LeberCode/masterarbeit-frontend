import { v4 as uuidv4 } from "uuid";
import { createEndpoints } from "./endpoints";
import { appState } from "./state";

export const duplicatePipe = (instance) => {
  var selectedPipe = document.getElementById(window.selectedPipe);

  var newPipe = document.createElement("div");
  var pipeText = document.createTextNode(selectedPipe.innerHTML.split("\n")[1]);
  newPipe.appendChild(pipeText);
  newPipe.id = uuidv4();
  newPipe.classList.add("Pipe");
  newPipe.dataset.type = selectedPipe.dataset.type;

  var top = selectedPipe.offsetTop + 36;
  var topStr = top.toString() + "px";

  var left = selectedPipe.offsetLeft + 48;
  var leftStr = left.toString() + "px";

  newPipe.style.top = topStr;
  newPipe.style.left = leftStr;

  var container = document.getElementById("Diagram");
  container.appendChild(newPipe);

  instance.draggable(newPipe.id, { containment: true });
  createEndpoints(instance, newPipe.id, newPipe.dataset.type);
};

export const duplicateFilter = (instance) => {
  var selectedFilter = document.getElementById(window.selectedFilter);

  var newFilter = document.createElement("div");
  var filterText = document.createTextNode(
    selectedFilter.innerHTML.split("\n")[1]
  );
  newFilter.appendChild(filterText);
  newFilter.id = uuidv4();
  newFilter.classList.add("Filter");
  newFilter.dataset.type = selectedFilter.dataset.type;

  var top = selectedFilter.offsetTop + 48;
  var topStr = top.toString() + "px";

  var left = selectedFilter.offsetLeft + 72;
  var leftStr = left.toString() + "px";

  newFilter.style.top = topStr;
  newFilter.style.left = leftStr;

  var container = document.getElementById("Diagram");
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
