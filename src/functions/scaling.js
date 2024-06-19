import { scaleValues } from "./api";

export const getScaleValues = async () => {
  const values = await scaleValues();
  if (values.length !== 0) {
    values.forEach((value) => {
      const filter = document.getElementById(value.id);
      const scale = filter.querySelector(".Scale");
      scale.textContent = value.count;
    });
  } else {
    // kill Deployment was triggerd
    const diagramElement = document.getElementById("Diagram");
    const allArchElements = diagramElement.querySelectorAll(".Filter");
    allArchElements.forEach((element) => {
      const scale = element.querySelector(".Scale");
      scale.textContent = 0;
    });
  }
};
