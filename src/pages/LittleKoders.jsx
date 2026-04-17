import heroImg from "../assets/images/lk.jpg";

export default function LittleKoders() {
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

            <h2 className="text-5xl font-bold text-primary-pink mb-4">
              Little Koders
            </h2>

            <p className="text-gray-700 text-sm leading-relaxed mb-6">
            RoboNext adalah program kursus robotika dari Koding Next yang dirancang untuk memperkenalkan teknologi melalui pengalaman langsung. Anak-anak tidak hanya belajar coding dan merakit robot, tetapi juga memahami cara teknologi bekerja untuk menyelesaikan masalah dunia nyata.
            </p>

            <div className="flex gap-3">
              <button className="bg-primary-pink text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-hover-pink">
                Lihat Modul
              </button>

              <button className="bg-white border border-primary-pink text-primary-pink px-4 py-2 rounded-lg text-sm font-medium hover:bg-hover-pink/20">
                Lihat Proyek
              </button>
            </div>

          </div>

        </div>

      </section>

      {/* MODUL */}
      <section className="py-20">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-center text-3xl font-bold mb-14">
            Modul <span className="text-pink-500">Kami</span>
          </h2>

        </div>

      </section>

    </div>
  );
}