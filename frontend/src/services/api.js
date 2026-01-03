import axios from "axios";

/*
====================================
 AXIOS INSTANCE
====================================
*/
const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/*
====================================
 AUTH – USER
====================================
*/
export const signupUser = async (data) => {
  const res = await API.post("/signup/", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await API.post("/login/", data);
  return res.data;
};

/*
====================================
 AUTH – DOCTOR
====================================
*/
export const signupDoctor = async (data) => {
  const res = await API.post("/doctor/signup/", data);
  return res.data;
};

export const loginDoctor = async (data) => {
  const res = await API.post("/doctor/login/", data);
  return res.data;
};

/*
====================================
 PCOS PREDICTION
====================================
*/
export const predictPCOS = async (formData) => {
  const res = await API.post("/predict/", formData);
  return res.data;
};

/*
====================================
 USER HISTORY
====================================
*/
export const getHistory = async () => {
  const res = await API.get("/history/");
  return res.data;
};

/*
====================================
 APPOINTMENTS
====================================
*/
export const requestAppointment = async (payload) => {
  const res = await API.post("/appointment/request/", payload);
  return res.data;
};

export const getDoctorAppointments = async () => {
  const res = await API.get("/doctor/appointments/");
  return res.data;
};

export const confirmAppointment = async (payload) => {
  const res = await API.post("/doctor/appointments/confirm/", payload);
  return res.data;
};

/*
====================================
 REPORT DOWNLOAD (PASSWORD PROTECTED)
====================================
*/
export const downloadReport = async (payload) => {
  const res = await API.post("/report/download/", payload, {
    responseType: "blob",
  });
  return res.data;
};

/*
====================================
 SECURITY DEMO (CNS PAGE)
====================================
*/
export const securityDemo = async () => {
  const res = await API.get("/security/demo/");
  return res.data;
};

export default API;
