import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost/grabit/api/index.php",
  
});

export default api;