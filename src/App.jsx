import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Kursus from "./pages/Kursus";
import Kegiatan from "./pages/Kegiatan";
import Lokasi from "./pages/Lokasi";
import Tentang from "./pages/Tentang";
import JuniorKoders from "./pages/JuniorKoders";
import LittleKoders from "./pages/LittleKoders";
import RoboNext from "./pages/RoboNext";

export default function App() {
  return (
    <BrowserRouter>
      
      {}
      <Navbar />

      {}
      <Routes>
        <Route path="/" element={<Home />} />

        {}
        <Route path="/kursus" element={<Kursus/>} />
        <Route path="/kegiatan" element={<Kegiatan/>} />
        <Route path="/lokasi" element={<Lokasi/>} />
        <Route path="/tentangkami" element={<Tentang/>} />
        <Route path="/kursus/junior-koders" element={<JuniorKoders/>} />
        <Route path="/kursus/little-koders" element={<LittleKoders/>} />
        <Route path="/kursus/robonext" element={<RoboNext/>} />
      </Routes>

      {}
      <Footer />

    </BrowserRouter>
  );
}