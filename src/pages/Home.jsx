import heroImg from "../assets/images/hero-image.png";
import logoImg from "../assets/images/logo-knsmr.png";
import LoadingScreen from "../components/LoadingScreen";

import { React, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { service } from "../services/service";

export default function Home() {
  const promoRef = useRef(null);
  const eventRef = useRef(null);
  const scrollRef = useRef(null);

  const [promotions, setPromotions] = useState([]);
  const [events, setEvents] = useState([]);
  const [courseTypes, setCourseTypes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setIsLoading(true);
        const [promoRes, eventRes, courseRes, reviewRes] = await Promise.all([
          service.getPromotions(),
          service.getEvents(),
          service.getCourses(),
          service.getReviews(),
        ]);

        setPromotions(promoRes?.data || []);
        setEvents(eventRes?.data || []);
        setCourseTypes(courseRes?.data || []);
        setReviews(reviewRes?.data || []);
      } catch (error) {
        console.error("Gagal memuat data beranda:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const totalScroll = scrollWidth - clientWidth;
      const progress = (scrollLeft / totalScroll) * 100;
      setScrollProgress(progress);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === "left" ? -(clientWidth / 3) : clientWidth / 3;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollPromo = (direction) => {
    promoRef.current.scrollBy({
      left: direction * 300,
      behavior: "smooth",
    });
  };

  const scrollEvent = (direction) => {
    eventRef.current.scrollBy({
      left: direction * 300,
      behavior: "smooth",
    });
  };

  const getPromoText = (promo, isExpanded) => {
    const description = promo.description || "";

    if (isExpanded) return description;

    const isLongText = description.length > 200;
    const truncatedText = description.slice(0, 200);

    return isLongText ? `${truncatedText}...` : truncatedText;
  };

  const [expandedPromos, setExpandedPromos] = useState({});

  const toggleExpand = (id) => {
    setExpandedPromos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const currentRef = scrollRef.current;
  if (currentRef) {
    currentRef.addEventListener("scroll", handleScroll);
  }

  useEffect(() => {
    document.title = "Beranda | Koding Next Samarinda";
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.15 },
    );

    const elements = document.querySelectorAll('[class*="reveal"]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main>
      <section className="mx-auto px-6 py-10 lg:px-24 flex flex-col lg:flex-row bg-linear-to-br from-primary-pink/40 via-white to-primary-blue/40 items-center justify-center overflow-hidden">
        <div className="lg:w-1/2 text-center lg:text-left reveal lg:pl-20">
          <h1 className="text-3xl lg:text-7xl font-bold leading-tight tracking-tight text-gray-900">
            Koding Next <br />
            <span className=" text-3xl lg:text-4xl lg:text-[60px] leading-tight tracking-tight text-primary-pink">
              Samarinda
            </span>
          </h1>

          <p className="mt-4 text-black text-[10px] lg:text-base text-center lg:text-justify max-w-md mx-auto lg:mx-0 leading-tight">
            Bantu anak Anda menjadi Future Coders yang siap menghadapi dunia
            teknologi dengan program belajar coding, game development, dan
            robotika di Koding Next Samarinda.
          </p>

          <a
            href="https://wa.me/6281115525959"
            target="_blank"
            className="mt-4 lg:mt-8 inline-block bg-primary-pink hover:bg-hover-pink text-white text-[10px] md:text-base font-medium px-4 py-2 lg:px-6 lg:py-3 rounded-lg shadow-sm transition-all duration-300"
            rel="noreferrer"
          >
            Daftar Sekarang
          </a>
        </div>

        <div className="mt-10 lg:mt-0 w-2/3 lg:w-1/2 flex justify-center lg:justify-end animate-float">
          <img
            src={heroImg}
            alt="Hero"
            className="w-full max-w-sm lg:max-w-md drop-shadow-2xl"
          />
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 lg:px-45">
          <div className="bg-secondary-pink/30 rounded-xl shadow-lg border-b-3 border-primary-pink p-10 lg:p-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
              <div className="w-1/3 flex justify-center reveal-left">
                <div className="relative">
                  <img
                    src={logoImg}
                    className="relative w-40 h-40 lg:w-60 lg:h-60 rounded-full object-cover shadow-2xl"
                    alt="Logo"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="w-full lg:w-2/3 text-center lg:text-left reveal-right">
                <p className="text-black text-xs lg:text-base leading-relaxed font-sans max-w-2xl text-justify">
                  Misi kami adalah memberdayakan generasi inovator teknologi
                  masa depan melalui kurikulum coding kelas dunia yang
                  menginspirasi kreativitas dan kemampuan pemecahan masalah.
                  Hadir secara resmi di Samarinda sejak 2023, kami berkomitmen
                  membawa standar pendidikan teknologi terbaik untuk mendukung
                  pertumbuhan talenta lokal di Kalimantan Timur.
                </p>

                <a
                  href="/tentangkami"
                  className="mt-8 inline-block border-2 border-primary-pink text-primary-pink hover:bg-hover-pink hover:border-hover-pink hover:text-white text-[10px] md:text-base font-medium px-4 py-2 lg:px-6 lg:py-3 rounded-lg transition-all duration-300 shadow-sm"
                >
                  Lihat Selengkapnya
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="text-center reveal">
            <h1 className="text-3xl lg:text-4xl font-bold text-black">
              Kursus <span className="text-primary-pink">Kami</span>
            </h1>
            <p className="mt-6 text-black max-w-4xl mx-auto text-xs lg:text-base leading-relaxed">
              Kami menawarkan kurikulum komprehensif yang dikembangkan oleh tim
              internasional, guru-guru yang berpengalaman, dan fokus pada
              pembelajaran individual dan berbasis proyek. Di Koding Next,
              anak-anak dapat mengeksplorasi coding dan teknologi dengan cara
              yang menyenangkan dan menarik.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:px-24">
            {courseTypes.length > 0 ? (
              courseTypes.map((course, index) => (
                <Link
                  key={course.id}
                  to={`/kursus/${course.name.toLowerCase().replaceAll(/\s+/g, "-")}`}
                  className="group block reveal"
                  style={{ transitionDelay: `${index * 0.15}s` }}
                >
                  <div className="mx-auto max-w-sm overflow-hidden rounded-2xl shadow-md bg-white border border-gray-100 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2">
                    <div className="aspect-video lg:aspect-square overflow-hidden">
                      <img
                        src={course.image_url}
                        className="w-full h-full object-cover" 
                        alt={course.name}
                        loading="lazy"
                      />
                    </div>

                    <div className="p-5">
                      <p className="text-base font-bold text-gray-800 leading-tight">
                        {course.name}
                      </p>
                      <div className="mt-1 flex items-center text-sm text-gray-600 transition-colors duration-300 group-hover:text-hover-pink font-medium">
                        Detail Program <span className="ml-1">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-400">Belum ada kursus yang tersedia.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-32">
          <div className="mb-4 text-center reveal">
            <h2 className="text-2xl lg:text-3xl font-bold text-black tracking-tight">
              Jangan lewatkan{" "}
              <span className="text-primary-pink">promo spesial</span> dari
              kami!
            </h2>
          </div>

          {Array.isArray(promotions) && promotions.length > 0 ? (
            <div className="relative lg:px-20">
              {promotions.length > 1 && (
                <button
                  onClick={() => scrollPromo(-1)}
                  className="absolute left-10 top-1/2 -translate-y-1/2 bg-primary-pink text-white hover:bg-hover-pink w-11 h-11 rounded-full z-10 flex items-center justify-center shadow-lg transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}

              <div
                ref={promoRef}
                className="flex overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {promotions.map((promo) => (
                  <div
                    key={promo.id}
                    className="w-full shrink-0 snap-start px-4"
                  >
                    <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-start gap-8 p-6 lg:p-8 transition-all duration-300">
                      <div className="w-full lg:w-[35%] shrink-0 lg:sticky lg:top-0">
                        <div className="aspect-4/5 w-full max-w-[320px] mx-auto overflow-hidden rounded-2xl shadow-md border border-gray-100 bg-white">
                          <img
                            src={promo.image_url}
                            alt={promo.title}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      <div className="w-full lg:w-[65%] flex flex-col">
                        <span className="text-primary-pink font-bold text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                          <span className="w-8 h-0.5 bg-primary-pink"></span>{" "}
                          Penawaran Terbatas
                        </span>

                        <h3 className="text-xl lg:text-2xl font-extrabold text-gray-900 mb-4 leading-tight">
                          {promo.title}
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 mb-8">
                          <div className="flex items-center gap-3 bg-white">
                            <div className="bg-primary-pink/10 p-2 rounded-lg">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-primary-pink"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] text-gray-800 uppercase font-bold">
                                Mulai
                              </span>
                              <span className="text-sm font-semibold text-gray-700">
                                {promo.start_date}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 bg-white">
                            <div className="bg-primary-pink/10 p-2 rounded-lg">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-primary-pink"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] text-gray-800 uppercase font-bold">
                                Berakhir
                              </span>
                              <span className="text-sm font-semibold text-gray-700">
                                {promo.end_date}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-black text-sm lg:text-base text-justify leading-relaxed">
                          <p className="transition-all duration-300">
                            {getPromoText(promo, expandedPromos[promo.id])}
                          </p>

                          {promo.description?.length > 200 && (
                            <button
                              onClick={() => toggleExpand(promo.id)}
                              className="mt-4 text-primary-pink text-sm font-bold hover:underline w-fit flex items-center gap-1"
                            >
                              {expandedPromos[promo.id]
                                ? "Lebih sedikit"
                                : "Selengkapnya"}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 transition-transform ${expandedPromos[promo.id] ? "rotate-180" : ""}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {promotions.length > 1 && (
                <button
                  onClick={() => scrollPromo(1)}
                  className="absolute right-10 top-1/2 -translate-y-1/2 bg-primary-pink text-white hover:bg-hover-pink w-11 h-11 rounded-full z-10 flex items-center justify-center shadow-lg transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          ) : (
            <div className="w-full py-16 text-center">
              <p className="text-gray-400 font-medium">
                Belum ada promosi aktif.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-42">
          <div className="text-center mb-4 reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Apa <span className="text-primary-pink">Kata Mereka</span>
            </h2>
          </div>

          <div className="relative group">
            <div className="mt-10 flex items-center justify-center gap-6 max-w-md mx-auto"></div>

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-10 px-4"
            >
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-center bg-white rounded-3xl p-8 shadow-xl border border-gray-50 flex flex-col reveal"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div>
                      <h3 className="font-bold text-primary-pink text-lg leading-tight">
                        {review.parents_name}
                      </h3>
                      <p className="text-sm text-gray-400 font-medium">
                        Parents
                      </p>
                    </div>
                  </div>

                  <div className="text-gray-600 leading-relaxed text-sm overflow-y-auto h-40 pr-3 custom-scrollbar">
                    "{review.review_content}"
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="container mx-auto px-6 lg:px-24">
            <div className="flex items-center gap-8 max-w-full mx-auto">
              <button
                onClick={() => scroll("left")}
                className="text-black hover:text-primary-pink transition-alltransition-all"
                aria-label="Slide sebelumnya"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              <div className="relative flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-primary-pink transition-all duration-300 ease-out"
                  style={{ width: `${scrollProgress}%` }}
                ></div>
              </div>

              <button
                onClick={() => scroll("right")}
                className="text-black hover:text-primary-pink transition-all"
                aria-label="Slide berikutnya"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex justify-between items-end mb-6 lg:pl-20 lg:pr-32">
            <div>
              <h2 className="px-8 text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Kegiatan <span className="text-primary-pink">Kami</span>
              </h2>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => scrollEvent(-1)}
                className="w-10 h-10 rounded-full border-2 border-primary-pink text-primary-pink flex items-center justify-center hover:bg-hover-pink hover:border-hover-pink hover:text-white transition-colors"
                aria-label="Slide sebelumnya"
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
                onClick={() => scrollEvent(1)}
                className="w-10 h-10 rounded-full border-2 border-primary-pink text-primary-pink flex items-center justify-center hover:bg-hover-pink hover:border-hover-pink hover:text-white transition-colors"
                aria-label="Slide berikutnya"
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

          <div
            ref={eventRef}
            className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory pb-8 lg:mx-32"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {events.map((event, index) => (
              <button
                key={event.id}
                type="button"
                onClick={() => setSelectedEvent(event)}
                className="w-full lg:w-[calc(50%-16px)] shrink-0 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 snap-start group"
                style={{ transitionDelay: `${index * 0.1}s` }}
                aria-label={`Lihat detail kegiatan ${event.name}`}
              >
                <div className="overflow-hidden">
                  <img
                    src={event.image_url}
                    className="w-full h-64 lg:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={event.name}
                    loading="lazy"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-primary-pink mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-base font-medium">
                      {event.event_date}
                    </span>
                  </div>

                  <h3 className="text-xl text-left font-semibold text-gray-900 leading-snug group-hover:text-hover-pink transition-colors">
                    {event.name}
                  </h3>
                </div>
              </button>
            ))}
          </div>

          {selectedEvent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
              <button
                type="button"
                className="absolute inset-0 bg-black/50 backdrop-blur-[3px] cursor-default w-full h-full"
                onClick={() => setSelectedEvent(null)}
                aria-label="Tutup kegiatan"
              />

              <dialog
                className="bg-white w-full max-w-3xl h-90 rounded-xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row focus:outline-none animate-in zoom-in-95 duration-300"
                open
                aria-modal="true"
                aria-labelledby="modal-title"
              >
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full border-[1.5px] border-primary-pink bg-white text-primary-pink hover:bg-primary-pink hover:text-white transition-all"
                  aria-label="Tutup"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className="w-full md:w-95 h-75 items-center shrink-0 overflow-hidden rounded-lg m-6 mt-8">
                  <img
                    src={selectedEvent.image_url}
                    alt={selectedEvent.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1 p-6 md:py-8 md:pr-8 flex flex-col justify-start min-h-0">
                  <div className="flex items-center gap-2 text-primary-pink mb-2 shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      {selectedEvent.event_date}
                    </span>
                  </div>

                  <h2
                    id="modal-title"
                    className="text-2xl font-bold text-gray-900 mb-4 shrink-0"
                  >
                    {selectedEvent.name}
                  </h2>

                  <p className="text-gray-800 text-sm leading-relaxed text-justify overflow-y-auto flex-1 pr-8 custom-scrollbar">
                    {selectedEvent.description}
                  </p>
                </div>
              </dialog>
            </div>
          )}
          <div className="flex justify-center mt-6">
            <a
              href="/kegiatan"
              className="border-2 border-primary-pink text-primary-pink rounded-lg text-[10px] md:text-base font-medium px-4 py-2 lg:px-6 lg:py-3 hover:bg-hover-pink hover:border-hover-pink hover:text-white transition-all duration-300 shadow-sm"
            >
              Lihat Kegiatan
            </a>
          </div>
        </div>
      </section>

      <section className="p-8 lg:p-18 py-24 bg-linear-to-b from-transparent via-30% via-primary-pink/30 to-primary-blue/40 text-center">
        <h2 className="text-2xl lg:text-4xl font-bold mb-4 mt-4">
          Start Your Journey as a{" "}
          <span className="text-primary-pink">Future Coder!</span>
        </h2>

        <p className="mt-8 text-black max-w-3xl mx-auto">
          Bergabunglah dengan Koding Next Samarinda dan bantu anak Anda
          mengembangkan kreativitas, logika, dan kemampuan teknologi sejak dini.
        </p>

        <a
          href="https://wa.me/6281115525959"
          target="_blank"
          className="mt-14 inline-block bg-primary-pink text-white rounded-lg text-[10px] md:text-base font-medium px-4 py-2 lg:px-6 lg:py-3 hover:bg-hover-pink transition-colors"
          rel="noreferrer"
        >
          Hubungi Kami
        </a>
      </section>
    </main>
  );
}
