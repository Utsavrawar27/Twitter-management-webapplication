import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000/",
  timeout: 60000,
});

const Exception = (message) => {
  const error = new Error(message);

  error.success = false;

  return error;
};

const processError = (error) => {
  if (error?.response?.data) {
    // client received an error response (5xx, 4xx)

    throw Exception(error?.response?.data?.message);
  }

  if (error?.request) {
    // client never received a response, or request never left
    throw Exception("It's not you, it's us, want to give it another try?");
  }

  // anything else
  throw Exception("Oops! Something went wrong.");
};

export const getTweet = async (params) => {
  try {
    const response = await API.get("/getTweet", {
      params,
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const createTweet = async (params) => {
  try {
    const response = await API.get("/sendTweet", {
      params,
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const deleteTweet = async (params) => {
  try {
    const response = await API.get("/deleteTweet", {
      params,
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};
