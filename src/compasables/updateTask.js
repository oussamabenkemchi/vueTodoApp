import { ref } from "vue";
import axios from "../tools/axios";

const updateTask = (task) => {
  const success = ref(false);

  let data = { status: !task.status };
  const load = async () => {
    await axios
      .patch(`/task/${task._id}`, data)
      .then((response) => {
        success.value = true;
      })
      .catch((error) => {
        success.value = false;
      });
  };

  return { success, load };
};
export default updateTask;
