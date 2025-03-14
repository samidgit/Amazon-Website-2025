import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/backend2025-773c6/us-central1/api",
  //   baseURL: "https://api-ka7ru5stwq-uc.a.run.app",
  baseURL: "https://us-central1-backend2025-773c6.cloudfunctions.net/api",
});




export { axiosInstance }




