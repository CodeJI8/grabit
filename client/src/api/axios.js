import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost/grabit/api/index.php",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;