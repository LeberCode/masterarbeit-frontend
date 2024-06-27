import { showCheck } from "./visualValidation";
import { appState } from "./state";

export const namePipe = (instance) => {
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
    spanToChange.innerHTML = `${newPipeName}`;
    showCheck(window.selectedPipe);
    instance.repaintEverything();
  }
};

export const nameFilter = (instance) => {
  let newFilterName;

  while (true) {
    newFilterName = prompt("Bitte geben Sie einen Filter Namen ein:");
    const allFilterNames = document.querySelectorAll("#Diagram #FilterName");
    let nodeArray = Array.from(allFilterNames);
    let innerHTMLArray = nodeArray.map((node) => node.innerHTML);
    const nameExists = innerHTMLArray.includes(newFilterName);

    if (nameExists) {
      alert(
        "Dieser Name ist bereits vergeben. Bitte geben Sie einen anderen Namen ein."
      );
    } else {
      break;
    }
  }

  if (window.selectedFilter && newFilterName) {
    const spanToChange = document.querySelector(
      `#${window.selectedFilter} #FilterName`
    );
    spanToChange.innerHTML = `${newFilterName}`;
    instance.repaintEverything();
  }
};
