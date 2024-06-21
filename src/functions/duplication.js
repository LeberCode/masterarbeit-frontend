import { v4 as uuidv4 } from "uuid";
import { createEndpoints } from "./endpoints";
import { appState } from "./state";
import { showWarning, showCheck } from "./visualValidation";
import { coorectId } from "./id";

export const duplicatePipe = (instance) => {
  const selectedPipe = document.getElementById(window.selectedPipe);

  const newPipe = selectedPipe.cloneNode(true);
  newPipe.id = coorectId(uuidv4());

  const top = selectedPipe.offsetTop + 36;
  const topStr = top.toString() + "px";

  const left = selectedPipe.offsetLeft + 48;
  const leftStr = left.toString() + "px";

  newPipe.style.top = topStr;
  newPipe.style.left = leftStr;

  const container = document.getElementById("Diagram");
  container.appendChild(newPipe);
  showWarning(newPipe.id);

  instance.draggable(newPipe.id, { containment: true });
  createEndpoints(instance, newPipe.id, newPipe.dataset.type);
};

export const duplicateFilter = (instance) => {
  const selectedFilter = document.getElementById(window.selectedFilter);

  const newFilter = selectedFilter.cloneNode(true);
  newFilter.id = coorectId(uuidv4());

  const top = selectedFilter.offsetTop + 48;
  const topStr = top.toString() + "px";

  const left = selectedFilter.offsetLeft + 72;
  const leftStr = left.toString() + "px";

  newFilter.style.top = topStr;
  newFilter.style.left = leftStr;

  const container = document.getElementById("Diagram");
  container.appendChild(newFilter);
  showWarning(newFilter.id);

  instance.draggable(newFilter.id, { containment: true });
  createEndpoints(instance, newFilter.id, newFilter.dataset.type);
};

export const extendPipe = () => {
  let newPipeName;

  while (true) {
    newPipeName = prompt("Bitte geben Sie einen Pipe Namen ein:");

    let nameExists = Array.from(appState.getState().pipes.values()).includes(
      newPipeName
    );

    if (nameExists) {
      alert(
        "Dieser Name ist bereits vergeben. Bitte geben Sie einen anderen Namen ein."
      );
    } else {
      break;
    }
  }

  if (window.selectedPipe && newPipeName) {
    appState.addPipe(window.selectedPipe, newPipeName);

    const spanToChange = document.querySelector(
      `#${window.selectedPipe} #PipeName`
    );
    spanToChange.innerHTML = `"${newPipeName}"`;
    showCheck(window.selectedPipe);
  }
};
