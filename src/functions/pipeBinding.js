import { appState } from "./state";
import { showCheck } from "./visualValidation";

export const getPipesForFilter = () => {
  const filter = window.selectedFilter;
  const connections = appState.getConnection(filter);
  const pipeMapping = [];
  let defaultCount = 1;
  connections &&
    connections.forEach((connection) => {
      const pipeName = appState.getPipe(connection);
      if (!pipeName) {
        const pipeName = `Default${defaultCount}`;
        appState.addPipe(connection, pipeName);
        const pipe = { pipeName, connection };
        pipeMapping.push(pipe);
        const spanToChange = document.querySelector(`#${connection} #PipeName`);
        spanToChange.innerHTML = `"${pipeName}"`;
        showCheck(connection);
        defaultCount++;
      } else {
        const pipe = { pipeName, connection };
        pipeMapping.push(pipe);
      }
    });
  return pipeMapping;
};

export const handlePipeBinding = (pipeMapping, editor) => {
  let lineNumber = 14;
  let editorCodeText = editor.state.doc.toString();
  pipeMapping.forEach((pipe) => {
    if (
      editorCodeText.includes(
        `const ${pipe.pipeName.replace(/\s+/g, "")}Pipe = "${pipe.pipeName}"`
      )
    ) {
      return;
    } else {
      let line = editor.state.doc.line(lineNumber);
      let position = line.from;
      let transaction = editor.state.update({
        changes: {
          from: position,
          insert: `\t\tconst ${pipe.pipeName.replace(/\s+/g, "")}Pipe = "${
            pipe.pipeName
          }"\n`,
        },
      });
      editor.dispatch(transaction);
      lineNumber++;
    }
  });
};
