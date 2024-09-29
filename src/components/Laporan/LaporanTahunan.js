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
import { getDetailPembayaran, getDetailPengeluaran, getOccupancyRate } from '../../services/laporanService';

const LaporanTahunan = () => {
  const [pembayaran, setPembayaran] = useState(null);
  const [pengeluaran, setPengeluaran] = useState(null);
  const [occupancyRate, setOccupancyRate] = useState(null);
  const [tahun, setTahun] = useState(new Date().getFullYear().toString());

  useEffect(() => {
    fetchData();
  }, [tahun]);

  const fetchData = async () => {
    try {
      const pembayaranData = await getDetailPembayaran({ tahun });
      setPembayaran(pembayaranData);
      
      const pengeluaranData = await getDetailPengeluaran({ tahun });
      setPengeluaran(pengeluaranData);
      
      const occupancyData = await getOccupancyRate({ tahun });
      setOccupancyRate(occupancyData);
    } catch (error) {
      console.error('Error fetching laporan tahunan:', error);
    }
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h4" gutterBottom>Laporan Tahunan</Typography>
      
      <TextField
        type="number"
        value={tahun}
        onChange={(e) => setTahun(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      
      {occupancyRate && (
        <div>
          <Typography variant="h6">Occupancy Rate</Typography>
          <Typography>Rate: {occupancyRate.rate}%</Typography>
        </div>
      )}
      
      {pembayaran && (
        <div>
          <Typography variant="h6" style={{ marginTop: 16 }}>Total Pembayaran per Jenis</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Jenis Pembayaran</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(pembayaran.total_per_jenis).map(([jenis, total]) => (
                  <TableRow key={jenis}>
                    <TableCell>{jenis}</TableCell>
                    <TableCell>Rp {total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      
      {pengeluaran && (
        <div>
          <Typography variant="h6" style={{ marginTop: 16 }}>Total Pengeluaran</Typography>
          <Typography>Rp {pengeluaran.total}</Typography>
          
          <Typography variant="h6" style={{ marginTop: 16 }}>Detail Pengeluaran</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Bulan</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pengeluaran.detail_per_bulan.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.bulan}</TableCell>
                    <TableCell>Rp {item.total}</TableCell>
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

export default LaporanTahunan;