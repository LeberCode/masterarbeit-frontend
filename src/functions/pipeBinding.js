import { appState } from "./state";
import { errorFeedbackSimple } from "./feedback";

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

export const handlePipeBinding = (pipeMapping, editor) => {
  let lineNumber = 14;
  pipeMapping.forEach((pipe) => {
    let line = editor.state.doc.line(lineNumber);
    let position = line.from;
    let transaction = editor.state.update({
      changes: {
        from: position,
        insert: `\t\tconst ${pipe.pipeName.replace(/\s+/g, "")} = "${
          pipe.pipeName
        }"\n`,
      },
    });
    editor.dispatch(transaction);
    lineNumber++;
  });
};
