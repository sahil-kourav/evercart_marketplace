import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

// GET
export const fetchAddressesApi = async () => {
  const res = await api.get("/api/auth/users/me/addresses");
  return res.data;
};

// POST
export const addAddressApi = async (data) => {
  const res = await api.post("/api/auth/users/me/addresses", data);
  return res.data;
};

// DELETE
export const deleteAddressApi = async (id) => {
  const res = await api.delete(`/api/auth/users/me/addresses/${id}`);
  return res.data;
};