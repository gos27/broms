import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://school-e847b-default-rtdb.firebaseio.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default apiClient;
