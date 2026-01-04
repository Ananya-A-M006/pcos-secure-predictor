import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= USER ================= */

export const signupUser = async (data) => {
  const res = await API.post("signup/", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await API.post("login/", data);
  return res.data;
};

/* ================= DOCTOR ================= */

export const signupDoctor = async (data) => {
  const res = await API.post("signup/", data);
  return res.data;
};

export const loginDoctor = async (data) => {
  const res = await API.post("login/", data);
  return res.data;
};

/* ================= ML ================= */

export const predictPCOS = async (data) => {
  const res = await API.post("predict/", data);
  return res.data;
};

export default API;
