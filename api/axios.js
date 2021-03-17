import axios from "axios";

axios.defaults.baseURL = `https://htmlacademy-react-3.appspot.com/wtw/`;
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;

export default axios;
