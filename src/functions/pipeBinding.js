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
      let pipeNameDeklaration = makeValidConstName(pipeNameUserGiven);
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

const makeValidConstName = (str) => {
  // Entferne nicht erlaubte Zeichen, nur Buchstaben, Zahlen, _ und $ sind erlaubt
  let validStr = str.replace(/[^a-zA-Z0-9_$]/g, "");

  // Stelle sicher, dass der Name nicht mit einer Zahl beginnt
  if (/^[0-9]/.test(validStr)) {
    validStr = "_" + validStr;
  }

  // Überprüfen und anpassen, falls der Name ein reserviertes Wort ist (einfaches Beispiel)
  const reservedWords = new Set([
    "var",
    "let",
    "const",
    "function",
    "if",
    "else",
    "for",
    "while",
    "return",
    "null",
    "true",
    "false",
    "new",
    "class",
    "import",
    "export",
    "default",
  ]);
  if (reservedWords.has(validStr)) {
    validStr = "_" + validStr;
  }

  // Fallback, falls der String nach Entfernen aller ungültigen Zeichen leer ist
  if (validStr.length === 0) {
    validStr = "_const";
  }

  return validStr;
};
