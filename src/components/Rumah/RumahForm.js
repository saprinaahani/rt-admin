import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createRumah } from '../../services/rumahService';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    maxWidth: 400,
    margin: '0 auto',
  },
}));

const RumahForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomor_rumah: '',
    status: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.nomor_rumah = formData.nomor_rumah ? '' : 'Nomor rumah harus diisi';
    tempErrors.status = formData.status ? '' : 'Status harus dipilih';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await createRumah(formData);
        navigate('/');
      } catch (error) {
        console.error('Error creating rumah:', error);
        setErrors({ ...errors, submit: 'Terjadi kesalahan saat menyimpan data' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        name="nomor_rumah"
        label="Nomor Rumah"
        value={formData.nomor_rumah}
        onChange={handleChange}
        error={!!errors.nomor_rumah}
        helperText={errors.nomor_rumah}
      />
      <FormControl error={!!errors.status}>
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value="dihuni">Dihuni</MenuItem>
          <MenuItem value="tidak_dihuni">Tidak Dihuni</MenuItem>
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

export default RumahForm;