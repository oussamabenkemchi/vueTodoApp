import axios from "axios";

const instance = axios.create({
  baseURL: "http://161.97.129.182:5500",
});

export default instance;
