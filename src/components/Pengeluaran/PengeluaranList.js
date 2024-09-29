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
import { getPengeluaranList } from '../../services/pengeluaranService';

const PengeluaranList = () => {
  const [pengeluaranList, setPengeluaranList] = useState([]);

  useEffect(() => {
    const fetchPengeluaranList = async () => {
      try {
        const data = await getPengeluaranList();
        setPengeluaranList(data);
      } catch (error) {
        console.error('Error fetching pengeluaran list:', error);
      }
    };

    fetchPengeluaranList();
  }, []);

  return (
    <div>
      <h2>Daftar Pengeluaran</h2>
      <Button component={Link} to="/pengeluaran/new" variant="contained" color="primary">
        Tambah Pengeluaran
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Deskripsi</TableCell>
              <TableCell>Jumlah</TableCell>
              <TableCell>Tanggal Pengeluaran</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pengeluaranList.map((pengeluaran) => (
              <TableRow key={pengeluaran.id}>
                <TableCell>{pengeluaran.deskripsi}</TableCell>
                <TableCell>{pengeluaran.jumlah}</TableCell>
                <TableCell>{pengeluaran.tanggal_pengeluaran}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/pengeluaran/${pengeluaran.id}`} variant="outlined" color="primary">
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

export default PengeluaranList;