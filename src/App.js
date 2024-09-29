import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import RumahList from './components/Rumah/RumahList';
import RumahForm from './components/Rumah/RumahForm';
import RumahDetail from './components/Rumah/RumahDetail';
import PenghuniList from './components/Penghuni/PenghuniList';
import PenghuniForm from './components/Penghuni/PenghuniForm';
import PenghuniDetail from './components/Penghuni/PenghuniDetail';
import PembayaranList from './components/Pembayaran/PembayaranList';
import PembayaranForm from './components/Pembayaran/PembayaranForm';
import PembayaranDetail from './components/Pembayaran/PembayaranDetail';
import PengeluaranList from './components/Pengeluaran/PengeluaranList';
import PengeluaranForm from './components/Pengeluaran/PengeluaranForm';
import PengeluaranDetail from './components/Pengeluaran/PengeluaranDetail';
import LaporanBulanan from './components/Laporan/LaporanBulanan';
import LaporanTahunan from './components/Laporan/LaporanTahunan';
import GrafikTahunan from './components/Laporan/GrafikTahunan';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<RumahList />} />
          <Route path="/rumah/new" element={<RumahForm />} />
          <Route path="/rumah/:id" element={<RumahDetail />} />
          <Route path="/penghuni" element={<PenghuniList />} />
          <Route path="/penghuni/new" element={<PenghuniForm />} />
          <Route path="/penghuni/:id" element={<PenghuniDetail />} />
          <Route path="/pembayaran" element={<PembayaranList />} />
          <Route path="/pembayaran/new" element={<PembayaranForm />} />
          <Route path="/pembayaran/:id" element={<PembayaranDetail />} />
          <Route path="/pengeluaran" element={<PengeluaranList />} />
          <Route path="/pengeluaran/new" element={<PengeluaranForm />} />
          <Route path="/pengeluaran/:id" element={<PengeluaranDetail />} />
          <Route path="/laporan/bulanan" element={<LaporanBulanan />} />
          <Route path="/laporan/tahunan" element={<LaporanTahunan />} />
          <Route path="/laporan/grafik" element={<GrafikTahunan />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;