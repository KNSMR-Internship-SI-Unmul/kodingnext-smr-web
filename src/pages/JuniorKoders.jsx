import heroImg from "../assets/images/jk.jpg";
import mascotImg1 from "../assets/images/mascot1.png";
import React, { useState, useEffect, useRef } from "react";
import { modules } from "../assets/data/modules";
import { studentProjects } from "../assets/data/studentProjects";

export default function JuniorKoders() {
  const [activeCategory, setActiveCategory] = useState("game");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [projectIndex, setProjectIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const dialogRef = useRef(null);
  const scrollPosRef = useRef(0);

  const filteredModules = modules
    .filter((c) => c.course_type === "Junior Koders")
    .sort((a, b) => a.id - b.id);

  const gameModules = filteredModules.filter(
    (m) => !m.category || m.category === "Game Development",
  );

  const appsModules = filteredModules.filter(
    (m) => !m.category || m.category === "Apps Development",
  );

  const buildRows = () => {
    const rows = [];
    let gameIdx = 0;
    let appsIdx = 0;
    let turn = "left";

    while (gameIdx < gameModules.length || appsIdx < appsModules.length) {
      const useLeft = turn === "left" && gameIdx < gameModules.length;
      const useRight = turn === "right" && appsIdx < appsModules.length;

      if (useLeft) {
        rows.push({ left: gameModules[gameIdx], right: null });
        gameIdx++;
      } else if (useRight) {
        rows.push({ left: null, right: appsModules[appsIdx] });
        appsIdx++;
      } else if (gameIdx < gameModules.length) {
        rows.push({ left: gameModules[gameIdx], right: null });
        gameIdx++;
        turn = "right";
      } else {
        rows.push({ left: null, right: appsModules[appsIdx] });
        appsIdx++;
        turn = "left";
      }

      turn = turn === "left" ? "right" : "left";
    }

    return rows;
  };

  const rows = buildRows();

  const getAgeRange = (courseName) => {
    const found = modules.find((c) => c.name === courseName);
    return found?.age_range ?? "";
  };

  const ageCategories = [...new Set(filteredModules.map((c) => c.age_range))];

  const filteredProjects = studentProjects.filter((p) => {
    const ageRange = getAgeRange(p.course_name);
    const matchesSearch = p.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesAge = selectedAge === "" || ageRange === selectedAge;
    return matchesSearch && matchesAge;
  });

  const projectList =
    filteredProjects.length > 0 ? filteredProjects : studentProjects;
  const safeIndex = projectIndex >= projectList.length ? 0 : projectIndex;
  const currentProject = projectList[safeIndex];

  const prevProject = () =>
    setProjectIndex((prev) => (prev === 0 ? projectList.length - 1 : prev - 1));
  const nextProject = () =>
    setProjectIndex((prev) => (prev === projectList.length - 1 ? 0 : prev + 1));

  const openModal = (course) => {
    scrollPosRef.current = window.scrollY;
    setSelectedCourse(course);
  };

  const closeModal = () => {
    if (dialogRef.current?.open) dialogRef.current.close();
    setSelectedCourse(null);
    window.scrollTo({ top: scrollPosRef.current, behavior: "instant" });
  };

  useEffect(() => {
    document.title = "Junior Koders | Koding Next Samarinda";
    const dialog = dialogRef.current;
    if (!dialog || !selectedCourse) return;
    if (dialog.open) dialog.close();
    dialog.showModal();
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollPosRef.current, behavior: "instant" });
    });
  }, [selectedCourse]);

  const renderCard = (m, side, number) => (
    <button
      className="relative inline-block text-left w-full group"
      onClick={() => openModal(m)}
      aria-label={`Lihat detail ${m.name}`}
    >
      <div
        className={`absolute ${side === "left" ? "-left-6" : "-right-6"} top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-primary-blue rounded-full shadow-md flex items-center justify-center text-white font-semibold text-3xl`}
      >
        {number}
      </div>
      <div className="bg-white p-8 h-30 rounded-2xl shadow-xl border-2 border-gray-200 border-b-4 border-b-primary-blue flex flex-col items-center justify-center text-center transition-all duration-200 group-hover:scale-105 group-hover:shadow-2xl group-hover:border-primary-blue">
        <h3 className="text-primary-blue font-semibold text-xl mb-1">
          {m.name}
        </h3>
        <p className="text-xs font-medium text-gray-800">
          Usia: {m.age_range} ({m.duration_per_session})
        </p>
      </div>
    </button>
  );

  const activeModules = activeCategory === "game" ? gameModules : appsModules;

  return (
    <div className="min-h-screen">
      <section className="relative w-full h-120 flex items-center">
        <img
          src={heroImg}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Junior Koders"
        />
        <div className="relative max-w-6xl mx-auto px-16 w-full flex justify-end">
          <div className="relative p-8 rounded-xl max-w-md bg-white/80 backdrop-blur-xs border border-white/10">
            <h2 className="text-5xl font-bold text-primary-blue mb-4">
              Junior Koders
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              Program ini menawarkan kursus pemula dalam pemrograman blok,
              seperti Game 2D dan Pengembangan Aplikasi Seluler, dan kursus
              lanjutan dalam pemrograman berbasis teks, seperti Python,
              JavaScript, dan Smart Home IoT.
            </p>
            <div className="flex gap-3">
              <button className="bg-primary-blue text-white px-4 py-2 rounded-lg text-sm hover:bg-hover-blue">
                Lihat Modul
              </button>
              <button className="bg-white border border-primary-blue text-primary-blue px-4 py-2 rounded-lg text-sm hover:bg-hover-blue hover:text-white">
                Lihat Proyek
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-4xl font-bold mb-14">
            Modul <span className="text-primary-blue">Kami</span>
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="flex mb-8">
            <div className="w-1/2 text-center">
              <button
                onClick={() =>
                  setActiveCategory(activeCategory === "game" ? "all" : "game")
                }
                className={`w-full text-xl font-bold pb-2 border-b-2 transition-colors ${
                  activeCategory === "game"
                    ? "text-primary-blue border-primary-blue"
                    : "text-gray-400 border-gray-200 hover:text-gray-600"
                }`}
              >
                Game Development
              </button>
            </div>
            <div className="w-1/2 text-center">
              <button
                onClick={() =>
                  setActiveCategory(activeCategory === "apps" ? "all" : "apps")
                }
                className={`w-full text-xl font-bold pb-2 border-b-2 transition-colors ${
                  activeCategory === "apps"
                    ? "text-primary-blue border-primary-blue"
                    : "text-gray-400 border-gray-200 hover:text-gray-600"
                }`}
              >
                Apps Development
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1.5 bg-primary-blue h-full rounded-full hidden md:block" />

            <div className="-space-y-8">
              {activeCategory === "all" &&
                rows.map((row, index) => {
                  const leftNumber = row.left
                    ? filteredModules.findIndex((m) => m.id === row.left.id) + 1
                    : null;
                  const rightNumber = row.right
                    ? filteredModules.findIndex((m) => m.id === row.right.id) +
                      1
                    : null;

                  return (
                    <div
                      key={index}
                      className="flex items-center relative min-h-24"
                    >
                      <div className="w-[calc(50%-20px)] flex justify-end items-center pr-2">
                        {row.left && renderCard(row.left, "left", leftNumber)}
                      </div>
                      <div className="w-10 shrink-0 flex items-center justify-center z-10">
                        <div className="w-4 h-4 bg-primary-blue rounded-full shadow" />
                      </div>
                      <div className="w-[calc(50%-20px)] flex justify-start items-center pl-2">
                        {row.right &&
                          renderCard(row.right, "right", rightNumber)}
                      </div>
                    </div>
                  );
                })}

              {activeCategory === "all" &&
                rows.map((row) => {
                  const m = row.left ?? row.right;
                  const leftNumber = row.left
                    ? filteredModules.findIndex(
                        (mod) => mod.id === row.left.id,
                      ) + 1
                    : null;
                  const rightNumber = row.right
                    ? filteredModules.findIndex(
                        (mod) => mod.id === row.right.id,
                      ) + 1
                    : null;

                  return (
                    <div
                      key={m.id}
                      className="flex items-center relative min-h-24"
                    >
                      {" "}
                      <div className="w-[calc(50%-20px)] flex justify-end items-center pr-2">
                        {row.left && renderCard(row.left, "left", leftNumber)}
                      </div>
                      <div className="w-10 shrink-0 flex items-center justify-center z-10">
                        <div className="w-4 h-4 bg-primary-blue rounded-full shadow" />
                      </div>
                      <div className="w-[calc(50%-20px)] flex justify-start items-center pl-2">
                        {row.right &&
                          renderCard(row.right, "right", rightNumber)}
                      </div>
                    </div>
                  );
                })}

              {activeCategory !== "all" &&
                activeModules.map((m, index) => {
                  const side = index % 2 === 0 ? "left" : "right";
                  return (
                    <div
                      key={m.id}
                      className="flex items-center relative min-h-24"
                    >
                      {" "}
                      <div className="w-[calc(50%-20px)] flex justify-end items-center pr-10">
                        {side === "left" && renderCard(m, "left", index + 1)}
                      </div>
                      <div className="w-10 shrink-0 flex items-center justify-center z-10">
                        <div className="w-4 h-4 bg-primary-blue rounded-full shadow" />
                      </div>
                      <div className="w-[calc(50%-20px)] flex justify-start items-center pl-10">
                        {side === "right" && renderCard(m, "right", index + 1)}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">
          Proyek <span className="text-primary-blue">Siswa</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-10 px-4">
          {ageCategories.map((age) => (
            <button
              key={age}
              onClick={() => {
                setSelectedAge(selectedAge === age ? "" : age);
                setSearchQuery("");
                setProjectIndex(0);
              }}
              className={`border-2 border-primary-blue px-10 py-2 rounded-lg font-medium transition-colors ${
                selectedAge === age
                  ? "bg-primary-blue text-white"
                  : "text-primary-blue hover:bg-primary-blue hover:text-white"
              }`}
            >
              {age}
            </button>
          ))}

          <div className="relative">
            <input
              type="text"
              placeholder="Cari Nama Siswa..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedAge("");
                setProjectIndex(0);
              }}
              className={`
                border-2 rounded-lg px-4 py-2 text-base outline-none w-32 md:w-130 transition-colors ${
                  searchQuery === "" 
                    ? "border-gray-300 focus:border-primary-blue"
                    : "border-primary-blue"
                }
              `}
            />
            <div className="absolute right-3 top-2.5 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {currentProject ? (
          <div className="bg-white rounded-[40px] max-w-4xl mx-auto shadow-2xl p-6 flex flex-col md:flex-row gap-8 border border-gray-100 min-h-90">
            <div className="md:w-1/2 relative group shrink-0">
              <div className="rounded-3xl w-full h-80 bg-gray-200 overflow-hidden">
                <img
                  src={currentProject.media_url}
                  alt={currentProject.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              {currentProject.media_type !== "gif" && (
                <div className="absolute inset-0 flex items-center justify-center"></div>
              )}
            </div>

            <div className="md:w-1/2 flex flex-col">
              <h3 className="text-3xl font-semibold text-gray-900 mb-2 line-clamp-2">
                {currentProject.title}
              </h3>
              <span className="bg-primary-blue text-white text-sm font-medium px-4 py-1 rounded-lg self-start mb-4">
                {currentProject.modules}
              </span>
              <p className="text-gray-600 leading-relaxed flex-1 line-clamp-5">
                {currentProject.description}
              </p>
              <div className="flex gap-4 mt-auto pt-4 pb-4 pr-4 border-t border-gray-100 justify-end">
                <button
                  onClick={prevProject}
                  className="w-10 h-10 rounded-full border-2 border-primary-blue text-primary-blue flex items-center justify-center hover:bg-primary-blue hover:text-white transition-colors"
                  aria-label="Sebelumnya"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextProject}
                  className="w-10 h-10 rounded-full border-2 border-primary-blue text-primary-blue flex items-center justify-center hover:bg-primary-blue hover:text-white transition-colors"
                  aria-label="Berikutnya"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 italic">Proyek tidak ditemukan.</p>
          </div>
        )}
      </section>

      <dialog
        ref={dialogRef}
        className="hidden open:flex fixed inset-0 z-50 m-auto bg-white rounded-xl p-8 w-[90%] md:w-137.5 h-auto max-h-[90vh] md:max-h-84 flex-col gap-2 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-[3px] overflow-hidden border-b-4 border-b-primary-blue"
        onClose={closeModal}
      >
        {selectedCourse && (
          <div className="relative w-full flex flex-col">
            <button
              className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full text-primary-blue border-[1.5px] border-primary-blue hover:bg-primary-blue hover:text-white transition-colors z-50"
              onClick={closeModal}
              aria-label="Tutup modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="w-full flex flex-col items-center mb-6">
              <h2 className="text-2xl font-semibold text-primary-blue text-center mb-1">
                {selectedCourse.name}
              </h2>
              <p className="text-center text-gray-600 text-xs font-medium">
                Usia {selectedCourse.age_range} (
                {selectedCourse.duration_per_session})
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-end gap-4">
              <div className="flex flex-col md:flex-row items-end gap-6 w-full relative">
                <div className="flex-1 self-stretch flex flex-col justify-start">
                  <div className="mb-3">
                    <span className="bg-primary-blue text-white text-[10px] tracking-wider font-medium px-3 py-1 rounded-md inline-block">
                      Tentang Kursus
                    </span>
                  </div>
                  <p className="text-xs text-black leading-relaxed text-justify flex-1">
                    {selectedCourse.description}
                  </p>
                </div>
                <div className="w-28 md:w-48 shrink-0 z-10 relative -mt-6 -mr-14 -mb-10 -rotate-6 translate-x-2 translate-y-2">
                  <img
                    src={mascotImg1}
                    alt="maskot"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
