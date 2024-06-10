export const loading = (isLoading) => {
  const loading = isLoading ? "visible" : "hidden";
  document.getElementById("Loader").style.visibility = loading;
};
