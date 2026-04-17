import heroImg from "../assets/images/hero-image.png";
import logoImg from "../assets/images/logo-knsmr.png";

import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { courses } from "../assets/data/courseTypes";
import { promotions } from "../assets/data/promotions";
import { events } from "../assets/data/events";
import { reviews } from "../assets/data/reviews";

export default function Home() {
  const promoRef = useRef(null);
  const eventRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const observerOptions = {
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('[class*="reveal"]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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

  return (
    <div>
      <section className="container mx-auto px-6 lg:px-24 py-10 flex flex-col lg:flex-row bg-linear-to-br from-transparent via-50% via-secondary-pink to-secondary-blue items-center justify-center gap-6 overflow-hidden">
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
            {courses.map((course, index) => (
              <Link 
                to={course.link} 
                key={course.id} 
                className="group block reveal"
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className="mx-auto max-w-sm overflow-hidden rounded-2xl shadow-md bg-white border border-gray-100 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2">
                  
                  <div className="aspect-video lg:aspect-4/4 overflow-hidden">
                    <img
                      src={course.image}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                      alt={course.title}
                    />
                  </div>
                  
                  <div className="p-5">
                    <p className="text-medium font-bold text-gray-800 leading-tight">
                      {course.title}
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
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary-pink hover:bg-hover-pink text-white w-12 h-12 rounded-full z-10 shadow-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            >
              <span className="text-xl">❮</span>
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
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary-pink hover:bg-hover-pink text-white w-12 h-12 rounded-full z-10 shadow-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            >
              <span className="text-xl">❯</span>
            </button>

          </div>
        </div>
      </section>

    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-24">
        
        <div className="text-center mb-8 reveal">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Apa <span className="text-primary-pink">Kata Mereka</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-24">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-8 shadow-lg flex flex-col reveal"
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-primary-pink text-md">
                    {review.name}
                  </h3>
                  <p className="text-sm text-gray-400 font-medium">
                    {review.role}
                  </p>
                </div>
              </div>

              <div className="text-gray-600 leading-relaxed text-sm overflow-y-auto h-48 pr-3 custom-scrollbar">
                "{review.text}"
              </div>
            </div>
          ))}
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
                className="w-10 h-10 rounded-full border-2 border-primary-pink text-primary-pink flex items-center justify-center hover:bg-hover-pink/20 transition-colors"
              >
                <span className="text-xl">←</span>
              </button>

              <button
                onClick={() => scrollEvent(1)}
                className="w-10 h-10 rounded-full border-2 border-primary-pink text-primary-pink flex items-center justify-center hover:bg-hover-pink/20 transition-colors"
              >
                <span className="text-xl">→</span>
              </button>
            </div>
          </div>

          <div
            ref={eventRef}
            className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory pb-8 lg:mx-32" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {events.map((event) => (
              <div
                key={event.id}
                className="w-full lg:w-[calc(50%-16px)] shrink-0 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 snap-start group"
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

                  <h3 className="text-xl font-bold text-gray-900 leading-snug group-hover:text-hover-pink transition-colors">
                    {event.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

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

      <section className="py-24 bg-linear-to-b from-transparent via-30% via-pink-200 to-blue-200 text-center">

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