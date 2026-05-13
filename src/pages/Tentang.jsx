import tentangHero from "../assets/images/tentang.jpeg";
import LoadingScreen from "../components/LoadingScreen";
import { React, useState, useEffect } from "react";
import { service } from "../services/service";

export default function Tentang() {
  const [teamList, setTeamList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTeamData = async () => {
      try {
        setIsLoading(true);
        const res = await service.getEmployees();
        const data = Array.isArray(res) ? res : res.data || [];
        setTeamList(data);
      } catch (error) {
        console.error("Gagal memuat data tim:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTeamData();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    document.title = "Tentang Kami | Koding Next Samarinda";
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

  const owner = teamList.find(
    (member) => member.role?.toLowerCase() === "owner",
  );

  const otherTeams = teamList.filter(
    (member) => member.role?.toLowerCase() !== "owner",
  );

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-white">
      <section className="relative w-full h-100 lg:h-100 flex items-center overflow-hidden">
        <img
          src={tentangHero}
          alt="Tentang Kami"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-secondary-pink/80 to-blue-200/80" />
        <div className="relative container mx-auto px-6 lg:px-24">
          <div className="lg:pl-20 reveal-left">
            <h1 className="text-white text-shadow-lg text-5xl lg:text-6xl font-bold leading-tight">
              Tentang <br /> Kami
            </h1>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-6 lg:px-52">
          <div className="bg-secondary-blue/30 rounded-xl shadow-lg border-b-4 border-primary-blue p-10 md:p-10 lg:p-12 text-center max-w-5xl mx-auto reveal">
            <h2 className="text-2xl lg:text-4xl font-medium text-black">
              Inspiring the Next Generation
            </h2>
            <h3 className="text-2xl lg:text-4xl font-medium text-primary-pink mt-2">
              Through Coding
            </h3>
            <p className="text-black mt-8 text-sm lg:text-base font-medium max-w-3xl mx-auto text-justify">
              Di Koding Next Samarinda, kami percaya bahwa coding adalah bahasa
              masa depan yang harus dikuasai oleh setiap anak. Sejak membuka
              pintu kami pada tahun 2023, kami berfokus pada pengembangan
              kemampuan berpikir kritis, logika, dan kreativitas siswa melalui
              metode belajar yang interaktif dan menyenangkan. Dengan kurikulum
              yang selalu diperbarui mengikuti perkembangan industri teknologi
              global, kami memastikan setiap siswa siap menghadapi tantangan di
              era digital dengan rasa percaya diri yang tinggi.
            </p>
          </div>
        </div>
      </section>

      {owner && (
        <section className="py-14">
          <div className="container mx-auto px-8 lg:px-30 grid md:grid-cols-2 items-center">
            <div className="flex justify-center lg:justify-end lg:pr-28 reveal-left">
              <div className="relative group">
                {owner.image_url ? (
                  <img
                    src={owner.image_url}
                    className=" w-68 h-68 md:w-80 md:h-80 object-cover rounded-lg shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
                    alt={owner.name || "Suryady Sujono"}
                  />
                ) : (
                  <div className="w-68 h-68 md:w-80 md:h-80 rounded-lg shadow-xl bg-gray-200 flex flex-col items-center justify-center gap-2">
                    <span className="text-gray-400 text-sm">
                      Foto tidak tersedia
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 rounded-lg bg-linear-to-t from-primary-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-semibold">
                    {owner.role || "Owner Koding Next Samarinda"}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-5 lg:pr-18 reveal-right">
              <h2 className="mt-10 lg:mt-0 text-2xl lg:text-4xl font-extrabold text-black mb-2">
                {owner.name || "Suryady Sujono"}
              </h2>
              <p className="text-primary-pink font-bold mb-6">
                {owner.role || "Owner Koding Next Samarinda"}
              </p>
              <p className="text-black text-sm text-justify leading-relaxed">
                "Saya percaya bahwa anak-anak di Samarinda memiliki potensi yang
                luar biasa untuk menaklukkan dunia digital. Sejak kami membuka
                Koding Next di Samarinda di tahun 2023, visi saya tetap satu,
                yaitu memberikan akses pendidikan teknologi terbaik agar
                anak-anak di Kalimantan Timur tidak hanya menjadi penonton, tapi
                menjadi penggerak inovasi. Kami di sini bukan sekadar mengajar
                coding, tapi membentuk karakter dan kesiapan mereka untuk masa
                depan yang lebih cerah."
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="py-14">
        <div className="container mx-auto px-12 lg:px-24">
          <div className="text-center mb-8 reveal">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Tim <span className="text-primary-pink">Kami</span>
            </h2>
          </div>

          {otherTeams.length > 0 ? (
            <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto lg:px-20">
              {otherTeams.map((member, index) => (
                <div
                  key={member.id}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 reveal"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="overflow-hidden rounded-lg aspect-square relative">
                    {member.image_url ? (
                      <img
                        src={member.image_url}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        alt={member.name}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">
                          Foto tidak tersedia
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-linear-to-t from-primary-pink/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-sm font-medium">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <div className="py-4 px-4 text-center min-h-18 flex flex-col items-center justify-center">
                    <h3 className="font-medium text-sm text-gray-900 group-hover:text-hover-pink transition-colors">
                      {member.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 italic">
              Data tim belum tersedia.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
