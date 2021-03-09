import axios from "axios";
import TokenStore from "./TokenStore";

axios.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `${TokenStore.getInstance().getToken()}`,
  };
  return config;
});

axios.interceptors.response.use((response) => {
  TokenStore.getInstance().setToken(response.headers.authorization);

  return response;
});

export default axios;
