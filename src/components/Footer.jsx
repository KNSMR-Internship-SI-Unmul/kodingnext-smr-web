export default function Footer() {
  return (
    <footer className="bg-white text-black border-t border-gray-300">
      <div className="container mx-auto px-24 py-8">

        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-md">
            <img
              src="src/assets/images/logo-kn.png"
              alt="Koding Next"
              className="h-10 mb-4"
            />
            <p className="text-sm leading-relaxed">
              Jl. Imam Bonjol No.02, Pelabuhan, Kec. Samarinda Kota,<br />
              Kota Samarinda, Kalimantan Timur
            </p>
          </div>

          <div className="text-sm space-y-3">
            
            <div>
              <p className="font-semibold">Jam Operasional:</p>
              <p>Senin – Minggu | 10:00 – 18:00 WITA</p>
            </div>

            <a
              href="https://instagram.com/kodingnext_samarinda"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-primary-pink"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5C18.32 4 20 5.68 20 7.75v8.5C20 18.32 18.32 20 16.25 20h-8.5C5.68 20 4 18.32 4 16.25v-8.5C4 5.68 5.68 4 7.75 4zm9.5 1.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
              </svg>
              <span>kodingnext_samarinda</span>
            </a>

            <a
              href="https://wa.me/6281115525959"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-primary-pink"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2a10 10 0 00-8.94 14.47L2 22l5.7-1.49A10 10 0 1012 2zm0 18a7.96 7.96 0 01-4.06-1.11l-.29-.17-3.38.88.9-3.29-.19-.34A8 8 0 1112 20zm4.25-5.72c-.23-.11-1.37-.67-1.58-.75-.21-.08-.36-.11-.51.11s-.59.75-.72.9c-.13.15-.26.17-.49.06a6.48 6.48 0 01-1.91-1.18 7.24 7.24 0 01-1.34-1.66c-.14-.23-.02-.35.1-.46.11-.11.23-.26.34-.39.11-.13.15-.23.23-.38.08-.15.04-.28-.02-.39-.06-.11-.51-1.23-.7-1.68-.18-.44-.36-.38-.51-.39h-.44c-.15 0-.39.06-.6.28s-.78.76-.78 1.85.8 2.15.91 2.3c.11.15 1.57 2.4 3.8 3.36.53.23.95.36 1.27.46.53.17 1.02.15 1.4.09.43-.06 1.37-.56 1.56-1.1.19-.54.19-1 .13-1.1-.06-.1-.21-.17-.44-.28z" />
              </svg>
              <span>+62 8111-5525-959</span>
            </a>

          </div>
        </div>

        <div className="text-center text-xs text-gray-500 mt-8">
          © {new Date().getFullYear()} - KODING NEXT SAMARINDA. ALL RIGHTS RESERVED
        </div>

      </div>
    </footer>
  );
}