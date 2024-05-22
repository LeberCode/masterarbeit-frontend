import axios from "axios";
import { SERVER_URL } from "../config";

export const deployCustomCode = () => {
  axios
    .post(`${SERVER_URL}/deploy`)
    .then((response) => {
      if (response.status === 200) {
        console.log("Serverantwort:", response);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const createCustomCode = (requestBody) => {
  axios
    .post(`${SERVER_URL}/customCode`, requestBody)
    .then((response) => {
      if (response.status === 200) {
        console.log("Serverantwort:", response);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
