import axios from "@/api/axios";

const getFilms = () => {
  return axios.get("/films");
};

export default {
  getFilms
};
