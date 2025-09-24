// src/pages/Onboarding/CreateIntroPage.jsx
import { useNavigate } from 'react-router-dom';

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

export default function CreateIntroPage() {
  const navigate = useNavigate();

  // Permite pasar ?img=URL para usar cualquier imagen (por ejemplo una de Google)
  const params = new URLSearchParams(window.location.search);
  const imgParam = params.get('img');

  // Imagen por defecto (puedes cambiarla)
  const DEFAULT_IMG =
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1080&auto=format&fit=crop';

  const imgSrc = imgParam || DEFAULT_IMG;

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-lg bg-white/10 ring-1 ring-white/15 flex items-center justify-center"
          aria-label="Volver"
        >
          ←
        </button>

        <div className="h-1 w-44 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-1/2 bg-brand-primary" />
        </div>

        <button
          onClick={() => navigate('/onboarding/returning-user', { replace: true })}
          className="text-sm text-white/70 hover:text-white"
        >
          Saltar
        </button>
      </div>

      {/* Contenido */}
      <div className="w-full max-w-3xl mx-auto px-6 pt-8 pb-28 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Crea publicaciones en <br /> segundos
        </h1>
        <p className="mt-4 text-white/70 max-w-2xl mx-auto">
          Genera contenido atractivo para tus redes con solo unos clics. Personaliza tu mensaje, elige el
          tono ideal y deja que la IA haga el resto.
        </p>

        {/* Imagen grande (fuera de marco) */}
        <img
          src={imgSrc}
          alt="Ejemplo de publicación"
          className="mt-8 w-[340px] md:w-[420px] aspect-square object-cover rounded-[22px]
                     ring-1 ring-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.45)] mx-auto"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // fallback si la URL bloquea hotlink o no carga
            e.currentTarget.src = 'https://picsum.photos/600';
          }}
        />

        {/* CTA */}
        <button
          onClick={() => navigate('/onboarding/returning')}
          className="mt-8 inline-flex items-center justify-center gap-2
                     h-14 px-5 rounded-2xl font-semibold bg-brand-primary text-white
                     shadow-[0_10px_30px_rgba(30,100,250,0.35)]"
        >
          <span>Crear publicación</span>
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/15">
            <PlusIcon />
          </span>
        </button>
      </div>
    </div>
  );
}
