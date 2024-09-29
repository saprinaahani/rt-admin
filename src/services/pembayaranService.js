import api from './api';

export const getPembayaranList = async () => {
  try {
    const response = await api.get('/pembayaran');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPembayaranById = async (id) => {
  try {
    const response = await api.get(`/pembayaran/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPembayaran = async (pembayaranData) => {
  try {
    const response = await api.post('/pembayaran', pembayaranData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePembayaran = async (id, pembayaranData) => {
  try {
    const response = await api.put(`/pembayaran/${id}`, pembayaranData);
    return response.data;
  } catch (error) {
    throw error;
  }
};