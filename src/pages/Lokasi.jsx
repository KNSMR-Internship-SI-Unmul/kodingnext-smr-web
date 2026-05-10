import lokasiImg from "../assets/images/lokasi-kn.jpeg";
import LoadingScreen from "../components/LoadingScreen";
import { React, useState, useEffect } from "react";

export default function Lokasi() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.title = "Lokasi | Koding Next Samarinda";
    window.scrollTo(0, 0);

    if (isLoading) return;

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
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="py-16 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="lg:pl-20 reveal-left">
              <h2 className="text-4xl font-extrabold mb-4 text-gray-900 leading-tight">
                Lokasi <span className="text-primary-pink">Kami</span>
              </h2>

              <div className="space-y-6">
                <div className="flex gap-3 items-start">
                  <div className="rounded-lg text-primary-pink">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-800 text-lg leading-relaxed">
                    Jl. Imam Bonjol No.02, Pelabuhan, Kec. Samarinda Kota, Kota
                    Samarinda, Kalimantan Timur
                  </p>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="rounded-lg text-primary-pink">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
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
                  <div>
                    <p className="text-gray-800 text-lg">
                      <span className="font-bold text-primary-pink">
                        Jam Operasional:
                      </span>{" "}
                      <br />
                      Senin – Minggu | 10:00 – 18:00 WITA
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <a
                  href="https://maps.google.com/?q=Koding+Next+Samarinda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-primary-pink text-white font-medium px-6 py-3 rounded-lg shadow-sm hover:bg-hover-pink hover:-translate-y-1 transition-all duration-300"
                >
                  Lihat di Maps
                </a>
              </div>
            </div>

            <div className="lg:pr-10 reveal-right">
              <div className="relative group">
                <img
                  src={lokasiImg}
                  className="relative rounded-xl shadow-2xl w-full h-80 object-cover transition duration-700 group-hover:scale-[1.02]"
                  alt="Gedung Koding Next Samarinda"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 bg-white">
        <div className="container mx-auto px-6 lg:px-24 reveal">
          <div className="w-full h-112.5 lg:mx-auto lg:max-w-5xl rounded-3xl shadow-2xl overflow-hidden border-8 border-white bg-gray-100">
            <iframe
              title="Peta Lokasi Koding Next Samarinda"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.658661603588!2d117.1504!3d-0.5019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df67f0000000000%3A0x0!2zMDDCsDMwJzA2LjkiUyAxMTfCsDA5JzAxLjQiRQ!5e0!3m2!1sid!2sid!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
