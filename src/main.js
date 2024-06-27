import "./style.css";
import { v4 as uuidv4 } from "uuid";
import { jsPlumb } from "jsplumb";
import { INTERCEPT_BEFORE_DROP } from "@jsplumb/browser-ui";
import { isConnectionAllowed } from "./functions/isConnectionAllowed";
import { initContextmenu } from "./functions/contextmenu";
import { createEndpoints } from "./functions/endpoints";
import { appState } from "./functions/state";
import {
  runCustomCode,
  stopCustomCode,
  restartCustomCode,
  clearArchitecture,
  clearModel,
} from "./functions/api";
import { getScaleValues } from "./functions/scaling";
import { showAllWarning, showPause } from "./functions/visualValidation";
import { coorectId } from "./functions/id";

function App() {
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

    // Überprüft ob die Connection valide ist
    instance.bind(INTERCEPT_BEFORE_DROP, function (info) {
      var source = document.getElementById(info.sourceId);
      var target = document.getElementById(info.targetId);
      if (!isConnectionAllowed(source, target)) {
        return false;
      }

      const pipe = source.getAttribute("class").includes("Filter")
        ? target
        : source;
      const filter = source.getAttribute("class").includes("Filter")
        ? source
        : target;

      appState.addConnection(filter.id, {
        pipeId: pipe.id,
        pipeType: pipe.textContent.replace(/\s+/g, "").split(`"`)[0],
      });

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
        var id = coorectId(uuidv4());
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

  const deployElement = document.getElementById("Deploy");
  const pauseElement = document.getElementById("Pause");
  const clearModelElement = document.getElementById("ClearModel");
  const killDeploymentElement = document.getElementById("KillDeployment");

  deployElement.addEventListener("click", () => {
    if (!appState.getState().beenPaused) {
      runCustomCode();
      deployElement.removeAttribute("disabled");
      appState.setBeenPaused(true);
    } else {
      restartCustomCode();
    }
    getScaleValues();
    deployElement.setAttribute("disabled", "disabled");
    pauseElement.removeAttribute("disabled");
    killDeploymentElement.disabled = false;
    clearModelElement.disabled = true;
  });

  pauseElement.addEventListener("click", () => {
    stopCustomCode();
    showPause();
    pauseElement.setAttribute("disabled", "disabled");
    deployElement.innerHTML = "Restart";
    deployElement.removeAttribute("disabled");
  });
  pauseElement.setAttribute("disabled", "disabled");
  deployElement.setAttribute("disabled", "disabled");

  clearModelElement.addEventListener("click", async () => {
    let elements = document.querySelectorAll(
      "#Diagram .Filter, #Diagram .Pipe, .jtk-endpoint, .jtk-connector"
    );
    elements.forEach((element) => element.remove());
    await clearModel();
  });

  killDeploymentElement.addEventListener("click", async () => {
    await clearArchitecture();
    pauseElement.setAttribute("disabled", "disabled");
    deployElement.setAttribute("disabled", "disabled");
    clearModelElement.disabled = false;
    killDeploymentElement.disabled = true;
    await getScaleValues();
    showAllWarning();
    deployElement.innerHTML = "Deploy";
  });
}

window.addEventListener("beforeunload", async function (event) {
  await clearArchitecture();
});

App();
