import axios from "../tools/axios";
import { ref } from "vue";

const addTask = (newTask) => {
  const task = ref(null);
  const error = ref(null);

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
