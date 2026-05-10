import React from "react";
import { useParams } from "react-router-dom";
import LittleKoders from "./pages/LittleKoders";
import RoboNext from "./pages/RoboNext";
import JuniorKoders from "./pages/JuniorKoders";

export default function CourseDispatcher() {
  const { id } = useParams();

  if (id === "little-koders") return <LittleKoders />;
  if (id === "junior-koders") return <JuniorKoders />;
  if (id === "robonext" || id === "robo-next") return <RoboNext />;

  return (
    <div className="py-20 text-center">
      <h1 className="text-2xl font-bold text-red-500">
        Kursus "{id}" Tidak Ditemukan
      </h1>
    </div>
  );
}
