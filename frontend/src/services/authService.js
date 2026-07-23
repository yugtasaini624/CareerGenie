import axios from "axios";

const API = axios.create({
  baseURL: "https://career-genie-backend-gf7z.onrender.com/api/auth",
});

export const registerUser = (data) => {
  return API.post("/register", data);
};

export const loginUser = (data) => {
  return API.post("/login", data);
};
