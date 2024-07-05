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

// before Change - not sure what to take
// export const showDeployIcons = () => {
//   let elementsToHide = document.querySelectorAll(
//     "#Diagram .Filter #Warning, #Diagram .Filter #Check, #Diagram .Filter #PauseIcon"
//   );
//   elementsToHide.forEach((element) => (element.style.visibility = "hidden"));

//   let iconsToShow = document.querySelectorAll("#Diagram .Filter #DeployIcon");
//   iconsToShow.forEach((element) => (element.style.visibility = "visible"));

//   let filterToChange = document.querySelectorAll("#Diagram .Filter");
//   filterToChange.forEach((element) => (element.style.borderColor = "blue"));
// };

export const showDeployIcon = (id) => {
  var selectedElement = document.getElementById(id);
  selectedElement.style.borderColor = "blue";
  var warningEl = selectedElement.querySelector("#Warning");
  warningEl && (warningEl.style.visibility = "hidden");
  var checkEl = selectedElement.querySelector("#Check");
  checkEl && (checkEl.style.visibility = "hidden");
  var deployEl = selectedElement.querySelector("#DeployIcon");
  deployEl && (deployEl.style.visibility = "visible");
  var pauseEl = selectedElement.querySelector("#PauseIcon");
  pauseEl && (pauseEl.style.visibility = "hidden");
};

// before Change - not sure what to take
// export const showPause = () => {
//   let elementsToHide = document.querySelectorAll(
//     "#Diagram .Filter #Warning, #Diagram .Filter #Check, #Diagram .Filter #DeployIcon"
//   );
//   elementsToHide.forEach((element) => (element.style.visibility = "hidden"));

//   let iconsToShow = document.querySelectorAll("#Diagram .Filter #PauseIcon");
//   iconsToShow.forEach((element) => (element.style.visibility = "visible"));

//   let filterToChange = document.querySelectorAll("#Diagram .Filter");
//   filterToChange.forEach((element) => (element.style.borderColor = "orange"));
// };

export const showPause = () => {
  let elementsToHide = document.querySelectorAll("#Diagram .Filter");
  elementsToHide.forEach((el) => {
    const isVisible = el.childNodes[11].style.visibility === "visible";
    if (isVisible) {
      el.childNodes[11].style.visibility = "hidden";
      el.childNodes[13].style.visibility = "visible";
      el.style.borderColor = "orange";
    }
  });
};

export const showAllWarning = () => {
  let elementsToHide = document.querySelectorAll(
    "#Diagram .Filter #DeployIcon, #Diagram .Filter #PauseIcon, #Diagram .Filter #Check"
  );
  elementsToHide.forEach((element) => (element.style.visibility = "hidden"));

  let iconsToShow = document.querySelectorAll("#Diagram .Filter #Warning");
  iconsToShow.forEach((element) => (element.style.visibility = "visible"));

  let filterToChange = document.querySelectorAll("#Diagram .Filter");
  filterToChange.forEach((element) => (element.style.borderColor = "black"));
};
