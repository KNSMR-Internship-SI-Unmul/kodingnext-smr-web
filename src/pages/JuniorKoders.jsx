import heroImg from "../assets/images/jk.jpg";
import mascotImg1 from "../assets/images/mascot1.png";
import mascotImg2 from "../assets/images/mascot2.png";
import LoadingScreen from "../components/LoadingScreen";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { service } from "../services/service";

export default function JuniorKoders() {
  const [courseDetail, setCourseDetail] = useState(null);
  const [modules, setModules] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedAge, setSelectedAge] = useState("8-12");
  const [selectedCategory, setSelectedCategory] = useState("Software");
  const [selectedModule, setSelectedModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [projectIndex, setProjectIndex] = useState(0);
  const [selectedAgeProject, setSelectedAgeProject] = useState("");

  const COURSE_ID = 2;
  const dialogRef = useRef(null);
  const scrollPosRef = useRef(0);
  const ageCategories = ["8-12 Tahun", "12-16 Tahun"];

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredModules = useMemo(() => {
    return (modules || [])
      .filter((m) => m.age_range === selectedAge)
      .filter((m) => {
        const cat = m.category?.toLowerCase() || "";

        if (!cat || cat.trim() === "") return true;

        if (selectedCategory === "Software") {
          return cat.includes("software") || cat.includes("game");
        }
        if (selectedCategory === "Innovator") {
          return cat.includes("innovator");
        }

        return true;
      })
      .toSorted((a, b) => a.id - b.id);
  }, [modules, selectedAge, selectedCategory]);

  const openModal = (module) => {
    scrollPosRef.current = window.scrollY;
    setSelectedModule(module);
  };

  const closeModal = () => {
    if (dialogRef.current?.open) dialogRef.current.close();
    setSelectedModule(null);
    window.scrollTo({ top: scrollPosRef.current, behavior: "instant" });
  };

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

  const filteredProjects = useMemo(() => {
    if (!Array.isArray(projects) || modules.length === 0) return [];

    return projects.filter((project) => {
      const parentModule = modules.find((m) => m.name === project.module);
      if (!parentModule) return false;

      const cleanSelectedAge = selectedAgeProject.replace(" Tahun", "");
      const matchesAge =
        selectedAgeProject === "" ||
        parentModule.age_range === cleanSelectedAge;

      const query = searchQuery.toLowerCase();
      const matchesSearch =
        project.student?.toLowerCase().includes(query) ||
        project.title?.toLowerCase().includes(query);

      return matchesAge && matchesSearch;
    });
  }, [projects, selectedAgeProject, searchQuery, modules]);

  useEffect(() => {
    setProjectIndex(0);
  }, [selectedAgeProject, searchQuery]);

  const currentProject = filteredProjects[projectIndex] || null;

  const getCategoryLabel = (cat) => {
    if (cat === "Software") {
      return selectedAge === "8-12"
        ? "Game Development"
        : "Software Development";
    }
    return "Tech Innovator";
  };

  useEffect(() => {
    if (courseDetail) {
      document.title = `${courseDetail.name} | Koding Next Samarinda`;
    }
  }, [courseDetail]);

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 },
    );

    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll(".reveal");
      elements.forEach((el) => observer.observe(el));
    }, 150);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [loading, filteredModules, filteredProjects]);

  useEffect(() => {
    if (dialogRef.current) {
      if (selectedModule) {
        dialogRef.current.showModal();
      } else if (dialogRef.current.open) {
        dialogRef.current.close();
      }
    }
  }, [selectedModule]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen">
      <section className="relative w-full h-120 flex items-center reveal">
        <img
          src={heroImg}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Hero"
        />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-16 w-full flex justify-end">
          <div className="relative p-8 rounded-xl max-w-124 bg-white/60 backdrop-blur-sm border border-white/20 shadow-2xl">
            <h2 className="text-6xl font-bold text-primary-blue mb-4">
              {courseDetail?.name}
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
                className="bg-primary-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-hover-blue transition-colors"
              >
                Lihat Modul
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("project-section")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="bg-white border-[1.5px] border-primary-blue text-primary-blue px-4 py-2 rounded-lg text-sm font-medium hover:bg-hover-blue hover:text-white transition-colors"
              >
                Lihat Proyek
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="modul-section" className="py-16 reveal">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-10">
            Modul <span className="text-primary-blue">Kami</span>
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-12 mb-12 px-24 ">
            <button
              type="button"
              onClick={() => setSelectedAge("8-12")}
              className={`relative flex-1 max-w-lg rounded-lg p-8 cursor-pointer transition-all duration-300 shadow-xl overflow-hidden group ${
                selectedAge === "8-12"
                  ? "ring-4 ring-hover-blue scale-[1.02]"
                  : "opacity-70 hover:opacity-100"
              }`}
              style={{ backgroundColor: "#51a7d3" }}
            >
              <div className="relative z-10">
                <h3 className="text-white text-xl font-medium mb-6 text-center">
                  Junior Koders 8-12
                </h3>
                <div className="flex flex-col gap-3 items-start">
                  <span className="bg-white text-primary-blue px-6 py-2 rounded-md font-medium text-sm shadow-sm">
                    Game Development
                  </span>
                  <span className="bg-white text-primary-blue px-6 py-2 rounded-md font-medium text-sm shadow-sm">
                    Tech Innovator
                  </span>
                </div>
              </div>
              <img
                src={mascotImg1}
                alt="Robot Mascot"
                className="absolute -bottom-24 -right-6 w-48 h-72 object-contain translate-y-4 translate-x-2"
              />
            </button>

            <button
              type="button"
              onClick={() => setSelectedAge("12-16")}
              className={`relative flex-1 max-w-lg rounded-lg p-8 cursor-pointer transition-all duration-300 shadow-xl overflow-hidden group ${
                selectedAge === "12-16"
                  ? "ring-4 ring-hover-blue scale-[1.02]"
                  : "opacity-70 hover:opacity-100"
              }`}
              style={{ backgroundColor: "#51a7d3" }}
            >
              <div className="relative z-10">
                <h3 className="text-white text-xl font-medium mb-6 text-center">
                  Junior Koders 12-16
                </h3>
                <div className="flex flex-col gap-3 items-start">
                  <span className="bg-white text-primary-blue px-6 py-2 rounded-md font-medium text-sm shadow-sm">
                    Tech Innovator
                  </span>
                  <span className="bg-white text-primary-blue px-6 py-2 rounded-md font-medium text-sm shadow-sm">
                    Software Development
                  </span>
                </div>
              </div>
              <img
                src={mascotImg2}
                alt="Cat Mascot"
                className="absolute -bottom-10 -right-2 w-48 h-58 object-contain translate-y-4 translate-x-2"
              />
            </button>
          </div>

          <div className="flex justify-center border-b border-gray-200 max-w-4xl mx-auto mb-8">
            {["Software", "Innovator"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-32 py-4 text-xl font-medium transition-all border-b-4 ${
                  selectedCategory === cat
                    ? "border-primary-blue text-primary-blue"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1.5 bg-primary-blue h-full rounded-full hidden md:block" />
          <div className="space-y-12 md:-space-y-25">
            {filteredModules.length > 0 ? (
              filteredModules.map((m, index) => (
                <div
                  key={m.id}
                  className="flex items-center relative min-h-48 reveal"
                >
                  <div className="w-full md:w-[calc(50%-20px)] flex justify-end pr-2 md:pr-8">
                    {index % 2 === 0 && (
                      <Card
                        module={m}
                        index={index}
                        onClick={() => openModal(m)}
                        side="left"
                      />
                    )}
                  </div>
                  <div className="hidden md:flex w-10 shrink-0 items-center justify-center z-10">
                    <div className="w-4 h-4 bg-primary-blue rounded-full ring-primary-blue" />
                  </div>
                  <div className="w-full md:w-[calc(50%-20px)] flex justify-start pl-0 md:pl-8">
                    {index % 2 !== 0 && (
                      <Card
                        module={m}
                        index={index}
                        onClick={() => openModal(m)}
                        side="right"
                      />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 italic py-10">
                Belum ada modul untuk kategori ini.
              </p>
            )}
          </div>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className="hidden open:flex fixed inset-0 z-50 m-auto bg-white rounded-xl p-8 w-[90%] md:w-137.5 h-auto max-h-[90vh] md:max-h-84 flex-col gap-2 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-[3px] overflow-hidden border-b-4 border-b-primary-blue"
        onClose={closeModal}
      >
        {selectedModule && (
          <div className="relative w-full flex flex-col">
            <button
              className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full text-primary-blue border-[1.5px] border-primary-blue hover:bg-primary-blue hover:text-white transition-colors z-50"
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
              <h2 className="text-2xl font-semibold text-primary-blue text-center mb-1">
                {selectedModule.name}
              </h2>
              <p className="text-center text-gray-600 text-xs font-medium">
                Usia {selectedModule.age_range} Tahun (
                {selectedModule.duration_per_session} Menit/Sesi)
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-end gap-6 w-full relative">
              <div className="flex-1 self-stretch flex flex-col justify-start">
                <div className="mb-3">
                  <span className="bg-primary-blue text-white text-xs tracking-wider px-3 py-2 rounded-md inline-block">
                    Tentang Kursus
                  </span>
                </div>
                <p className="text-xs font-medium text-black leading-relaxed text-justify">
                  {selectedModule.description}
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
          Proyek <span className="text-primary-blue">Siswa</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-10 px-4">
          {ageCategories.map((age) => (
            <button
              key={age}
              onClick={() => {
                setSelectedAgeProject(selectedAgeProject === age ? "" : age);
                setSearchQuery("");
              }}
              className={`border-2 border-primary-blue px-10 py-2 rounded-lg font-medium transition-colors ${
                selectedAgeProject === age
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
              placeholder="Cari judul atau nama siswa..."
              value={searchQuery}
              onFocus={() => setSelectedAgeProject("")}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedAge("");
              }}
              className={`
                peer border-2 rounded-lg px-4 py-2 pr-10 text-base outline-none w-32 md:w-130 transition-all
                ${
                  searchQuery === ""
                    ? "border-gray-300 focus:border-primary-blue"
                    : "border-primary-blue"
                }
              `}
            />
            <div
              className={`s
                absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none flex items-center justify-center rounded-full text-white p-1
                ${
                  searchQuery === ""
                    ? " bg-gray-300 peer-focus:bg-primary-blue"
                    : " bg-primary-blue"
                }
              `}
            >
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
          <div className="bg-white rounded-lg max-w-4xl mx-auto shadow-xl p-6 flex flex-col md:flex-row gap-8 border border-gray-100 h-auto md:h-90">
            <div className="md:w-1/2 relative group shrink-0">
              <div className="rounded-lg w-full h-80 bg-gray-200 overflow-hidden">
                {currentProject.media_url.match(/\.(mp4|webm)$/i) ? (
                  <video
                    src={currentProject.media_url}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    src={currentProject.media_url}
                    alt={currentProject.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col h-full overflow-hidden">
              <h3 className="text-3xl font-semibold text-gray-900 mb-1 line-clamp-2">
                {currentProject.title}
              </h3>

              <span className="text-gray-600 font-medium text-sm mb-4 block">
                Oleh: {currentProject.student}
              </span>

              <span className="bg-primary-blue text-white text-sm font-medium px-4 py-1 rounded-lg self-start mb-4 shrink-0">
                {currentProject.module}
              </span>

              <div className="flex-1 overflow-hidden mb-2 hide-scrollbar">
                <div className="h-full pr-4 overflow-y-auto text-justify text-gray-600 leading-relaxed custom-scrollbar">
                  {currentProject.description}
                </div>
              </div>

              <div className="flex gap-4 mt-auto pt-4 border-t border-gray-100 justify-end shrink-0">
                <button
                  onClick={prevProject}
                  className="w-10 h-10 rounded-full border-2 border-primary-blue text-primary-blue flex items-center justify-center hover:bg-primary-blue hover:text-white transition-colors"
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
          <div className="text-center py-42">
            <p className="text-lg text-gray-400 italic">Belum ada proyek.</p>
          </div>
        )}
      </section>
    </div>
  );
}

function Card({ module, index, onClick, side }) {
  const isLeft = side === "right";
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative w-full group transition-transform hover:scale-105 text-left"
    >
      <div
        className={`absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center text-white font-semibold text-3xl ${isLeft ? "md:-right-5" : "md:-left-5"}`}
      >
        {index + 1}
      </div>
      <div className="bg-white p-8 h-30 rounded-2xl shadow-xl border-2 border-gray-200 border-b-4 border-b-primary-blue flex flex-col items-center justify-center text-center transition-all group-hover:scale-105 group-hover:border-primary-blue">
        <h3 className="text-primary-blue font-semibold text-xl mb-1">
          {module.name}
        </h3>
        <p className="text-xs font-medium text-gray-800">
          Usia: {module.age_range} Tahun ({module.duration_per_session}{" "}
          Menit/Sesi)
        </p>
      </div>
    </button>
  );
}
