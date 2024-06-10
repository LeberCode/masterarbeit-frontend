import axios from "axios";
import { SERVER_URL } from "../config";

export const runCustomCode = () => {
  axios
    .post(`${SERVER_URL}/deployment/run`)
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
    .post(`${SERVER_URL}/deployment/stop`)
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
    .post(`${SERVER_URL}/deployment/restart`)
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

export const clearArchitecture = () => {
  axios
    .get(`${SERVER_URL}/deployment/clearDocker`)
    .then((response) => {
      if (response.status === 200) {
        console.log("Serverantwort:", response);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
