import { duplicatePipe, duplicateFilter } from "./duplication";
import { nameFilter, namePipe } from "./naming";
import { codeEditorElement } from "./codeEditor";
import { scaleOut } from "./api";
import { appState } from "./state";

export const initContextmenu = (instance) => {
  // Kontext Menü für Connections
  instance.bind("contextmenu", (component, event) => {
    if (component.hasClass("jtk-connector")) {
      event.preventDefault();
      window.selectedConnection = component;
      $(
        `<div class='custom-menu'>
          <button style='background-color: red; color: white; border: none; padding: 6px 12px;' class='delete-connection'>
            Delete connection
          </button>
        </div>`
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + "px" });
    }
  });

  $("body").on("click", ".delete-connection", (event) => {
    instance.deleteConnection(window.selectedConnection);
  });
  $(document).bind("click", (event) => {
    $("div.custom-menu").remove();
  });

  // Kontext Menü für Filter Filters
  $("body").on("contextmenu", "#Diagram .Filter", (event) => {
    event.preventDefault();
    window.selectedFilter = $(event.currentTarget).attr("id");
    $(
      `<div style='display: flex; flex-direction: column; text-align: left;' class='custom-menu'>
        <button class='custom-menu-button' id='code-filter'>
          <span style='margin-right: 6px;'> Add Implementation </span>
          <i style='color: red;' class="fa-sharp fa-solid fa-l fa-exclamation"></i>
        </button>
        <button class='custom-menu-button' id='name-filter'>
          Name Filter
        </button>
        <button class='custom-menu-button' id='duplicate-filter'>
          Duplicate Filter
        </button>
        <button class='custom-menu-button' id='scale-out'>
          Scale Out
        </button>
        <button class='custom-menu-button' id='delete-filter'>
          Delete Filter
        </button>
      </div>"`
    )
      .appendTo("body")
      .css({ top: event.pageY + "px", left: event.pageX + "px" });
  });

  $("body").on("click", "#code-filter", (event) => {
    codeEditorElement(instance);
  });
  $("body").on("click", "#name-filter", (event) => {
    nameFilter(instance);
  });
  $("body").on("click", "#duplicate-filter", (event) => {
    duplicateFilter(instance);
  });
  $("body").on("click", "#scale-out", (event) => {
    scaleOut(window.selectedFilter);
    document.getElementById("Pause").removeAttribute("disabled");
    document.getElementById("Deploy").setAttribute("disabled", "disabled");
  });
  $("body").on("click", "#delete-filter", (event) => {
    instance.remove(window.selectedFilter);
    appState.removeConnection(window.selectedFilter);
  });

  // Kontext Menü für Pipes
  $("body").on("contextmenu", "#Diagram .Pipe", (event) => {
    event.preventDefault();
    window.selectedPipe = $(event.currentTarget).attr("id");
    $(
      `<div style='display: flex; flex-direction: column;' class='custom-menu'>
        <button class='custom-menu-button' id='name-pipe'>
          <span style='margin-right: 6px;'> Name Pipe </span>
          <i style='color: red;' class="fa-sharp fa-solid fa-l fa-exclamation"></i>
        </button>
        <button class='custom-menu-button' id='duplicate-pipe'>
          Duplicate Pipe
        </button>
        <button class='custom-menu-button' id='delete-pipe'>
          Delete Pipe
        </button>
      </div>`
    )
      .appendTo("body")
      .css({ top: event.pageY + "px", left: event.pageX + "px" });
  });

  $("body").on("click", "#delete-pipe", (event) => {
    instance.remove(window.selectedPipe);
    appState.removePipe(window.selectedPipe);
    appState.removeConnectionValue(window.selectedPipe);
  });
  $("body").on("click", "#duplicate-pipe", (event) => {
    duplicatePipe(instance);
  });
  $("body").on("click", "#name-pipe", (event) => {
    namePipe(instance);
  });
};
