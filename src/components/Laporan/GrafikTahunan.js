import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Paper,
  TextField
} from '@material-ui/core';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getGrafikTahunan } from '../../services/laporanService';

const GrafikTahunan = () => {
  const [data, setData] = useState(null);
  const [tahun, setTahun] = useState(new Date().getFullYear().toString());

  useEffect(() => {
    fetchData();
  }, [tahun]);

  const fetchData = async () => {
    try {
      const grafikData = await getGrafikTahunan(tahun);
      setData(grafikData);
    } catch (error) {
      console.error('Error fetching grafik tahunan:', error);
    }
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h4" gutterBottom>Grafik Tahunan</Typography>
      
      <TextField
        type="number"
        value={tahun}
        onChange={(e) => setTahun(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      
      {data && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="bulan" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pemasukan" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="pengeluaran" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default GrafikTahunan;