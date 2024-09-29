import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Typography,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createPenghuni } from '../../services/penghuniService';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    maxWidth: 400,
    margin: '0 auto',
  },
}));

const PenghuniForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    status_penghuni: '',
    nomor_telepon: '',
    status_pernikahan: false,
    foto_ktp: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
    setErrors({ ...errors, [name]: '' });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, foto_ktp: e.target.files[0] });
    setErrors({ ...errors, foto_ktp: '' });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.nama_lengkap = formData.nama_lengkap ? '' : 'Nama lengkap harus diisi';
    tempErrors.status_penghuni = formData.status_penghuni ? '' : 'Status penghuni harus dipilih';
    tempErrors.nomor_telepon = formData.nomor_telepon ? '' : 'Nomor telepon harus diisi';
    tempErrors.foto_ktp = formData.foto_ktp ? '' : 'Foto KTP harus diunggah';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const formDataToSend = new FormData();
        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }
        await createPenghuni(formDataToSend);
        navigate('/penghuni');
      } catch (error) {
        console.error('Error creating penghuni:', error);
        setErrors({ ...errors, submit: 'Terjadi kesalahan saat menyimpan data' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Typography variant="h5" gutterBottom>Tambah Penghuni Baru</Typography>
      <TextField
        name="nama_lengkap"
        label="Nama Lengkap"
        value={formData.nama_lengkap}
        onChange={handleChange}
        error={!!errors.nama_lengkap}
        helperText={errors.nama_lengkap}
        fullWidth
      />
      <FormControl error={!!errors.status_penghuni} fullWidth>
        <InputLabel>Status Penghuni</InputLabel>
        <Select
          name="status_penghuni"
          value={formData.status_penghuni}
          onChange={handleChange}
        >
          <MenuItem value="kontrak">Kontrak</MenuItem>
          <MenuItem value="tetap">Tetap</MenuItem>
        </Select>
        {errors.status_penghuni && <Typography color="error">{errors.status_penghuni}</Typography>}
      </FormControl>
      <TextField
        name="nomor_telepon"
        label="Nomor Telepon"
        value={formData.nomor_telepon}
        onChange={handleChange}
        error={!!errors.nomor_telepon}
        helperText={errors.nomor_telepon}
        fullWidth
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.status_pernikahan}
            onChange={handleChange}
            name="status_pernikahan"
            color="primary"
          />
        }
        label="Sudah Menikah"
      />
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="foto-ktp"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="foto-ktp">
        <Button variant="contained" component="span" fullWidth>
          Unggah Foto KTP
        </Button>
      </label>
      {errors.foto_ktp && <Typography color="error">{errors.foto_ktp}</Typography>}
      {formData.foto_ktp && <Typography>{formData.foto_ktp.name}</Typography>}
      {errors.submit && <Typography color="error">{errors.submit}</Typography>}
      <Button type="submit" variant="contained" color="primary">
        Simpan
      </Button>
    </form>
  );
};

export default PenghuniForm;