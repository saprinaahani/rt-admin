import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createPengeluaran } from '../../services/pengeluaranService';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    maxWidth: 400,
    margin: '0 auto',
  },
}));

const PengeluaranForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    deskripsi: '',
    jumlah: '',
    tanggal_pengeluaran: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.deskripsi = formData.deskripsi ? '' : 'Deskripsi harus diisi';
    tempErrors.jumlah = formData.jumlah ? '' : 'Jumlah harus diisi';
    tempErrors.tanggal_pengeluaran = formData.tanggal_pengeluaran ? '' : 'Tanggal pengeluaran harus diisi';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await createPengeluaran(formData);
        navigate('/pengeluaran');
      } catch (error) {
        console.error('Error creating pengeluaran:', error);
        setErrors({ ...errors, submit: 'Terjadi kesalahan saat menyimpan data' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        name="deskripsi"
        label="Deskripsi"
        value={formData.deskripsi}
        onChange={handleChange}
        error={!!errors.deskripsi}
        helperText={errors.deskripsi}
      />
      <TextField
        name="jumlah"
        label="Jumlah"
        type="number"
        value={formData.jumlah}
        onChange={handleChange}
        error={!!errors.jumlah}
        helperText={errors.jumlah}
      />
      <TextField
        name="tanggal_pengeluaran"
        label="Tanggal Pengeluaran"
        type="date"
        value={formData.tanggal_pengeluaran}
        onChange={handleChange}
        error={!!errors.tanggal_pengeluaran}
        helperText={errors.tanggal_pengeluaran}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {errors.submit && <div>{errors.submit}</div>}
      <Button type="submit" variant="contained" color="primary">
        Simpan
      </Button>
    </form>
  );
};

export default PengeluaranForm;