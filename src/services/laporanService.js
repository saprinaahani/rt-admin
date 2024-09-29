import api from './api';

export const getRingkasanBulanan = async (params) => {
  try {
    const response = await api.get('/laporan/ringkasan-bulanan', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDetailPembayaran = async (params) => {
  try {
    const response = await api.get('/laporan/detail-pembayaran', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDetailPengeluaran = async (params) => {
  try {
    const response = await api.get('/laporan/detail-pengeluaran', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTunggakanPembayaran = async (params) => {
  try {
    const response = await api.get('/laporan/tunggakan-pembayaran', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOccupancyRate = async (params) => {
  try {
    const response = await api.get('/laporan/occupancy-rate', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGrafikTahunan = async (year) => {
  try {
    const response = await api.get('/laporan/grafik-tahunan', { params: { year } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDetailBulanan = async (params) => {
  try {
    const response = await api.get('/laporan/detail-bulanan', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};