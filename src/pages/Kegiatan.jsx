import { useState, useEffect } from "react";
import { events } from "../assets/data/events";

export default function Kegiatan() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    document.title = "Kegiatan | Koding Next Samarinda";
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
    </div>
  );
}