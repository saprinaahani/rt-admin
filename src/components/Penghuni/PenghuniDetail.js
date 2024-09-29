import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Paper, 
  Button,
  Grid,
  CircularProgress
} from '@material-ui/core';
import { getPenghuniById } from '../../services/penghuniService';

const PenghuniDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [penghuni, setPenghuni] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPenghuniDetail = async () => {
      try {
        const data = await getPenghuniById(id);
        setPenghuni(data);
      } catch (error) {
        console.error('Error fetching penghuni detail:', error);
        setError('Terjadi kesalahan saat mengambil data penghuni');
      } finally {
        setLoading(false);
      }
    };

    fetchPenghuniDetail();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!penghuni) return <Typography>Penghuni tidak ditemukan</Typography>;

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>Detail Penghuni</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Nama Lengkap</Typography>
          <Typography>{penghuni.nama_lengkap}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Status Penghuni</Typography>
          <Typography>{penghuni.status_penghuni}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Nomor Telepon</Typography>
          <Typography>{penghuni.nomor_telepon}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Status Pernikahan</Typography>
          <Typography>{penghuni.status_pernikahan ? 'Menikah' : 'Belum Menikah'}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Foto KTP</Typography>
          {penghuni.foto_ktp && (
            <img 
              src={penghuni.foto_ktp} 
              alt="KTP" 
              style={{ maxWidth: '100%', height: 'auto' }} 
            />
          )}
        </Grid>
      </Grid>
      <Button 
        variant="contained" 
        color="primary" 
        style={{ marginTop: 20, marginRight: 10 }}
        onClick={() => navigate(`/penghuni/edit/${id}`)}
      >
        Edit
      </Button>
      <Button 
        variant="contained" 
        color="secondary" 
        style={{ marginTop: 20 }}
        onClick={() => navigate('/penghuni')}
      >
        Kembali ke Daftar
      </Button>
    </Paper>
  );
};

export default PenghuniDetail;