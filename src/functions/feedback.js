export const loader = (isLoading) => {
  const loading = isLoading ? "visible" : "hidden";
  document.getElementById("Loader").style.visibility = loading;
};

export const errorFeedback = (errorMsg) => {
  const errorMsgElement = document.createElement("p");
  errorMsgElement.appendChild(
    document.createTextNode(errorMsg.response.data.message)
  );
  document.getElementById("Error").appendChild(errorMsgElement);

  document.getElementById("Error").style.visibility = "visible";
  setTimeout(function () {
    document.getElementById("Error").style.visibility = "hidden";
    errorMsgElement.remove();
  }, 5000);
};

export const errorFeedbackSimple = (errorMsg) => {
  const errorMsgElement = document.createElement("p");
  errorMsgElement.appendChild(document.createTextNode(errorMsg));
  document.getElementById("Error").appendChild(errorMsgElement);

  document.getElementById("Error").style.visibility = "visible";
  setTimeout(function () {
    document.getElementById("Error").style.visibility = "hidden";
    errorMsgElement.remove();
  }, 5000);
};

export const successFeedback = () => {
  document.getElementById("Success").style.visibility = "visible";
  setTimeout(function () {
    document.getElementById("Success").style.visibility = "hidden";
  }, 1000);
};
