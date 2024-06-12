import { scaleValues } from "./api";

export const getScaleValues = async () => {
  const values = await scaleValues();
  console.log("### values: ", values);
  values.forEach((value) => {
    const filter = document.getElementById(value.id);
    const scale = filter.querySelector(".Scale");
    scale.textContent = value.count;
  });
};
