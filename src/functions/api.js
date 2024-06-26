import axios from "axios";
import { SERVER_URL } from "../config";
import { loader, errorFeedback, successFeedback } from "./feedback";
import { getScaleValues } from "./scaling";

export const runCustomCode = () => {
  loader(true);
  axios
    .post(`${SERVER_URL}/deployment/run`)
    .then((response) => {
      loader(false);
      if (response.status === 200) {
        successFeedback();
      } else {
        errorFeedback(response);
      }
    })
    .catch((error) => {
      loader(false);
      errorFeedback(error);
      console.error(error);
    });
};

export const stopCustomCode = () => {
  loader(true);
  axios
    .post(`${SERVER_URL}/deployment/stop`)
    .then((response) => {
      loader(false);
      if (response.status === 200) {
        successFeedback();
      } else {
        errorFeedback(response);
      }
    })
    .catch((error) => {
      loader(false);
      errorFeedback(error);
      console.error(error);
    });
};
export const restartCustomCode = () => {
  loader(true);
  axios
    .post(`${SERVER_URL}/deployment/restart`)
    .then((response) => {
      loader(false);
      if (response.status === 200) {
        successFeedback();
      } else {
        errorFeedback(response);
      }
    })
    .catch((error) => {
      loader(false);
      errorFeedback(error);
      console.error(error);
    });
};

export const createCustomCode = (requestBody) => {
  loader(true);
  axios
    .post(`${SERVER_URL}/customCode`, requestBody)
    .then((response) => {
      loader(false);
      if (response.status === 200) {
        successFeedback();
      } else {
        errorFeedback(response);
      }
    })
    .catch((error) => {
      loader(false);
      errorFeedback(error);
      console.error(error);
    });
};

export const clearArchitecture = async () => {
  loader(true);
  await axios
    .get(`${SERVER_URL}/deployment/clearArchitecture`)
    .then((response) => {
      loader(false);
      if (response.status === 200) {
        successFeedback();
      } else {
        errorFeedback(response);
      }
    })
    .catch((error) => {
      loader(false);
      errorFeedback(error);
      console.error(error);
    });
};

export const clearModel = async () => {
  loader(true);
  await axios
    .get(`${SERVER_URL}/customCode/clear`)
    .then((response) => {
      loader(false);
      if (response.status === 200) {
        successFeedback();
      } else {
        errorFeedback(response);
      }
    })
    .catch((error) => {
      loader(false);
      errorFeedback(error);
      console.error(error);
    });
};

export const scaleOut = async (id) => {
  const requestBody = { id };
  loader(true);
  await axios
    .post(`${SERVER_URL}/deployment/scaleOut`, requestBody)
    .then((response) => {
      loader(false);
      if (response.status === 200) {
        successFeedback();
        getScaleValues();
      } else {
        errorFeedback(response);
      }
    })
    .catch((error) => {
      loader(false);
      errorFeedback(error);
      console.error(error);
    });
};

export const scaleValues = async () => {
  loader(true);
  try {
    const response = await axios.get(`${SERVER_URL}/deployment/scaleValues`);
    loader(false);

    if (response.status === 200) {
      successFeedback();
      return response.data.result;
    } else {
      errorFeedback(response);
    }
  } catch (error) {
    loader(false);
    errorFeedback(error);
    console.error(error);
  }
};
