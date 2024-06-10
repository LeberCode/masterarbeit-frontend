import axios from "axios";
import { SERVER_URL } from "../config";
import { loading } from "./loader";

export const runCustomCode = () => {
  loading(true);
  axios
    .post(`${SERVER_URL}/deployment/run`)
    .then((response) => {
      loading(false);
      if (response.status === 200) {
        console.log("Serverantwort:", response);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const stopCustomCode = () => {
  loading(true);
  axios
    .post(`${SERVER_URL}/deployment/stop`)
    .then((response) => {
      loading(false);
      if (response.status === 200) {
        console.log("Serverantwort:", response);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
export const restartCustomCode = () => {
  loading(true);
  axios
    .post(`${SERVER_URL}/deployment/restart`)
    .then((response) => {
      loading(false);
      if (response.status === 200) {
        console.log("Serverantwort:", response);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const createCustomCode = (requestBody) => {
  loading(true);
  axios
    .post(`${SERVER_URL}/customCode`, requestBody)
    .then((response) => {
      loading(false);
      if (response.status === 200) {
        console.log("Serverantwort:", response);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const clearArchitecture = () => {
  loading(true);
  axios
    .get(`${SERVER_URL}/deployment/clearDocker`)
    .then((response) => {
      loading(false);
      if (response.status === 200) {
        console.log("Serverantwort:", response);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
