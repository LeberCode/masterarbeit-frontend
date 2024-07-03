import { showCheck } from "./visualValidation";
import { appState } from "./state";
import { renamePipeNamesInCode } from "./codeEditorHandler";

export const namePipe = (instance) => {
  let newPipeName;

  const selectedPipe = window.selectedPipe;
  const pipeWasNamedBefore = appState.getPipe(selectedPipe);
  const allConnections = instance.getAllConnections();
  const pipeHasConnection = allConnections.some(
    (con) => con.sourceId === selectedPipe || con.targetId === selectedPipe
  );

  while (true) {
    newPipeName = prompt("Please enter a pipe name:");

    let nameExists = Array.from(appState.getState().pipes.values()).includes(
      newPipeName
    );

    if (nameExists) {
      alert("This name is already taken. Please enter another name.");
    } else if (pipeHasConnection && pipeWasNamedBefore && newPipeName) {
      if (
        confirm(
          "Changing the pipe name will adjust your code in the filter! All old pipe names will be replaced by the new one."
        )
      ) {
        const oldPipeName = appState.getPipe(selectedPipe);

        const tagetIds = allConnections
          .filter((con) => con.sourceId === selectedPipe)
          .map((con) => con.targetId);
        const sourceIds = allConnections
          .filter((con) => con.targetId === selectedPipe)
          .map((con) => con.sourceId);
        const filterIDs = [...tagetIds, ...sourceIds];

        const filterEditors = [];
        filterIDs.forEach((id) => {
          const codeEditorEl = document.getElementById(`codeEditor${id}`);
          if (codeEditorEl) {
            const editor = codeEditorEl.editor;
            filterEditors.push(editor);
          }
        });

        if (filterEditors.length !== 0) {
          filterEditors.forEach((editor) =>
            renamePipeNamesInCode(editor, oldPipeName, newPipeName)
          );
        }
        break;
      } else {
        newPipeName = null;
        break;
      }
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
    newFilterName = prompt("Please enter a filter name:");
    const allFilterNames = document.querySelectorAll("#Diagram #FilterName");
    let nodeArray = Array.from(allFilterNames);
    let innerHTMLArray = nodeArray.map((node) => node.innerHTML);
    const nameExists = innerHTMLArray.includes(newFilterName);

    if (nameExists) {
      alert("This name is already taken. Please enter another name.");
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
