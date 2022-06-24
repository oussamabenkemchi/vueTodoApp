import axios from "axios";

const instance = axios.create({
  baseURL: "https://vue3-todo-app.herokuapp.com/",
});

export default instance;
