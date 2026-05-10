import heroImg from "../assets/images/rb.jpg";
import mascotImg1 from "../assets/images/mascot1.png";
import LoadingScreen from "../components/LoadingScreen";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { service } from "../services/service";

export default function RoboNext() {
  const [courseDetail, setCourseDetail] = useState(null);
  const [modules, setModules] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [projectIndex, setProjectIndex] = useState(0);

  const COURSE_ID = 3;
  const dialogRef = useRef(null);
  const scrollPosRef = useRef(0);
  const ageCategories = ["4-7 Tahun", "8-12 Tahun", "12-16 Tahun"];

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [resCourse, resModules, resProjects] = await Promise.all([
          service.getCourseById(COURSE_ID),
          service.getModules(COURSE_ID),
          service.getProjects(),
        ]);

        setCourseDetail(resCourse?.data || resCourse);
        setModules(resModules?.data || resModules || []);
        setProjects(resProjects?.data || resProjects || []);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [COURSE_ID]);

  const sortedModules = useMemo(() => {
    return [...modules].sort((a, b) => a.id - b.id);
  }, [modules]);

  const prevProject = () => {
    setProjectIndex((prev) =>
      prev === 0 ? filteredProjects.length - 1 : prev - 1,
    );
  };

  const nextProject = () => {
    setProjectIndex((prev) =>
      prev === filteredProjects.length - 1 ? 0 : prev + 1,
    );
  };

  const openModal = (module) => {
    scrollPosRef.current = window.scrollY;
    setSelectedCourse(module);
  };

  const closeModal = () => {
    if (dialogRef.current?.open) dialogRef.current.close();
    setSelectedCourse(null);
    window.scrollTo({ top: scrollPosRef.current, behavior: "instant" });
  };

  const filteredProjects = useMemo(() => {
    if (!Array.isArray(projects) || modules.length === 0) return [];

    return projects.filter((project) => {
      const parentModule = modules.find((m) => m.name === project.module);

      if (!parentModule) return false;

      const cleanSelectedAge = selectedAge.replace(" Tahun", "");
      const matchesAge =
        selectedAge === "" || parentModule.age_range === cleanSelectedAge;

      const query = searchQuery.toLowerCase();
      const matchesSearch =
        project.student?.toLowerCase().includes(query) ||
        project.title?.toLowerCase().includes(query);

      return matchesAge && matchesSearch;
    });
  }, [projects, selectedAge, searchQuery, modules]);

  useEffect(() => {
    setProjectIndex(0);
  }, [selectedAge, searchQuery]);

  const currentProject = filteredProjects[projectIndex] || null;

  useEffect(() => {
    if (courseDetail) {
      document.title = `${courseDetail.name} | Koding Next Samarinda`;
      window.scrollTo(0, 0);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    if (dialogRef.current && selectedCourse) {
      dialogRef.current.showModal();
    }

    return () => observer.disconnect();
  }, [selectedCourse, loading, courseDetail]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen">
      <section className="relative w-full h-120 flex items-center reveal">
        <img
          src={heroImg}
          className="absolute inset-0 w-full h-full object-cover"
          alt={courseDetail?.name}
        />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-16 w-full flex justify-end">
          <div className="relative p-8 rounded-xl max-w-md bg-white/60 backdrop-blur-sm border border-white/20 shadow-2xl">
            <h2 className="text-6xl font-bold text-primary-purple mb-4">
              {courseDetail?.name || "Little Koders"}
            </h2>
            <p className="text-black font-medium text-sm leading-relaxed mb-6">
              {courseDetail?.description}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() =>
                  document
                    .getElementById("modul-section")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="bg-primary-purple text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-hover-purple transition-colors"
              >
                Lihat Modul
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("project-section")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="bg-white border-[1.5px] border-primary-purple text-primary-purple px-4 py-2 rounded-lg text-sm font-medium hover:bg-hover-purple hover:border-hover-purple hover:text-white transition-colors"
              >
                Lihat Proyek
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="modul-section" className="py-16 reveal">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-14">
            Modul <span className="text-primary-purple">Kami</span>
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1.5 bg-primary-purple h-full rounded-full hidden md:block" />

          <div className="-space-y-8">
            {sortedModules.map((m, index) => {
              const side = index % 2 === 0 ? "left" : "right";
              return (
                <div key={m.id} className="flex items-center relative reveal">
                  <div className="w-[calc(50%-20px)] flex justify-end items-center pr-2">
                    {side === "left" && (
                      <button
                        className="relative inline-block text-left w-full group"
                        onClick={() => openModal(m)}
                      >
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-primary-purple rounded-full flex items-center justify-center text-white font-semibold text-3xl">
                          {index + 1}
                        </div>
                        <div className="bg-white p-8 h-30 rounded-2xl shadow-xl border-2 border-gray-200 border-b-4 border-b-primary-purple flex flex-col items-center justify-center text-center transition-all group-hover:scale-105 group-hover:border-primary-purple">
                          <h3 className="text-primary-purple font-semibold text-xl mb-1">
                            {m.name}
                          </h3>
                          <p className="text-xs font-medium text-gray-800">
                            Usia: {m.age_range} Tahun ({m.duration_per_session}{" "}
                            Menit/Sesi)
                          </p>
                        </div>
                      </button>
                    )}
                  </div>

                  <div className="w-24 shrink-0 flex items-center justify-center z-10">
                    <div className="w-4 h-4 bg-primary-purple rounded-full" />
                  </div>

                  <div className="w-[calc(50%-20px)] flex justify-start items-center pl-2">
                    {side === "right" && (
                      <button
                        className="relative inline-block text-left w-full group"
                        onClick={() => openModal(m)}
                      >
                        <div className="bg-white p-8 h-30 rounded-2xl shadow-xl border-2 border-gray-200 border-b-4 border-b-primary-purple flex flex-col items-center justify-center text-center transition-all group-hover:scale-105 group-hover:border-primary-purple">
                          <h3 className="text-primary-purple font-semibold text-xl mb-1">
                            {m.name}
                          </h3>
                          <p className="text-xs font-medium text-gray-800">
                            Usia: {m.age_range} Tahun ({m.duration_per_session}{" "}
                            Menit/Sesi)
                          </p>
                        </div>
                        <div className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-primary-purple rounded-full flex items-center justify-center text-white font-semibold text-3xl">
                          {index + 1}
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className="hidden open:flex fixed inset-0 z-50 m-auto bg-white rounded-xl p-8 w-[90%] md:w-137.5 h-auto max-h-[90vh] md:max-h-84 flex-col gap-2 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-[3px] overflow-hidden border-b-4 border-b-primary-purple"
        onClose={closeModal}
      >
        {selectedCourse && (
          <div className="relative w-full flex flex-col">
            <button
              className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full text-primary-purple border-[1.5px] border-primary-purple hover:bg-primary-purple hover:text-white transition-colors z-50"
              onClick={closeModal}
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
              <h2 className="text-2xl font-semibold text-primary-purple text-center mb-1">
                {selectedCourse.name}
              </h2>
              <p className="text-center text-gray-600 text-xs font-medium">
                Usia {selectedCourse.age_range} Tahun (
                {selectedCourse.duration_per_session} Menit/Sesi)
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-end gap-6 w-full relative">
              <div className="flex-1 self-stretch flex flex-col justify-start">
                <div className="mb-3">
                  <span className="bg-primary-purple text-white text-xs tracking-wider px-3 py-2 rounded-md inline-block">
                    Tentang Kursus
                  </span>
                </div>
                <p className="text-xs font-medium text-black leading-relaxed text-justify">
                  {selectedCourse.description}
                </p>
              </div>

              <div className="w-28 md:w-48 shrink-0 z-10 relative -mt-8 -mr-14 -mb-10 -rotate-6 translate-x-2 translate-y-2">
                <img
                  src={mascotImg1}
                  alt="maskot"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </dialog>

      <section id="project-section" className="py-10 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">
          Proyek <span className="text-primary-purple">Siswa</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-10 px-4">
          {ageCategories.map((age) => (
            <button
              key={age}
              onClick={() => {
                setSelectedAge(selectedAge === age ? "" : age);
                setSearchQuery("");
              }}
              className={`border-2 border-primary-purple px-8 py-2 rounded-lg font-medium transition-colors ${
                selectedAge === age
                  ? "bg-primary-purple text-white"
                  : "text-primary-purple hover:bg-primary-purple hover:text-white"
              }`}
            >
              {age}
            </button>
          ))}

          <div className="relative">
            <input
              type="text"
              placeholder="Cari judul atau nama siswa..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedAge("");
              }}
              className={`
                border-2 rounded-lg px-4 py-2 text-base outline-none w-32 md:w-100 transition-colors ${
                  searchQuery === ""
                    ? "border-primary-purple"
                    : "border-gray-300 focus:border-primary-purple"
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
          <div className="bg-white rounded-lg max-w-4xl mx-auto shadow-xl p-6 flex flex-col md:flex-row gap-8 border border-gray-100 min-h-90">
            <div className="md:w-1/2 relative group shrink-0">
              <div className="rounded-lg w-full h-80 bg-gray-200 overflow-hidden">
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
              <h3 className="text-3xl font-semibold text-gray-900 mb-1 line-clamp-2">
                {currentProject.title}
              </h3>
              <h2>
                <span className="text-gray-600 font-medium text-sm mb-4 block">
                  Oleh: {currentProject.student}
                </span>
              </h2>
              <span className="bg-primary-purple text-white text-sm font-medium px-4 py-1 rounded-lg self-start mb-4">
                {currentProject.module}
              </span>
              <p className="text-gray-600 leading-relaxed flex-1 line-clamp-5">
                {currentProject.description}
              </p>
              <div className="flex gap-4 mt-auto pt-4 pb-4 pr-4 border-t border-gray-100 justify-end">
                <button
                  onClick={prevProject}
                  className="w-10 h-10 rounded-full border-2 border-primary-purple text-primary-purple flex items-center justify-center hover:bg-primary-purple hover:text-white transition-colors"
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
                  className="w-10 h-10 rounded-full border-2 border-primary-purple text-primary-purple flex items-center justify-center hover:bg-primary-purple hover:text-white transition-colors"
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
    </div>
  );
}
