import api from './api';

export const getPenghuniList = async () => {
  try {
    const response = await api.get('/penghuni');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPenghuniById = async (id) => {
  try {
    const response = await api.get(`/penghuni/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPenghuni = async (penghuniData) => {
  try {
    const response = await api.post('/penghuni', penghuniData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePenghuni = async (id, penghuniData) => {
  try {
    const response = await api.put(`/penghuni/${id}`, penghuniData);
    return response.data;
  } catch (error) {
    throw error;
  }
};