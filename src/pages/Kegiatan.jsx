import { useState, useEffect } from "react";
import { events } from "../assets/data/events";

export default function Kegiatan() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    // Mengamati semua elemen yang memiliki class reveal
    const elements = document.querySelectorAll('[class*="reveal"]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-24">
          
          <div className="mb-12 text-center reveal">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Kegiatan <span className="text-primary-pink">Kami</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:mx-20">
            {events.map((event, index) => (
              <button
                key={event.id}
                type="button"
                onClick={() => setSelectedEvent(event)}
                className="text-left w-full bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500 focus:outline-none reveal"
                style={{ transitionDelay: `${index * 0.1}s` }}
                aria-label={`Lihat detail kegiatan ${event.name}`}
              >
                <div className="overflow-hidden">
                  <img
                    src={event.image}
                    className="w-full h-64 lg:h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="" 
                  />
                </div>

                <div className="p-6">
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
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal dengan Animasi Simple Fade In */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default w-full h-full"
            onClick={() => setSelectedEvent(null)}
            aria-label="Tutup modal"
          />

          <dialog
            className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row focus:outline-none animate-in zoom-in-95 duration-300"
            aria-modal="true"
            aria-labelledby="modal-title"
          >

            <button 
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-pink-500 hover:bg-pink-500 hover:text-white transition-all shadow-md"
              aria-label="Tutup"
            >
              <span className="text-2xl font-bold" aria-hidden="true">&times;</span>
            </button>

            <div className="w-full md:w-1/2 h-72 md:h-auto overflow-hidden">
              <img 
                src={selectedEvent.image} 
                alt={`Foto kegiatan ${selectedEvent.name}`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center text-left bg-white">
              <div className="flex items-center gap-2 text-pink-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-lg font-bold">
                  {selectedEvent.event_date}
                </span>
              </div>

              <h2 id="modal-title" className="text-3xl font-black text-gray-900 mb-4 leading-tight">
                {selectedEvent.name}
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">
                {selectedEvent.description || "Bergabunglah dalam keseruan belajar coding bersama kami di Koding Next Samarinda! Kegiatan ini dirancang untuk mengasah kreativitas dan logika anak melalui teknologi terbaru."}
              </p>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
}