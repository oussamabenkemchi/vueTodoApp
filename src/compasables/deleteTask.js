import { ref } from "vue";
import axios from "../tools/axios";

const deleteTask = (id) => {
  const success = ref(false);
  let data = { _id: id };
  const load = async () => {
    await axios
      .delete(`/task/${id}`)
      .then((response) => {
        success.value = true;
      })
      .catch((error) => {
        success.value = false;
      });
  };

  return { success, load };
};
export default deleteTask;
