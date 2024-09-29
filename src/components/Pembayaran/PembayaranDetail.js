import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Paper, 
  Button
} from '@material-ui/core';
import { getPembayaranById } from '../../services/pembayaranService';

const PembayaranDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pembayaran, setPembayaran] = useState(null);

  useEffect(() => {
    const fetchPembayaranDetail = async () => {
      try {
        const data = await getPembayaranById(id);
        setPembayaran(data);
      } catch (error) {
        console.error('Error fetching pembayaran detail:', error);
      }
    };

    fetchPembayaranDetail();
  }, [id]);

  if (!pembayaran) return <Typography>Loading...</Typography>;

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h4">Detail Pembayaran</Typography>
      <Typography>Rumah: {pembayaran.rumah.nomor_rumah}</Typography>
      <Typography>Penghuni: {pembayaran.penghuni.nama_lengkap}</Typography>
      <Typography>Jenis Pembayaran: {pembayaran.jenis_pembayaran}</Typography>
      <Typography>Jumlah: {pembayaran.jumlah}</Typography>
      <Typography>Tanggal Pembayaran: {pembayaran.tanggal_pembayaran}</Typography>
      <Typography>Periode Awal: {pembayaran.periode_awal}</Typography>
      <Typography>Periode Akhir: {pembayaran.periode_akhir}</Typography>
      <Typography>Status: {pembayaran.status}</Typography>

      <Button onClick={() => navigate('/pembayaran')} style={{ marginTop: 16 }}>
        Kembali ke Daftar Pembayaran
      </Button>
    </Paper>
  );
};

export default PembayaranDetail;