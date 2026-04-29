import tentangHero from "../assets/images/tentang.jpeg";
import { team } from "../assets/data/team";
import { useEffect } from "react";

export default function Tentang() {
  const owner = team[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Tentang Kami | Koding Next Samarinda";

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
      <section className="relative w-full h-100 lg:h-100 flex items-center overflow-hidden">
        <img
          src={tentangHero}
          alt="Tentang Kami"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-pink-200/80 to-blue-200/80"></div>

        <div className="relative container mx-auto px-6 lg:px-24">
          <div className="lg:pl-20 reveal-left">
            <h1 className="text-white text-shadow-lg text-6xl font-bold leading-tight">
              Tentang <br />
              Kami
            </h1>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-45">
          <div className="bg-secondary-blue/40 rounded-xl shadow-lg border-b-8 border-primary-blue p-10 md:p-12 lg:p-16 text-center max-w-5xl mx-auto reveal">
            <h2 className="text-3xl font-bold text-gray-900 leading-tight">
              Inspiring the Next Generation
            </h2>
            <h3 className="text-3xl font-bold text-primary-pink mt-2">
              Through Coding
            </h3>
            <p className="text-gray-700 mt-8 text-lg leading-relaxed max-w-3xl mx-auto">
              Kami berkomitmen untuk memberikan pendidikan teknologi terbaik
              bagi anak-anak di Samarinda, mempersiapkan mereka menjadi pencipta
              solusi masa depan melalui kurikulum yang inovatif dan
              menyenangkan.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center lg:justify-end lg:pr-10 reveal-left">
            <div className="relative group max-w-xs md:max-w-sm">
              <img
                src={owner.image}
                className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
                alt={owner.name}
              />
            </div>
          </div>

          <div className="lg:pr-20">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              {owner.name}
            </h2>
            <p className="text-primary-pink font-bold mb-6">{owner.role}</p>

            <div className="space-y-4 text-gray-600 text-medium leading-relaxed">
              <p>
                Koding Next Samarinda didirikan dengan semangat untuk membawa
                standar pendidikan coding internasional ke Kalimantan Timur.
              </p>
              <p>
                Kami percaya bahwa setiap anak memiliki potensi untuk menjadi
                inovator digital berikutnya jika diberikan alat dan bimbingan
                yang tepat.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Tim <span className="text-primary-pink">Kami</span>
            </h2>
          </div>

          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-32">
            {team.slice(1).map((member) => (
              <div
                key={member.id}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="overflow-hidden rounded-lg aspect-3/3">
                  <img
                    src={member.image}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={member.name}
                  />
                </div>

                <div className="py-3 text-center">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-hover-pink transition-colors leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-primary-pink text-sm mt-1 font-semibold uppercase tracking-wider">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
