import axios from "axios";
import { SERVER_URL } from "../config";

export const runCustomCode = () => {
  axios
    .post(`${SERVER_URL}/deploy/run`)
    .then((response) => {
      if (response.status === 200) {
        console.log("Serverantwort:", response);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const stopCustomCode = () => {
  axios
    .post(`${SERVER_URL}/deploy/stop`)
    .then((response) => {
      if (response.status === 200) {
        console.log("Serverantwort:", response);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
export const restartCustomCode = () => {
  axios
    .post(`${SERVER_URL}/deploy/restart`)
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
