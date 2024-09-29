import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Paper, 
  Button
} from '@material-ui/core';
import { getPengeluaranById, updatePengeluaran } from '../../services/pengeluaranService';

const PengeluaranDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pengeluaran, setPengeluaran] = useState(null);

  useEffect(() => {
    const fetchPengeluaranDetail = async () => {
      try {
        const data = await getPengeluaranById(id);
        setPengeluaran(data);
      } catch (error) {
        console.error('Error fetching pengeluaran detail:', error);
      }
    };

    fetchPengeluaranDetail();
  }, [id]);

  if (!pengeluaran) return <Typography>Loading...</Typography>;

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h4">Detail Pengeluaran</Typography>
      <Typography>Deskripsi: {pengeluaran.deskripsi}</Typography>
      <Typography>Jumlah: {pengeluaran.jumlah}</Typography>
      <Typography>Tanggal Pengeluaran: {pengeluaran.tanggal_pengeluaran}</Typography>

      <Button onClick={() => navigate('/pengeluaran')} style={{ marginTop: 16 }}>
        Kembali ke Daftar Pengeluaran
      </Button>
    </Paper>
  );
};

export default PengeluaranDetail;