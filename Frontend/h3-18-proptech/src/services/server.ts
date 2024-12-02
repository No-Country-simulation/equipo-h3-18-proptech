import axios from "axios";

export const backend = axios.create({
    baseURL: "https://www.equipo-h3-18-proptechbackend.somee.com/api"
  });