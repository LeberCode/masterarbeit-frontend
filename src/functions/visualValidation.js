export const showWarning = (id) => {
  const selectedElement = document.getElementById(id);
  var checkDomElement = selectedElement.querySelector("#Warning");
  checkDomElement.style.visibility = "visible";
  var dockerDomElement = selectedElement.querySelector("#Check");
  dockerDomElement.style.visibility = "hidden";
  var dockerDomElement = selectedElement.querySelector("#Docker");
  dockerDomElement.style.visibility = "hidden";
};
export const showCheck = (id) => {
  var selectedElement = document.getElementById(id);
  var checkDomElement = selectedElement.querySelector("#Warning");
  checkDomElement.style.visibility = "hidden";
  var dockerDomElement = selectedElement.querySelector("#Check");
  dockerDomElement.style.visibility = "visible";
  var dockerDomElement = selectedElement.querySelector("#Docker");
  dockerDomElement.style.visibility = "hidden";
};
export const showDocker = () => {
  let elementsToHide = document.querySelectorAll("#Warning, #Check");
  elementsToHide.forEach((element) => (element.style.visibility = "hidden"));

  let elementsToShow = document.querySelectorAll("#Diagram #Docker");
  elementsToShow.forEach((element) => (element.style.visibility = "visible"));
};
