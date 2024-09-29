import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button,
  Typography
} from '@material-ui/core';
import { getPenghuniList } from '../../services/penghuniService';

const PenghuniList = () => {
  const [penghuniList, setPenghuniList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPenghuniList = async () => {
      try {
        const data = await getPenghuniList();
        setPenghuniList(data);
      } catch (error) {
        console.error('Error fetching penghuni list:', error);
        setError('Terjadi kesalahan saat mengambil data penghuni');
      }
    };

    fetchPenghuniList();
  }, []);

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>Daftar Penghuni</Typography>
      <Button component={Link} to="/penghuni/new" variant="contained" color="primary" style={{ marginBottom: 20 }}>
        Tambah Penghuni
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nama Lengkap</TableCell>
              <TableCell>Status Penghuni</TableCell>
              <TableCell>Nomor Telepon</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {penghuniList.map((penghuni) => (
              <TableRow key={penghuni.id}>
                <TableCell>{penghuni.nama_lengkap}</TableCell>
                <TableCell>{penghuni.status_penghuni}</TableCell>
                <TableCell>{penghuni.nomor_telepon}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/penghuni/${penghuni.id}`} variant="outlined" color="primary">
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PenghuniList;