import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = () => axios.get(API_BASE_URL);

export const deleteUser = (id) => axios.delete(`${API_BASE_URL}/${id}`);

export const addUser = (user) => axios.post(API_BASE_URL, user);

