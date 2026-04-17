import heroImg from "../assets/images/jk.jpg";

export default function JuniorKoders() {
  
  return (
    <div className="min-h-screen">

      <section className="relative w-full h-120 flex items-center">

        <img
          src={heroImg}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Little Koders"
        />

        <div className="relative max-w-6xl mx-auto px-16 w-full flex justify-end">

          <div className="relative p-8 rounded-xl max-w-md
            bg-white/80 backdrop-blur-xs
            border border-white/10">

            <h2 className="text-5xl font-bold text-primary-blue mb-4">
              Junior Koders
            </h2>

            <p className="text-gray-700 text-sm leading-relaxed mb-6">
            Program ini menawarkan kursus pemula dalam pemrograman blok, seperti Game 2D dan Pengembangan Aplikasi Seluler, dan kursus lanjutan dalam pemrograman berbasis teks, seperti Python, JavaScript, dan Smart Home IoT. Kami mengajarkan keterampilan digital yang paling dicari berdasarkan tren terbaru.
            </p>

            <div className="flex gap-3">
              <button className="bg-primary-blue text-white px-4 py-2 rounded-lg text-sm hover:bg-hover-blue">
                Lihat Modul
              </button>

              <button className="bg-white border border-primary-blue text-primary-blue px-4 py-2 rounded-lg text-sm hover:bg-hover-blue/20">
                Lihat Proyek
              </button>
            </div>

          </div>

        </div>

      </section>

      <section className="py-20">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-center text-3xl font-bold mb-14">
            Modul <span className="text-primary-blue">Kami</span>
          </h2>

        </div>

      </section>

    </div>
  );
}