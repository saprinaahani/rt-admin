import api from './api';

export const getRumahList = async () => {
  try {
    const response = await api.get('/rumah');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRumahById = async (id) => {
  try {
    const response = await api.get(`/rumah/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createRumah = async (rumahData) => {
  try {
    const response = await api.post('/rumah', rumahData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRumah = async (id, rumahData) => {
  try {
    const response = await api.put(`/rumah/${id}`, rumahData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const tambahPenghuni = async (rumahId, penghuniData) => {
  try {
    const response = await api.post(`/rumah/${rumahId}/tambah-penghuni`, penghuniData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const hapusPenghuni = async (rumahId, penghuniId, data) => {
  try {
    const response = await api.post(`/rumah/${rumahId}/hapus-penghuni/${penghuniId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRiwayatPembayaran = async (rumahId) => {
  try {
    const response = await api.get(`/rumah/${rumahId}/riwayat-pembayaran`);
    return response.data;
  } catch (error) {
    throw error;
  }
};