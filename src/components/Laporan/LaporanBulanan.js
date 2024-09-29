import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TextField,
  Button
} from '@material-ui/core';
import { getRingkasanBulanan, getDetailBulanan } from '../../services/laporanService';

const LaporanBulanan = () => {
  const [ringkasan, setRingkasan] = useState(null);
  const [detail, setDetail] = useState(null);
  const [bulan, setBulan] = useState(new Date().toISOString().slice(0, 7)); // Default to current month

  useEffect(() => {
    fetchData();
  }, [bulan]);

  const fetchData = async () => {
    try {
      const ringkasanData = await getRingkasanBulanan({ bulan });
      setRingkasan(ringkasanData);
      
      const detailData = await getDetailBulanan({ bulan });
      setDetail(detailData);
    } catch (error) {
      console.error('Error fetching laporan bulanan:', error);
    }
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h4" gutterBottom>Laporan Bulanan</Typography>
      
      <TextField
        type="month"
        value={bulan}
        onChange={(e) => setBulan(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      
      {ringkasan && (
        <div>
          <Typography variant="h6">Ringkasan</Typography>
          <Typography>Total Pemasukan: Rp {ringkasan.total_pemasukan}</Typography>
          <Typography>Total Pengeluaran: Rp {ringkasan.total_pengeluaran}</Typography>
          <Typography>Saldo: Rp {ringkasan.saldo}</Typography>
        </div>
      )}
      
      {detail && (
        <div>
          <Typography variant="h6" style={{ marginTop: 16 }}>Detail Pembayaran</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tanggal</TableCell>
                  <TableCell>Jenis</TableCell>
                  <TableCell>Jumlah</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detail.pembayaran.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.tanggal}</TableCell>
                    <TableCell>{item.jenis}</TableCell>
                    <TableCell>Rp {item.jumlah}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" style={{ marginTop: 16 }}>Detail Pengeluaran</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tanggal</TableCell>
                  <TableCell>Deskripsi</TableCell>
                  <TableCell>Jumlah</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detail.pengeluaran.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.tanggal}</TableCell>
                    <TableCell>{item.deskripsi}</TableCell>
                    <TableCell>Rp {item.jumlah}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </Paper>
  );
};

export default LaporanBulanan;