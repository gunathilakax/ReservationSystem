import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notices';

const createNotice = async (title, content) => {
  const response = await axios.post(`${API_URL}/create`, { title, content });
  return response.data;
};

const getAllNotices = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const updateNotice = async (id, title, content) => {
  const response = await axios.put(`${API_URL}/edit/${id}`, { title, content });
  return response.data;
};

const deleteNotice = async (id) => {
  await axios.delete(`${API_URL}/delete/${id}`);
};

export default {
  createNotice,
  getAllNotices,
  updateNotice,
  deleteNotice
};
