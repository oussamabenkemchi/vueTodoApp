import { ref } from "vue";
import axios from "../tools/axios";

const getTasks = () => {
  const tasks = ref([]);
  const error = ref(null);

  const load = async () => {
    await axios
      .get("/tasks")
      .then((response) => {
        tasks.value = response.data;
      })
      .catch((error) => {
        error.value = true;
      });
  };

  return { tasks, error, load };
};
export default getTasks;
