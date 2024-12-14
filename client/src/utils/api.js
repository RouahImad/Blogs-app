import axios from "axios";
const { VITE_STATE, VITE_URL } = import.meta.env;
const local = "http://localhost:3000";

export const api = axios.create({
    baseURL: VITE_STATE === "production" ? VITE_URL : local,
    withCredentials: true,
});

export const getAll = (query) => {
    return api.get(`/blogs${query ? `?search=${query}` : ""}`);
};

export const getOne = (id) => {
    return api.get(`/blogs/${id}`);
};

export const create = (data) => {
    return api.post("/blogs", data);
};

export const update = (id, data) => {
    return api.put(`/blogs/${id}`, data);
};

export const remove = (id) => {
    return api.delete(`/blogs/${id}`);
};

export const login = (data) => {
    return api.post("/login", data);
};

export const checkLogin = () => {
    return api.get("/login");
};

export const getStats = () => {
    return api.get("/stats");
};
