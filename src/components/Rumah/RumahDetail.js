import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Paper, 
  Button, 
  List, 
  ListItem, 
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@material-ui/core';
import { getRumahById, tambahPenghuni, hapusPenghuni } from '../../services/rumahService';

const RumahDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rumah, setRumah] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [penghuniData, setPenghuniData] = useState({ penghuni_id: '', tanggal_mulai: '' });

  useEffect(() => {
    const fetchRumahDetail = async () => {
      try {
        const data = await getRumahById(id);
        setRumah(data);
      } catch (error) {
        console.error('Error fetching rumah detail:', error);
      }
    };

    fetchRumahDetail();
  }, [id]);

  const handleTambahPenghuni = async () => {
    try {
      await tambahPenghuni(id, penghuniData);
      setOpenDialog(false);
      // Refresh rumah data
      const updatedRumah = await getRumahById(id);
      setRumah(updatedRumah);
    } catch (error) {
      console.error('Error adding penghuni:', error);
    }
  };

  const handleHapusPenghuni = async (penghuniId) => {
    try {
      await hapusPenghuni(id, penghuniId, { tanggal_selesai: new Date().toISOString().split('T')[0] });
      // Refresh rumah data
      const updatedRumah = await getRumahById(id);
      setRumah(updatedRumah);
    } catch (error) {
      console.error('Error removing penghuni:', error);
    }
  };

  if (!rumah) return <Typography>Loading...</Typography>;

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h4">Detail Rumah</Typography>
      <Typography>Nomor Rumah: {rumah.nomor_rumah}</Typography>
      <Typography>Status: {rumah.status}</Typography>

      <Typography variant="h6" style={{ marginTop: 16 }}>Penghuni Saat Ini</Typography>
      {rumah.penghuniSaatIni ? (
        <List>
          <ListItem>
            <ListItemText 
              primary={rumah.penghuniSaatIni.nama_lengkap} 
              secondary={`Mulai: ${rumah.penghuniSaatIni.pivot.tanggal_mulai}`}
            />
            <Button onClick={() => handleHapusPenghuni(rumah.penghuniSaatIni.id)} color="secondary">
              Hapus Penghuni
            </Button>
          </ListItem>
        </List>
      ) : (
        <Typography>Tidak ada penghuni saat ini</Typography>
      )}

      <Button onClick={() => setOpenDialog(true)} color="primary" variant="contained" style={{ marginTop: 16 }}>
        Tambah Penghuni
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Tambah Penghuni</DialogTitle>
        <DialogContent>
          <TextField
            label="ID Penghuni"
            value={penghuniData.penghuni_id}
            onChange={(e) => setPenghuniData({ ...penghuniData, penghuni_id: e.target.value })}
            fullWidth
          />
          <TextField
            label="Tanggal Mulai"
            type="date"
            value={penghuniData.tanggal_mulai}
            onChange={(e) => setPenghuniData({ ...penghuniData, tanggal_mulai: e.target.value })}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Batal
          </Button>
          <Button onClick={handleTambahPenghuni} color="primary">
            Tambah
          </Button>
        </DialogActions>
      </Dialog>

      <Button onClick={() => navigate('/rumah')} style={{ marginTop: 16 }}>
        Kembali ke Daftar Rumah
      </Button>
    </Paper>
  );
};

export default RumahDetail;