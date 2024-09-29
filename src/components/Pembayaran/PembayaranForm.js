import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createPembayaran } from '../../services/pembayaranService';
import { getRumahList } from '../../services/rumahService';
import { getPenghuniList } from '../../services/penghuniService';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    maxWidth: 400,
    margin: '0 auto',
  },
}));

const PembayaranForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rumah_id: '',
    penghuni_id: '',
    jenis_pembayaran: '',
    jumlah: '',
    tanggal_pembayaran: '',
    periode_awal: '',
    periode_akhir: '',
    status: '',
  });
  const [errors, setErrors] = useState({});
  const [rumahList, setRumahList] = useState([]);
  const [penghuniList, setPenghuniList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rumahData = await getRumahList();
        const penghuniData = await getPenghuniList();
        setRumahList(rumahData);
        setPenghuniList(penghuniData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.rumah_id = formData.rumah_id ? '' : 'Rumah harus dipilih';
    tempErrors.penghuni_id = formData.penghuni_id ? '' : 'Penghuni harus dipilih';
    tempErrors.jenis_pembayaran = formData.jenis_pembayaran ? '' : 'Jenis pembayaran harus dipilih';
    tempErrors.jumlah = formData.jumlah ? '' : 'Jumlah harus diisi';
    tempErrors.tanggal_pembayaran = formData.tanggal_pembayaran ? '' : 'Tanggal pembayaran harus diisi';
    tempErrors.periode_awal = formData.periode_awal ? '' : 'Periode awal harus diisi';
    tempErrors.periode_akhir = formData.periode_akhir ? '' : 'Periode akhir harus diisi';
    tempErrors.status = formData.status ? '' : 'Status harus dipilih';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await createPembayaran(formData);
        navigate('/pembayaran');
      } catch (error) {
        console.error('Error creating pembayaran:', error);
        setErrors({ ...errors, submit: 'Terjadi kesalahan saat menyimpan data' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <FormControl error={!!errors.rumah_id}>
        <InputLabel>Rumah</InputLabel>
        <Select
          name="rumah_id"
          value={formData.rumah_id}
          onChange={handleChange}
        >
          {rumahList.map((rumah) => (
            <MenuItem key={rumah.id} value={rumah.id}>{rumah.nomor_rumah}</MenuItem>
          ))}
        </Select>
        {errors.rumah_id && <div>{errors.rumah_id}</div>}
      </FormControl>
      <FormControl error={!!errors.penghuni_id}>
        <InputLabel>Penghuni</InputLabel>
        <Select
          name="penghuni_id"
          value={formData.penghuni_id}
          onChange={handleChange}
        >
          {penghuniList.map((penghuni) => (
            <MenuItem key={penghuni.id} value={penghuni.id}>{penghuni.nama_lengkap}</MenuItem>
          ))}
        </Select>
        {errors.penghuni_id && <div>{errors.penghuni_id}</div>}
      </FormControl>
      <FormControl error={!!errors.jenis_pembayaran}>
        <InputLabel>Jenis Pembayaran</InputLabel>
        <Select
          name="jenis_pembayaran"
          value={formData.jenis_pembayaran}
          onChange={handleChange}
        >
          <MenuItem value="iuran_kebersihan">Iuran Kebersihan</MenuItem>
          <MenuItem value="iuran_satpam">Iuran Satpam</MenuItem>
        </Select>
        {errors.jenis_pembayaran && <div>{errors.jenis_pembayaran}</div>}
      </FormControl>
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
        name="tanggal_pembayaran"
        label="Tanggal Pembayaran"
        type="date"
        value={formData.tanggal_pembayaran}
        onChange={handleChange}
        error={!!errors.tanggal_pembayaran}
        helperText={errors.tanggal_pembayaran}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="periode_awal"
        label="Periode Awal"
        type="date"
        value={formData.periode_awal}
        onChange={handleChange}
        error={!!errors.periode_awal}
        helperText={errors.periode_awal}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="periode_akhir"
        label="Periode Akhir"
        type="date"
        value={formData.periode_akhir}
        onChange={handleChange}
        error={!!errors.periode_akhir}
        helperText={errors.periode_akhir}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <FormControl error={!!errors.status}>
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value="lunas">Lunas</MenuItem>
          <MenuItem value="belum_lunas">Belum Lunas</MenuItem>
        </Select>
        {errors.status && <div>{errors.status}</div>}
      </FormControl>
      {errors.submit && <div>{errors.submit}</div>}
      <Button type="submit" variant="contained" color="primary">
        Simpan
      </Button>
    </form>
  );
};

export default PembayaranForm;