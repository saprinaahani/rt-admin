import api from './api';

export const getPengeluaranList = async () => {
  try {
    const response = await api.get('/pengeluaran');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPengeluaranById = async (id) => {
  try {
    const response = await api.get(`/pengeluaran/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPengeluaran = async (pengeluaranData) => {
  try {
    const response = await api.post('/pengeluaran', pengeluaranData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePengeluaran = async (id, pengeluaranData) => {
  try {
    const response = await api.put(`/pengeluaran/${id}`, pengeluaranData);
    return response.data;
  } catch (error) {
    throw error;
  }
};