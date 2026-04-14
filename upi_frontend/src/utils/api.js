import axios from "axios";

const upiAPI = axios.create({
  baseURL: import.meta.env.VITE_UPI_API || "http://localhost:6000",
  headers: { "Content-Type": "application/json" },
});

const bankAPI = axios.create({
  baseURL: import.meta.env.VITE_BANK_API || "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

// Token auto-attach har request mein
upiAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("upi_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export { upiAPI, bankAPI };