import React from "react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../assets/images/logo-kn.png";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
      ? "text-primary-pink"
      : "hover:text-hover-pink";
  };

  return (
    <nav className="bg-white text-black shadow-md font-sans sticky top-0 z-50">
      <div className="container mx-auto px-12 py-6 flex items-center justify-center">
        <Link to="/" className="absolute left-6 px-12 py-8">
          <img src={logoImg} alt="Koding Next Logo" className="h-10 w-auto" />
        </Link>

        <div className="space-x-8 hidden md:flex font-medium items-center">
          <Link to="/" className={isActive("/")}>
            Beranda
          </Link>

          <div className="relative group">
            <Link
              to="/kursus"
              className={`flex items-center gap-1 ${isActive("/kursus")}`}
            >
              Kursus
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Link>

            <div className="absolute left-0 top-full w-64 bg-white rounded-2xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
              <div className="p-4 space-y-3">
                <Link
                  to="/kursus/little-koders"
                  className="flex p-1 rounded-lg hover:bg-gray-100"
                >
                  <div>
                    <p className="font-semibold">Little Koders</p>
                    <p className="text-sm text-gray-500">Usia 4 - 8 tahun</p>
                  </div>
                </Link>

                <Link
                  to="/kursus/junior-koders"
                  className="flex p-1 rounded-lg hover:bg-gray-100"
                >
                  <div>
                    <p className="font-semibold">Junior Koders</p>
                    <p className="text-sm text-gray-500">Usia 8 - 16 tahun</p>
                  </div>
                </Link>

                <Link
                  to="/kursus/robonext"
                  className="flex p-1 rounded-lg hover:bg-gray-100"
                >
                  <div>
                    <p className="font-semibold">RoboNext</p>
                    <p className="text-sm text-gray-500">Usia 4 - 16 tahun</p>
                  </div>
                </Link>

                <div className="border-t pt-2 mt-2">
                  <Link
                    to="/kursus"
                    className="block text-left text-sm text-primary-pink hover:underline"
                  >
                    Lihat Semua Kursus →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link to="/kegiatan" className={isActive("/kegiatan")}>
            Kegiatan
          </Link>

          <Link to="/lokasi" className={isActive("/lokasi")}>
            Lokasi
          </Link>

          <Link to="/tentangkami" className={isActive("/tentangkami")}>
            Tentang Kami
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="absolute right-6 md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
