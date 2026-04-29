import { useParams } from "react-router-dom";
import LittleKoders from "./pages/LittleKoders";
import RoboNext from "./pages/RoboNext";
import JuniorKoders from "./pages/JuniorKoders";

export default function CourseDispatcher() {
  const { id } = useParams();

  if (id === "1") return <LittleKoders />;
  if (id === "2") return <JuniorKoders />;
  if (id === "3") return <RoboNext />;

  return (
    <div className="py-20 text-center">
      <h1 className="text-2xl font-bold text-red-500">
        Kursus Tidak Ditemukan
      </h1>
    </div>
  );
}
