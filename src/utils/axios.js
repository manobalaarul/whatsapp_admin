import axios from "axios";
import { baseUrl } from "../common/Summaryapi";

const Axios = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default Axios;