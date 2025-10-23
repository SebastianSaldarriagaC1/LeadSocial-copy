import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

// ---------- Marca ----------
function BrandLS360() {
  return (
    <h1 className="flex items-baseline gap-1">
      <span className="text-2xl md:text-3xl font-semibold tracking-tight">
        Lead
      </span>
      <span className="text-2xl md:text-3xl italic font-brandSerif font-medium text-white/90">
        Social
      </span>
      <span className="text-2xl md:text-3xl italic font-brandSerif font-medium text-white/90">
        360
      </span>
    </h1>
  );
}

// ---------- Mini gráficas mock ----------
function MiniBars() {
  const bars = [18, 30, 24, 42, 20, 36, 28];
  return (
    <div className="flex items-end gap-2 h-16">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-3 rounded-md bg-blue-400/70"
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  );
}

function MiniDonut() {
  return (
    <div className="relative w-14 h-14">
      <div className="absolute inset-0 rounded-full border-4 border-blue-400/30" />
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-400 rotate-45" />
    </div>
  );
}

function MiniLine() {
  // simple línea SVG decorativa
  return (
    <svg viewBox="0 0 160 60" className="w-full h-24">
      <defs>
        <linearGradient id="glow" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopOpacity="0.4" stopColor="rgb(56,189,248)" />
          <stop offset="100%" stopOpacity="0" stopColor="rgb(56,189,248)" />
        </linearGradient>
      </defs>
      <path
        d="M0,45 L12,38 L24,50 L36,28 L48,40 L60,32 L72,36 L84,22 L96,44 L108,30 L120,34 L132,20 L144,38 L160,28"
        fill="none"
        stroke="rgb(56,189,248)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M0,60 L0,45 L160,28 L160,60 Z" fill="url(#glow)" />
    </svg>
  );
}

