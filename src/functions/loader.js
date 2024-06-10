export const loading = (isLoading) => {
  const loading = isLoading ? "visible" : "hidden";
  console.log("Loading: ", loading);
  document.getElementById("Loader").style.visibility = loading;
};
