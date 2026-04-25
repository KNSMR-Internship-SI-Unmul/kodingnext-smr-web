import { useEffect } from "react"; 
import { Link } from "react-router-dom";
import { courseTypes } from "../assets/data/courseTypes";

export default function Kursus() {
  useEffect(() => {
    document.title = "Kursus | Koding Next Samarinda";
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
    <div className="min-h-screen">
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-24">
          
          <div className="text-center reveal">
            <h1 className="text-4xl lg:text-4xl font-extrabold text-gray-900">
              Kursus <span className="text-primary-pink">Kami</span>
            </h1>
            <p className="mt-6 text-gray-600 max-w-4xl mx-auto text-medium leading-relaxed">
              Kami menawarkan kurikulum komprehensif yang dikembangkan oleh tim internasional, guru-guru yang berpengalaman, dan fokus pada pembelajaran individual dan berbasis proyek. Anak-anak dapat mengeksplorasi coding dan teknologi dengan cara yang menyenangkan dan menarik.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:px-20"> 
            {/* Pastikan data 'courseType' tidak kosong */}
            {courseTypes && courseTypes.length > 0 ? (
              courseTypes.map((course, index) => (
                <Link 
                  to={course.link} 
                  key={course.id} 
                  className="group block reveal"
                  // Gunakan backticks (`) untuk template literal agar delay berfungsi
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
                      <div className="mt-2 flex items-center text-sm text-gray-600 group-hover:text-primary-pink transition-colors duration-300 font-semibold">
                        Detail Program <span className="ml-1">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center col-span-full">Data kursus tidak ditemukan.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}