import axios from "axios";

// Membuat Default URL
export const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

// Function Set Auth Token (setiap kita kirim request ke server, kita kirim token ini)
export const setAuthToken = (token) => {
  //Jika token ada, set header
  if (token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //   Jika tidak ada token, maka remove header Authorization
  else delete API.defaults.headers.common["Authorization"];
};
