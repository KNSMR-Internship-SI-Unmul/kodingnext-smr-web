import heroImg from "../assets/images/rb.jpg"; // ganti nanti kalau ada gambar robot

export default function RoboNext() {
  return (
    <div className="min-h-screen">

      <section className="relative w-full h-120 flex items-center">

        <img
          src={heroImg}
          className="absolute inset-0 w-full h-full object-cover"
          alt="RoboNext"
        />

        <div className="relative max-w-6xl mx-auto px-16 w-full flex justify-end">

          <div className="relative p-8 rounded-xl max-w-md
            bg-white/80 backdrop-blur-xs
            border border-white/10">

            <h2 className="text-5xl font-bold text-primary-purple mb-4">
              RoboNext
            </h2>

            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              RoboNext adalah program pembelajaran robotika yang dirancang untuk
              melatih kreativitas, logika, dan problem solving siswa melalui
              pengalaman langsung merakit dan memprogram robot.
            </p>

            <div className="flex gap-3">
              <button className="bg-primary-purple text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-hover-purple">
                Lihat Modul
              </button>

              <button className="bg-white border border-primary-purple text-primary-purple px-4 py-2 rounded-lg text-sm font-medium hover:bg-hover-purple/20">
                Lihat Proyek
              </button>
            </div>

          </div>

        </div>

      </section>

      <section className="bg-gray-100 py-20">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-center text-3xl font-bold mb-14">
            Modul <span className="text-pink-500">Kami</span>
          </h2>

        </div>

      </section>

    </div>
  );
}