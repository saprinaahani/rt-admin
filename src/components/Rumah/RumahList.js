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
import { getRumahList } from '../../services/rumahService';

const RumahList = () => {
  const [rumahList, setRumahList] = useState([]);

  useEffect(() => {
    const fetchRumahList = async () => {
      try {
        const data = await getRumahList();
        setRumahList(data);
      } catch (error) {
        console.error('Error fetching rumah list:', error);
      }
    };

    fetchRumahList();
  }, []);

  return (
    <div>
      <h2>Daftar Rumah</h2>
      <Button component={Link} to="/rumah/new" variant="contained" color="primary">
        Tambah Rumah
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nomor Rumah</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rumahList.map((rumah) => (
              <TableRow key={rumah.id}>
                <TableCell>{rumah.nomor_rumah}</TableCell>
                <TableCell>{rumah.status}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/rumah/${rumah.id}`} variant="outlined" color="primary">
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

export default RumahList;