import axios from "axios";
export const BASE_URL = "http://localhost:8080";

export const USER_LOGIN = 'email';
export const USER_TOKEN = 'accessToken';

export const { saveStore, saveStoreJson, getStore, getStoreJson, removeStore } = {
  // save data as string
  saveStore: (name, stringValue) => {
    localStorage.setItem(name, stringValue)
  },
  // save data as object
  saveStoreJson: (name, value) => {
    const convertValue = JSON.stringify(value)
    localStorage.setItem(name, convertValue)
    return value
  },
  getStore: (name) => {
    if (localStorage.getItem(name)) {
      return localStorage.getItem(name)
    }
    return null
  },
  getStoreJson: (name) => {
    if (localStorage.getItem(name)) {
      return JSON.parse(localStorage.getItem(name))
    }
    return null
  },
  removeStore: (name) => {
    if (localStorage.getItem(name)) {
      localStorage.removeItem(name);
    }
  },

}


export const https = axios.create({
  baseURL: BASE_URL,
  headers: {
    authorization: `Bearer ${getStore(USER_TOKEN)}`
  },
});

// khi gọi api
// Add a request interceptor
https.interceptors.request.use(
  function (config) {
    // console.log("start");
    // store_toolkit.dispatch(setLoadingOn());
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// khi api từ server về
// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    // console.log("end");
    // store_toolkit.dispatch(setLoadingOff());
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