// ---------- Lista archivado ----------
const ARCHIVE = [
  {
    id: 1,
    date: "14/marzo/2025",
    items: [
      {
        id: "a1",
        title: "🐣 Nuevo Departamento en Preventa – ¡Ubicación…",
        tag: "Orgánico",
        image:
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "a2",
        title: "🏠 Nuevo Departamento en Preventa – ¡Ubicación…",
        tag: "Orgánico",
        image:
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "a3",
        title: "✨ Nuevo Departamento en Preventa – ¡Ubicación…",
        tag: "Orgánico",
        image:
          "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
];

export default function ReturningUserPage() {
  const navigate = useNavigate();
  const { logout } = useAuth?.() || {}; // si tu AuthContext expone logout()
  const [menuOpen, setMenuOpen] = useState(false);

  const [hasInstagram, setHasInstagram] = useState(null); // null = aún cargando

  useEffect(() => {
    // Llamada a la API apenas se monta el componente
    const fetchInstagramStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/social/instagram/check`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          const data = await res.json();
          setHasInstagram(data.connected);
        } else {
          console.error("Error inesperado:", res.status);
          setHasInstagram(false);
        }
      } catch (error) {
        console.error("Error al verificar cuenta de Instagram:", error);
        setHasInstagram(false);
      }
    };

    fetchInstagramStatus();
  }, []);

  const handleLogout = () => {
    try {
      // preferimos logout() si existe
      if (logout) logout();
      // fallback por si acaso
      localStorage.removeItem("token");
      localStorage.removeItem("ig_access");
      localStorage.removeItem("ig_refresh");
      document.cookie = "ig_access=; Max-Age=0; path=/";
      document.cookie = "ig_refresh=; Max-Age=0; path=/";
    } catch {}
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0B1220]/90 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <BrandLS360 />

          {/* Botón avatar LS -> abre menú */}
          <button
            onClick={() => setMenuOpen(true)}
            className="w-9 h-9 rounded-full bg-brand-primary text-white font-bold text-sm grid place-items-center shadow-lg"
            aria-label="Abrir menú de usuario"
            title="Abrir menú"
          >
            LS
          </button>
        </div>
      </header>

      <section className="mt-8">
        {/* 🔹 Solo mostramos el aviso si la API respondió que NO hay cuenta */}
        {hasInstagram === false && (
          <div className="mx-auto max-w-5xl px-4">
            <div className="rounded-2xl bg-rose-500/10 border border-rose-400/30 p-4 flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="text-sm">
                  No tienes ninguna cuenta de Instagram conectada.
                </p>
                <button
                  onClick={() => navigate("/settings")}
                  className="mt-1 text-sm text-rose-300 underline hover:text-rose-200"
                >
                  Conectar cuenta ahora
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 🔹 Podrías opcionalmente mostrar un loader mientras la API responde */}
        {hasInstagram === null && (
          <div className="mx-auto max-w-5xl px-4 text-white/70 text-sm">
            Verificando conexión con Instagram...
          </div>
        )}
      </section>

      {/* Contenido */}
      <main className="mx-auto max-w-5xl px-4 pb-28">
        {/* Interacciones */}
        <section className="mt-6">
          <h2 className="text-sm uppercase tracking-wider text-white/60">
            Interacciones
          </h2>

          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Visitas */}
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/70">Visitas a tu perfil</p>
                <span className="text-xs text-white/50">Apr 1 – May 1</span>
              </div>
              <div className="mt-3">
                <MiniBars />
              </div>
              <div className="mt-2 text-2xl font-semibold">163.4k</div>
            </div>

            {/* Registros */}
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
              <p className="text-sm text-white/70">Registros de usuarios</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-2xl font-semibold">345.6k</div>
                <MiniDonut />
              </div>
              <div className="mt-2 text-xs text-white/60">
                ● Directos &nbsp;&nbsp; ○ Referenciados
              </div>
            </div>

            {/* Nuevas interacciones */}
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/70">Nuevas interacciones</p>
                <span className="text-sm font-semibold">1238.9</span>
              </div>
              <div className="mt-2">
                <MiniLine />
              </div>
            </div>
          </div>
        </section>

        {/* Contenido archivado */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Contenido archivado</h2>
            <button
              onClick={() => navigate("/repository")}
              className="text-sm text-white/60 hover:text-white/80"
            >
              Ver todo
            </button>
          </div>

          {ARCHIVE.map((group) => (
            <div
              key={group.id}
              className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-3"
            >
              <div className="text-center text-xs text-white/60 mb-2">
                {group.date}
              </div>

              <div className="space-y-3">
                {group.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-xl bg-white/5 ring-1 ring-white/10 p-2 hover:bg-white/10 transition"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-16 object-cover rounded-lg"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{item.title}</p>
                      <span className="inline-flex items-center mt-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30">
                        {item.tag}
                      </span>
                    </div>
                    <span className="text-white/40 pr-1">›</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* FAB (único en el “menú” inferior) */}
      {/* FAB (único en el “menú” inferior) */}
      <button
        onClick={() => {
          if (hasInstagram) {
            navigate("/instruct");
          } else {
            alert(
              "Debes conectar una cuenta de Instagram antes de crear publicaciones."
            );
          }
        }}
        disabled={hasInstagram === false || hasInstagram === null}
        className={`fixed right-5 bottom-6 w-14 h-14 rounded-full 
              flex items-center justify-center text-3xl leading-none shadow-xl
              transition 
              ${
                hasInstagram
                  ? "bg-brand-primary text-white hover:opacity-95 active:opacity-90"
                  : "bg-gray-600/40 text-white/50 cursor-not-allowed"
              }`}
        aria-label="Crear publicación"
        title={
          hasInstagram
            ? "Crear publicación"
            : "Conecta tu cuenta de Instagram para habilitar esta opción"
        }
      >
        +
      </button>

      {/* Sheet / Menú de usuario */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed inset-x-0 bottom-0 z-50 bg-[#0B1220] border-t border-white/10 rounded-t-2xl p-4">
            <div className="mx-auto max-w-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-brand-primary grid place-items-center font-bold">
                    LS
                  </div>
                  <BrandLS360 />
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-white/60 hover:text-white"
                  aria-label="Cerrar"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                <MenuItem
                  label="Perfil"
                  onClick={() => alert("Próximamente")}
                  icon="👤"
                />
                <MenuItem
                  label="Notificaciones"
                  onClick={() => alert("Próximamente")}
                  icon="🔔"
                />
                <MenuItem
                  label="Configuración"
                  onClick={() => alert("Próximamente")}
                  icon="⚙️"
                />

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 text-rose-300 font-semibold flex items-center gap-3"
                >
                  <span className="text-lg">⎋</span>
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Botón de la lista del menú
function MenuItem({ label, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-3 rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 flex items-center justify-between"
    >
      <span className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>
        {label}
      </span>
      <span className="text-xs text-white/50">Próximamente</span>
    </button>
  );
}
