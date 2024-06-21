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
      let pipeNameUserGiven = pipe.pipeName;
      let pipeNameDeklaration = transformPipeName(pipeNameUserGiven);
      pipeNameUserGiven.replace(/\s+/g, "");
      let insertCode = `\t\tconst ${pipeNameDeklaration} = "${pipeNameUserGiven}"\n\t\tawait channel.assertQueue(${pipeNameDeklaration}, {\n\t\t\tdurable: false\n\t\t});\n`;
      let transaction = editor.state.update({
        changes: {
          from: position,
          insert: insertCode,
        },
      });
      editor.dispatch(transaction);
      lineNumber++;
    }
  });
};

const transformPipeName = (str) => {
  if (!str) return str;
  const noSpacesStr = str.replace(/\s+/g, "");
  if (noSpacesStr.length === 0) return "";
  return noSpacesStr.charAt(0).toLowerCase() + noSpacesStr.slice(1);
};
