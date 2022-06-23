import axios from "../tools/axios";
import { ref } from "vue";

const addTask = (newTask) => {
  const task = ref(null);
  const error = ref(null);

  const loadWithFetch = async () => {
    const response = await fetch("http://161.97.129.182:5500/tasks", {
      method: "POST",
      body: JSON.stringify(newTask),
    });
    const data = await response.json();
    task.value = { _id: data, ...newTask };
  };

  const load = async () => {
    await axios
      .post("/tasks", newTask)
      .then((res) => {
        task.value = { _id: res.data, ...newTask };
      })
      .catch((err) => {
        error.value = true;
      });
  };
  return { task, error, load };
};
export default addTask;
