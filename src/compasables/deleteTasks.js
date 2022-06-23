import { ref } from "vue";
import axios from "../tools/axios";

const deleteTasks = () => {
  const success = ref(false);
  const load = async () => {
    await axios
      .delete("/tasks")
      .then((response) => {
        success.value = true;
        console.log(response);
      })
      .catch((error) => {
        error.success = false;
      });
  };

  return { success, load };
};
export default deleteTasks;
