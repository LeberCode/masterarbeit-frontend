import { appState } from "./state";
import { showCheck } from "./visualValidation";

export const getPipesForFilter = (instance) => {
  const filter = window.selectedFilter;
  const allConnections = instance.getAllConnections();

  const incomingConnections = allConnections
    .filter((connection) => connection.targetId === filter)
    .map((connection) => ({
      pipeId: connection.sourceId,
      pipeType: connection.source.dataset.pipetype,
      pipeDirection: "in",
    }));
  const outgoingConnections = allConnections
    .filter((connection) => connection.sourceId === filter)
    .map((connection) => ({
      pipeId: connection.targetId,
      pipeType: connection.target.dataset.pipetype,
      pipeDirection: "out",
    }));

  const connectionsForFilter = incomingConnections.concat(outgoingConnections);

  const pipeMapping = [];
  let defaultCount = 1;
  connectionsForFilter &&
    connectionsForFilter.forEach((connection) => {
      const pipeName = appState.getPipe(connection.pipeId);
      if (!pipeName) {
        const pipeName = `Default${defaultCount}`;
        appState.addPipe(connection, pipeName);
        const pipe = { pipeName, ...connection };
        pipeMapping.push(pipe);
        const spanToChange = document.querySelector(
          `#${connection.pipeId} #PipeName`
        );
        spanToChange.innerHTML = `${pipeName}`;
        showCheck(connection.pipeId);
        instance.repaintEverything();
        defaultCount++;
      } else {
        const pipe = { pipeName, ...connection };
        pipeMapping.push(pipe);
      }
    });
  buildPipesElements(pipeMapping);
  return pipeMapping;
};

export const handlePipeBinding = (pipeMapping, editor) => {
  // clear pipe-binindg code
  let codeArray = editor.state.doc.toString();
  const start = "        // incoming Pipes";
  const middle = "        // outgoing Pipes";
  const end = "        // END pipe-binding";

  const startIndex = codeArray.indexOf(start);
  const midIndexIn = codeArray.indexOf(middle);

  if (startIndex && midIndexIn) {
    const transactionForIn = editor.state.update({
      changes: [
        {
          from: startIndex + start.length,
          to: midIndexIn,
          insert: "\n\n",
        },
      ],
    });
    editor.dispatch(transactionForIn);
  }
  codeArray = editor.state.doc.toString();
  const midIndexOut = codeArray.indexOf(middle);
  const endIndex = codeArray.indexOf(end);

  if (midIndexOut && endIndex) {
    const transactionForOut = editor.state.update({
      changes: [
        {
          from: midIndexOut + middle.length,
          to: endIndex,
          insert: "\n",
        },
      ],
    });
    editor.dispatch(transactionForOut);
  }

  // insert pipe-binding-code
  const incomingPipes = pipeMapping.filter(
    (pipe) => pipe.pipeDirection === "in"
  );
  const outgoingPipes = pipeMapping.filter(
    (pipe) => pipe.pipeDirection === "out"
  );
  let lineNumberIn = 16;
  let lineNumberOut = 18 + incomingPipes.length * 4;

  fillEditorwithCode(editor, incomingPipes, lineNumberIn);
  fillEditorwithCode(editor, outgoingPipes, lineNumberOut);
};

const makeValidConstName = (str) => {
  // Entferne nicht erlaubte Zeichen, nur Buchstaben, Zahlen, _ und $ sind erlaubt
  let validStr = str.replace(/[^a-zA-Z0-9_$ ]/g, ""); // Behalte Leerzeichen für CamelCase

  // Konvertiere zu CamelCase
  validStr = validStr
    .split(" ")
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");

  // Stelle sicher, dass der Name nicht mit einer Zahl beginnt
  if (/^[0-9]/.test(validStr)) {
    validStr = "_" + validStr;
  }

  // Überprüfen und anpassen, falls der Name ein reserviertes Wort ist
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

const buildPipesElements = (pipeMapping) => {
  const incomingPipes = pipeMapping.filter(
    (pipe) => pipe.pipeDirection === "in"
  );
  const outgoingPipes = pipeMapping.filter(
    (pipe) => pipe.pipeDirection === "out"
  );

  const incomingPipesElement = document.querySelector(
    `#codeEditor${window.selectedFilter} #incomingPipes`
  );
  const outgoingPipesElement = document.querySelector(
    `#codeEditor${window.selectedFilter} #outgoingPipes`
  );
  incomingPipesElement.innerHTML = "";
  outgoingPipesElement.innerHTML = "";

  incomingPipes.forEach((pipe) => {
    const pipeElement = document.createElement("span");
    pipeElement.appendChild(document.createTextNode(pipe.pipeName));
    pipeElement.style.marginRight = "6px";
    incomingPipesElement.appendChild(pipeElement);
  });
  outgoingPipes.forEach((pipe) => {
    const pipeElement = document.createElement("span");
    pipeElement.appendChild(document.createTextNode(pipe.pipeName));
    pipeElement.style.marginLeft = "6px";
    outgoingPipesElement.appendChild(pipeElement);
  });
};

const fillEditorwithCode = (editor, pipeMapping, lineNumber) => {
  pipeMapping.forEach((pipe) => {
    let line = editor.state.doc.line(lineNumber);
    let position = line.from;
    let pipeNameUserGiven = pipe.pipeName;
    let pipeNameDeklaration = makeValidConstName(pipeNameUserGiven);
    let insertCode = `\t\tconst ${pipeNameDeklaration} = "${pipeNameUserGiven}";\n\t\tchannel.assert${
      pipe.pipeType === "Queue" ? "Queue" : "Exchange"
    }(${pipeNameDeklaration}, ${
      pipe.pipeType === "Topic" ? `"topic", ` : ""
    }{\n\t\t\tdurable: false\n\t\t});\n`;
    let transaction = editor.state.update({
      changes: {
        from: position,
        insert: insertCode,
      },
    });
    editor.dispatch(transaction);
    lineNumber = lineNumber + 4;
  });
};
