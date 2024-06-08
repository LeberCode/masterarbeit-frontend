import "./style.css";
import { v4 as uuidv4 } from "uuid";
import { jsPlumb } from "jsplumb";
import { INTERCEPT_BEFORE_DROP, EVENT_DRAG_START } from "@jsplumb/browser-ui";
import { isConnectionAllowed } from "./functions/isConnectionAllowed";
import { initContextmenu } from "./functions/contextmenu";
import { createEndpoints } from "./functions/createEndpoint";
import {
  runCustomCode,
  stopCustomCode,
  restartCustomCode,
} from "./functions/api";

function App() {
  const appState = (() => {
    let state = {
      beenPaused: false,
    };

    return {
      getState: () => state,
      setBeenPaused: (beenPaused) => (state.beenPaused = beenPaused),
    };
  })();
  const instance = jsPlumb.getInstance({});
  instance.setContainer("diagram");
  instance.ready(() => {
    instance.registerConnectionTypes({
      flow: {
        paintStyle: { stroke: "blue", strokeWidth: 2 },
        hoverPaintStyle: { stroke: "blue", strokeWidth: 3 },
        connector: ["Flowchart", { cornerRadius: 25 }],
      },
    });

    // instance.bind(EVENT_DRAG_START, function (info) {
    //   console.log("HI");
    //   console.log(info);
    // });

    // Überprüft ob die Connection valide ist
    instance.bind(INTERCEPT_BEFORE_DROP, function (info) {
      var source = document.getElementById(info.sourceId);
      var target = document.getElementById(info.targetId);
      if (!isConnectionAllowed(source, target)) {
        return false;
      }
      return true;
    });

    // Elemente draggable machen
    $("#Toolbox .Filter").draggable({
      helper: "clone",
      containment: "body",
      appendTo: "#Diagram",
    });
    $("#Toolbox .Pipe").draggable({
      helper: "clone",
      containment: "body",
      appendTo: "#Diagram",
    });

    // Diagramm DIV droppable machen
    $("#Diagram").droppable({
      drop: function (event, ui) {
        var id = uuidv4();
        var clone = $(ui.helper).clone(true);
        clone.attr("id", id);
        clone.appendTo(this);

        var element = document.getElementById(id);
        var type = element.dataset.type;

        instance.draggable(id, { containment: true });
        createEndpoints(instance, id, type);
      },
    });
    initContextmenu(instance);
  });

  document.getElementById("Run").addEventListener("click", () => {
    if (!appState.getState().beenPaused) {
      runCustomCode();
      appState.setBeenPaused(true);
    } else {
      restartCustomCode();
    }
  });

  document.getElementById("Stop").addEventListener("click", () => {
    stopCustomCode();
  });
}

App();
