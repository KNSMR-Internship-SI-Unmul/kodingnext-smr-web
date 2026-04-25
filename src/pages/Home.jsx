import heroImg from "../assets/images/hero-image.png";
import logoImg from "../assets/images/logo-knsmr.png";

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { courseTypes } from "../assets/data/courseTypes";
import { promotions } from "../assets/data/promotions";
import { events } from "../assets/data/events";
import { reviews } from "../assets/data/reviews";
import { modules } from "../assets/data/modules";

export default function Home() {
  const promoRef = useRef(null);
  const eventRef = useRef(null);
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const getAgeRangeForCourseType = (courseTypeName) => {
    const matchingModules = modules.filter(m => m.course_type === courseTypeName);
    if (matchingModules.length === 0) return "";

    const ages = matchingModules.map(m => m.age_range);

    const uniqueAges = [...new Set(ages)];
    return uniqueAges.join(", "); 
  };

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
      const scrollAmount = direction === "left" 
      ? -(clientWidth / 3) 
      : (clientWidth / 3);
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

  useEffect(() => {
    document.title = "Beranda | Koding Next Samarinda";
    window.scrollTo(0, 0);

    const observerOptions = {threshold: 0.15,};

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('[class*="reveal"]');
    elements.forEach((el) => observer.observe(el));

    const currentRef = scrollRef.current;
        if (currentRef) {
          currentRef.addEventListener("scroll", handleScroll);
        }

        return () => {
              observer.disconnect();
              if (currentRef) {
                currentRef.removeEventListener("scroll", handleScroll);
              }
            };
          }, []);

  return (
    <div>
      <section className="container mx-auto px-6 lg:px-24 py-10 flex flex-col lg:flex-row bg-linear-to-br from-primary-pink/40 via-white to-primary-blue/40 items-center justify-center gap-6 overflow-hidden">
        <div className="lg:w-1/2 text-center lg:text-left reveal lg:pl-20">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900 text-shadow-xs">
            Koding Next <br />
            <span className="text-primary-pink">Samarinda</span>
          </h1>

          <p className="mt-4 text-gray-600 text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
            Bantu anak Anda menjadi Future Coders yang siap menghadapi dunia teknologi dengan program belajar di Koding Next Samarinda.
          </p>

          <a
            href="https://wa.me/6281115525959"
            target="_blank"
            className="mt-8 inline-block bg-primary-pink hover:bg-hover-pink text-white font-medium px-6 py-3 rounded-lg shadow-sm transition-all duration-300"
          >
            Daftar Sekarang
          </a>
        </div>

        <div className="lg:w-1/2 flex justify-center lg:justify-end animate-float">
          <img src={heroImg} alt="Hero" className="w-full max-w-sm lg:max-w-md drop-shadow-2xl" />
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-45">
          <div className="bg-secondary-pink rounded-xl shadow-lg border-b-6 border-primary-pink p-10 lg:p-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
              
              <div className="w-full lg:w-1/3 flex justify-center reveal-left">
                <div className="relative">
                  <img
                    src={logoImg}
                    className="relative w-60 h-58 rounded-full object-cover shadow-2xl"
                    alt="Logo"
                  />
                </div>
              </div>

              <div className="w-full lg:w-2/3 text-center lg:text-left reveal-right">
                <p className="text-gray-700 text-lg leading-relaxed font-sans max-w-2xl">
                  Misi kami memberdayakan generasi inovator teknologi berikutnya melalui kurikulum coding yang mengasah kreativitas dan keterampilan pemecahan masalah.
                </p>

                <a
                  href="/tentangkami"
                  className="mt-8 inline-block border-2 border-primary-pink text-primary-pink hover:bg-hover-pink hover:text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-sm"
                >
                  Lihat Selengkapnya
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="py-18 bg-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-24">
          
          <div className="text-center reveal">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
              Kursus <span className="text-primary-pink">Kami</span>
            </h1>
            <p className="mt-6 text-gray-600 max-w-4xl mx-auto text-medium leading-relaxed">
              Kami menawarkan kurikulum komprehensif yang dikembangkan oleh tim internasional, guru-guru yang berpengalaman, dan fokus pada pembelajaran individual dan berbasis proyek. Anak-anak dapat mengeksplorasi coding dan teknologi dengan cara yang menyenangkan dan menarik.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:px-24"> 
            {courseTypes.map((course, index) => (
              <Link 
                key={course.id} 
                to={`/kursus/${course.id}`}
                className="group block reveal"
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className="mx-auto max-w-sm overflow-hidden rounded-2xl shadow-md bg-white border border-gray-100 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2">
                  
                  <div className="aspect-video lg:aspect-4/4 overflow-hidden">
                    <img
                      src={course.image}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                      alt={course.name}
                    />
                  </div>
                  
                  <div className="p-5">
                    <p className="text-medium font-bold text-gray-800 leading-tight">
                      {course.name} 
                      <span className="ml-2 text-sm font-medium text-primary-purple bg-purple-50 px-2 py-0.5 rounded-md">
                        {getAgeRangeForCourseType(course.name)}
                      </span>
                    </p>
                    <div className="mt-2 flex items-center text-sm text-gray-600 transition-colors duration-300 group-hover:text-hover-pink font-semibold">
                      Detail Program <span className="ml-1">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-32">
          
          <div className="mb-8 text-center lg:text-center reveal">
            <h2 className="text-3xl lg:text-3xl font-bold text-gray-900">
              Jangan lewatkan <span className="text-primary-pink">penawaran spesial</span> dari kami!
            </h2>
          </div>

          <div className="relative group lg:px-24">

            <button
              onClick={() => scrollPromo(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary-pink hover:bg-hover-pink text-white w-12 h-12 rounded-full z-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
            </svg>
            </button>

            <div
              ref={promoRef}
              className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory py-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {promotions.map((promo) => (
                <div 
                  key={promo.id} 
                  className="w-[85%] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start"
                >
                  <img
                    src={promo.image}
                    className="w-full h-full aspect-3/4 object-cover rounded-2xl shadow-md border border-gray-100 hover:-translate-y-2 transition-all duration-300"
                    alt="Promo Koding Next"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollPromo(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary-pink hover:bg-hover-pink text-white w-12 h-12 rounded-full z-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </section>

    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-42">
        <div className="text-center mb-4 reveal">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Apa <span className="text-primary-pink">Kata Mereka</span>
          </h2>
        </div>

        <div className="relative group">
          <div className="mt-10 flex items-center justify-center gap-6 max-w-md mx-auto"></div>

            <div 
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-10 px-4">
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-center bg-white rounded-3xl p-8 shadow-xl border border-gray-50 flex flex-col reveal"
                  style={{ transitionDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center gap-4 mb-5">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-pink-100"/>
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
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
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
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
    </section>

      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex justify-between items-end mb-12 lg:pl-20 lg:pr-32">
            <div>
              <h2 className="px-8 text-4xl font-extrabold text-gray-900 leading-tight">
                Kegiatan <span className="text-primary-pink">Kami</span>
              </h2>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => scrollEvent(-1)}
                className="w-10 h-10 rounded-full border-2 border-primary-pink text-primary-pink flex items-center justify-center hover:bg-hover-pink hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                </svg>

              </button>

              <button
                onClick={() => scrollEvent(1)}
                className="w-10 h-10 rounded-full border-2 border-primary-pink text-primary-pink flex items-center justify-center hover:bg-hover-pink hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>

              </button>
            </div>
          </div>

          <div
            ref={eventRef}
            className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory pb-8 lg:mx-32" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
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
                    src={event.image}
                    className="w-full h-64 lg:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={event.name}
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-primary-pink mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg> 
                    <span className="text-base font-medium">{event.event_date}</span>
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
            aria-label="Tutup modal"
          />

          <dialog
            className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden relative flex flex-row focus:outline-none animate-in zoom-in-95 duration-300"
            aria-modal="true"
            aria-labelledby="modal-title"
          >

            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full border-[1.5px] border-primary-pink bg-white text-primary-pink hover:bg-primary-pink hover:text-white transition-all"
              aria-label="Tutup"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-85 h-85 shrink-0 overflow-hidden rounded-xl m-8">
              <img
                src={selectedEvent.image}
                alt={`Foto kegiatan ${selectedEvent.name}`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 py-8 pr-6 flex flex-col justify-start">

              <div className="flex items-center gap-2 text-primary-pink mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">{selectedEvent.event_date}</span>
              </div>

              <h2 id="modal-title" className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                {selectedEvent.name}
              </h2>

              <p className="text-gray-800 text-sm leading-relaxed text-justify">
                {selectedEvent.description}
              </p>

            </div>
          </dialog>
        </div>
      )}
          <div className="flex justify-center mt-6">
            <a
              href="/kegiatan"
              className="border-2 border-primary-pink text-primary-pink px-6 py-3 rounded-lg font-medium hover:bg-hover-pink hover:text-white transition-all duration-300 shadow-sm"
            >
              Lihat Selengkapnya
            </a>
          </div>
        </div>
      </section>


      <section className="py-24 bg-linear-to-b from-transparent via-30% via-primary-pink/40 to-primary-blue/40 text-center">

        <h2 className="text-4xl font-bold mb-4 mt-4">
            Start Your Journey as a <span className="text-primary-pink">Future Coder!</span>
        </h2>

        <p className="mt-4 text-gray-700 max-w-xl mx-auto">
          Bergabunglah dengan Koding Next Samarinda dan bantu anak Anda
          mengembangkan kreativitas, logika, dan kemampuan teknologi sejak dini.
        </p>

        <a href="https://wa.me/6281115525959" className="mt-6 inline-block bg-primary-pink text-white px-6 py-3 rounded-lg font-medium hover:bg-hover-pink transition-colors">
          Hubungi Kami
        </a>

      </section>

    </div>
  );
}