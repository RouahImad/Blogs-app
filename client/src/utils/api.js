import axios from "axios";
const mode = import.meta.env.VITE_MODE;
const url = import.meta.env.VITE_API_URL;
console.log(mode);

export const api = axios.create({
    baseURL: mode === "production" ? url : "http://localhost:3000",
});

export const getAll = () => {
    return api.get("/blogs");
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
    return api.get("/loggedin");
};
