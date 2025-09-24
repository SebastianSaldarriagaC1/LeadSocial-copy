// src/pages/Onboarding/NewUserPage.jsx
import { useNavigate } from "react-router-dom";

/* Iconos pequeños */
const BackIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);

/* Barra de progreso */
function ProgressBar({ progress }) {
  return (
    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
      <div className="h-full bg-brand-primary transition-all" style={{ width: `${progress}%` }} />
    </div>
  );
}

/* Tarjetica mock de analíticas */
function AnalyticsCard() {
  return (
    <div className="mt-6 rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
      <div className="flex items-center justify-between">
        <p className="text-white/80 text-sm">Visitas a tu perfil</p>
        <p className="text-white font-bold text-lg">163.4k</p>
      </div>

      {/* Barras */}
      <div className="mt-4 flex items-end gap-1 h-28">
        {Array.from({ length: 14 }).map((_, i) => {
          const h = 20 + ((i * 13) % 80);
          return (
            <div key={i} className="flex-1 rounded bg-brand-primary/70" style={{ height: `${h}%` }} />
          );
        })}
      </div>

      <div className="mt-3 text-xs text-white/60">Apr 1 – May 1</div>
    </div>
  );
}

export default function NewUserPage() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  const next = () => navigate("/onboarding/create", { replace: true });
  const skip = () => navigate("/onboarding/returning", { replace: true });

  return (
    <div className="min-h-screen bg-[#0B1220] text-white px-4 py-4 flex flex-col">
      {/* Header con back, progreso y saltar */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={goBack}
          className="w-9 h-9 rounded-lg bg-white/10 ring-1 ring-white/15 flex items-center justify-center"
          aria-label="Volver"
        >
          <BackIcon />
        </button>

        <div className="flex-1 mx-3">
          <ProgressBar progress={50} />
        </div>

        <button onClick={skip} className="text-white/70 text-sm hover:text-white">
          Saltar
        </button>
      </div>

      {/* Contenido */}
      <div className="flex-1 max-w-md w-full mx-auto mt-8">
        <h1 className="text-3xl font-extrabold leading-tight text-center">
          Analiza tu impacto en <br /> segundos
        </h1>
        <p className="mt-3 text-center text-white/70">
          Descubre cuántas personas visitan tu perfil y mide tu alcance fácilmente.
          Usa estos datos para mejorar tu estrategia y atraer más audiencia.
        </p>

        <AnalyticsCard />
      </div>

      {/* CTA */}
      <div className="max-w-md w-full mx-auto mt-6 mb-4">
        <button
          onClick={next}
          className="w-full h-14 rounded-2xl bg-brand-primary text-white font-semibold
                     shadow-[0_10px_30px_rgba(30,100,250,0.35)] flex items-center justify-center gap-2"
        >
          <span>Continuar</span>
          <PlusIcon />
        </button>
      </div>
    </div>
  );
}
