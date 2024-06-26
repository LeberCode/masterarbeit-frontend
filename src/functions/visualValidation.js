export const showWarning = (id) => {
  const selectedElement = document.getElementById(id);
  selectedElement.style.borderColor = "black";
  var warningEl = selectedElement.querySelector("#Warning");
  warningEl && (warningEl.style.visibility = "visible");
  var checkEl = selectedElement.querySelector("#Check");
  checkEl && (checkEl.style.visibility = "hidden");
  var deployEl = selectedElement.querySelector("#DeployIcon");
  deployEl && (deployEl.style.visibility = "hidden");
  var pauseEl = selectedElement.querySelector("#PauseIcon");
  pauseEl && (pauseEl.style.visibility = "hidden");
};
export const showCheck = (id) => {
  var selectedElement = document.getElementById(id);
  selectedElement.style.borderColor = "green";
  var warningEl = selectedElement.querySelector("#Warning");
  warningEl && (warningEl.style.visibility = "hidden");
  var checkEl = selectedElement.querySelector("#Check");
  checkEl && (checkEl.style.visibility = "visible");
  var deployEl = selectedElement.querySelector("#DeployIcon");
  deployEl && (deployEl.style.visibility = "hidden");
  var pauseEl = selectedElement.querySelector("#PauseIcon");
  pauseEl && (pauseEl.style.visibility = "hidden");
};
export const showDeployIcon = () => {
  let elementsToHide = document.querySelectorAll(
    "#Diagram #Warning, #Diagram #Check, #Diagram #PauseIcon"
  );
  elementsToHide.forEach((element) => (element.style.visibility = "hidden"));

  let iconsToShow = document.querySelectorAll("#Diagram #DeployIcon");
  iconsToShow.forEach((element) => (element.style.visibility = "visible"));

  let filterToChange = document.querySelectorAll("#Diagram .Filter");
  filterToChange.forEach((element) => (element.style.borderColor = "blue"));
};

export const showPause = () => {
  let elementsToHide = document.querySelectorAll(
    "#Diagram #Warning, #Diagram #Check, #Diagram #DeployIcon"
  );
  elementsToHide.forEach((element) => (element.style.visibility = "hidden"));

  let iconsToShow = document.querySelectorAll("#Diagram #PauseIcon");
  iconsToShow.forEach((element) => (element.style.visibility = "visible"));

  let filterToChange = document.querySelectorAll("#Diagram .Filter");
  filterToChange.forEach((element) => (element.style.borderColor = "orange"));
};

export const showAllWarning = () => {
  let elementsToHide = document.querySelectorAll(
    "#Diagram #DeployIcon, #Diagram #PauseIcon, #Diagram #Check"
  );
  elementsToHide.forEach((element) => (element.style.visibility = "hidden"));

  let iconsToShow = document.querySelectorAll("#Diagram #Warning");
  iconsToShow.forEach((element) => (element.style.visibility = "visible"));

  let filterToChange = document.querySelectorAll("#Diagram .Filter");
  filterToChange.forEach((element) => (element.style.borderColor = "black"));
};
