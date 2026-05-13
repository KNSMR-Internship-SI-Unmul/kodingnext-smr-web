import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../assets/images/logo-kn.png";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path
      ? "text-primary-pink"
      : "hover:text-hover-pink";
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white text-black shadow-md font-sans sticky top-0 z-50">
      <div className="container mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex-1 md:flex-none flex px-2 justify-start">
          <Link to="/" onClick={closeMenu}>
            <img
              src={logoImg}
              alt="Koding Next Logo"
              className="h-8 lg:h-10 w-auto"
            />
          </Link>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              }
            />
          </svg>
        </button>
        <div className="hidden md:flex flex-1 justify-center pr-18 space-x-8 font-medium items-center">
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
      </div>

      <div
        className={`absolute top-full right-0 w-56 bg-white shadow-lg transition-all duration-300 ease-in-out md:hidden overflow-hidden ${isOpen ? "max-h-125 border-t" : "max-h-0"}`}
      >
        <div className="flex flex-col py-2">
          <Link
            to="/"
            onClick={closeMenu}
            className={`px-8 py-3 border-b border-gray-50 font-medium text-md ${isActive("/")}`}
          >
            Beranda
          </Link>
          <Link
            to="/kursus"
            onClick={closeMenu}
            className={`px-8 py-3 border-b border-gray-50 font-medium text-md ${isActive("/kursus")}`}
          >
            Kursus
          </Link>
          <Link
            to="/kegiatan"
            onClick={closeMenu}
            className={`px-8 py-3 border-b border-gray-50 font-medium text-md ${isActive("/kegiatan")}`}
          >
            Kegiatan
          </Link>
          <Link
            to="/lokasi"
            onClick={closeMenu}
            className={`px-8 py-3 border-b border-gray-50 font-medium text-md ${isActive("/lokasi")}`}
          >
            Lokasi
          </Link>
          <Link
            to="/tentangkami"
            onClick={closeMenu}
            className={`px-8 py-3 font-medium text-md ${isActive("/tentangkami")}`}
          >
            Tentang Kami
          </Link>
        </div>
      </div>
    </nav>
  );
}
