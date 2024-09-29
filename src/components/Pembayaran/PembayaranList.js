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
  Button 
} from '@material-ui/core';
import { getPembayaranList } from '../../services/pembayaranService';

const PembayaranList = () => {
  const [pembayaranList, setPembayaranList] = useState([]);

  useEffect(() => {
    const fetchPembayaranList = async () => {
      try {
        const data = await getPembayaranList();
        setPembayaranList(data);
      } catch (error) {
        console.error('Error fetching pembayaran list:', error);
      }
    };

    fetchPembayaranList();
  }, []);

  return (
    <div>
      <h2>Daftar Pembayaran</h2>
      <Button component={Link} to="/pembayaran/new" variant="contained" color="primary">
        Tambah Pembayaran
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rumah</TableCell>
              <TableCell>Penghuni</TableCell>
              <TableCell>Jenis Pembayaran</TableCell>
              <TableCell>Jumlah</TableCell>
              <TableCell>Tanggal Pembayaran</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pembayaranList.map((pembayaran) => (
              <TableRow key={pembayaran.id}>
                <TableCell>{pembayaran.rumah.nomor_rumah}</TableCell>
                <TableCell>{pembayaran.penghuni.nama_lengkap}</TableCell>
                <TableCell>{pembayaran.jenis_pembayaran}</TableCell>
                <TableCell>{pembayaran.jumlah}</TableCell>
                <TableCell>{pembayaran.tanggal_pembayaran}</TableCell>
                <TableCell>{pembayaran.status}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/pembayaran/${pembayaran.id}`} variant="outlined" color="primary">
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

export default PembayaranList;