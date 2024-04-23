import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    // If token exists, add it to the request headers
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // If token doesn't exist, remove it from the request headers
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
