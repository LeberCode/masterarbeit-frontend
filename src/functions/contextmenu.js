import { duplicatePipe, duplicateFilter } from "./duplication";
import { codeEditor } from "./codeEditor";
import { scaleOut } from "./api";

export const initContextmenu = (instance) => {
  // Kontext Menü zum Löschen von Connections
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

  // Kontext Menü zum Löschen von Filters
  $("body").on("contextmenu", "#Diagram .Filter", (event) => {
    event.preventDefault();
    window.selectedFilter = $(event.currentTarget).attr("id");
    $(
      `<div style='display: flex; flex-direction: column;' class='custom-menu'>
        <button style='border: none; padding: 6px 12px;' class='duplicate-filter'>
          Duplicate Filter
        </button>
        <button style='border: none; padding: 6px 12px;' class='code-filter'>
          Code Filter
        </button>
        <button style='background-color: blue; color: white; border: none; padding: 6px 12px;' class='scale-out'>
          SCALE OUT
        </button>
        <button style='background-color: red; color: white; border: none; padding: 6px 12px;' class='delete-filter'>
          Delete Filter
        </button>
      </div>"`
    )
      .appendTo("body")
      .css({ top: event.pageY + "px", left: event.pageX + "px" });
  });

  $("body").on("click", ".delete-filter", (event) => {
    instance.remove(window.selectedFilter);
  });
  $("body").on("click", ".duplicate-filter", (event) => {
    duplicateFilter(instance);
  });
  $("body").on("click", ".code-filter", (event) => {
    codeEditor(instance);
  });
  $("body").on("click", ".scale-out", (event) => {
    scaleOut(window.selectedFilter);
  });

  // Kontext Menü zum Löschen von Pipes
  $("body").on("contextmenu", "#Diagram .Pipe", (event) => {
    event.preventDefault();
    window.selectedPipe = $(event.currentTarget).attr("id");
    $(
      `<div style='display: flex; flex-direction: column;' class='custom-menu'>
        <button style='border: none; padding: 6px 12px;' class='duplicate-pipe'>
          Duplicate Pipe
        </button>
        <button style='background-color: red; color: white; border: none; padding: 6px 12px;' class='delete-pipe'>
          Delete Pipe
        </button>
      </div>`
    )
      .appendTo("body")
      .css({ top: event.pageY + "px", left: event.pageX + "px" });
  });

  $("body").on("click", ".delete-pipe", (event) => {
    instance.remove(window.selectedPipe);
  });
  $("body").on("click", ".duplicate-pipe", (event) => {
    duplicatePipe(instance);
  });
};
