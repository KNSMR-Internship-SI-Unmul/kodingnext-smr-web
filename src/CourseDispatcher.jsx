// CourseDispatcher.jsx
import { useParams } from "react-router-dom";
import LittleKoders from "./pages/LittleKoders";
import RoboNext from "./pages/RoboNext";
import JuniorKoders from "./pages/JuniorKoders";

export default function CourseDispatcher() {
  const { id } = useParams();

  // Kita cek berdasarkan ID (angka/string angka) 
  // ATAU berdasarkan teks jika Link-nya terlanjur pakai nama
  if (id === "1" || id === "little-koders") return <LittleKoders />;
  if (id === "2" || id === "junior-koders") return <JuniorKoders />;
  if (id === "3" || id === "robonext") return <RoboNext />;

  return (
    <div className="py-20 text-center">
      <h1 className="text-2xl font-bold text-red-500">Kursus Tidak Ditemukan</h1>
      <p className="text-gray-500 mt-2">ID yang terbaca di URL adalah: <span className="font-mono bg-gray-100 px-2">{id}</span></p>
      <p className="text-sm mt-4 italic text-gray-400">Pastikan ID ini terdaftar di CourseDispatcher.jsx</p>
    </div>
  );
}