import LoadingScreen from "../components/LoadingScreen";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { service } from "../services/service";

export default function Kursus() {
  const [courseTypes, setCourseTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await service.getCourses();
        setCourseTypes(response?.data || []);
      } catch (error) {
        console.error("Gagal memuat data kursus:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    document.title = "Kursus | Koding Next Samarinda";

    if (!loading) {
      window.scrollTo(0, 0);
      const observerOptions = { threshold: 0.1 };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      }, observerOptions);

      const timeoutId = setTimeout(() => {
        const elements = document.querySelectorAll('[class*="reveal"]');
        elements.forEach((el) => observer.observe(el));
      }, 100);

      return () => {
        observer.disconnect();
        clearTimeout(timeoutId);
      };
    }
  }, [loading]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen">
      <section className="py-12 bg-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="text-center reveal">
            <h1 className="text-3xl lg:text-4xl font-bold text-black">
              Kursus <span className="text-primary-pink">Kami</span>
            </h1>
            <p className="mt-6 text-black max-w-4xl mx-auto text-xs lg:text-base leading-relaxed">
              Kami menawarkan kurikulum komprehensif yang dikembangkan oleh tim
              internasional, guru-guru yang berpengalaman, dan fokus pada
              pembelajaran individual dan berbasis proyek. Di Koding Next,
              anak-anak dapat mengeksplorasi coding dan teknologi dengan cara
              yang menyenangkan dan menarik.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:px-24">
            {courseTypes.length > 0 ? (
              courseTypes.map((course, index) => (
                <Link
                  key={course.id}
                  to={`/kursus/${course.name.toLowerCase().replaceAll(/\s+/g, "-")}`}
                  className="group block reveal"
                  style={{ transitionDelay: `${index * 0.15}s` }}
                >
                  <div className="mx-auto max-w-sm overflow-hidden rounded-2xl shadow-md bg-white border border-gray-100 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2">
                    <div className="aspect-video lg:aspect-square overflow-hidden">
                      <img
                        src={course.image_url}
                        className="w-full h-full object-cover" 
                        alt={course.name}
                      />
                    </div>

                    <div className="p-5">
                      <p className="text-base font-bold text-gray-800 leading-tight">
                        {course.name}
                      </p>
                      <div className="mt-1 flex items-center text-sm text-gray-600 transition-colors duration-300 group-hover:text-hover-pink font-medium">
                        Detail Program <span className="ml-1">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-400">Belum ada kursus yang tersedia.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
