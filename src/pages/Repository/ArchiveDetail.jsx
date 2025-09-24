// src/pages/Repository/ArchiveDetail.jsx
import { useNavigate, useParams } from 'react-router-dom';
import { findArchivedById } from './data';

const IconPill = ({ children }) => (
  <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/12">
    {children}
  </span>
);

function ActionRow({ label, icon }) {
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      className="w-full h-14 rounded-2xl bg-white/10 ring-1 ring-white/10 text-white
                 font-semibold flex items-center justify-between px-5
                 opacity-60 cursor-not-allowed select-none"
    >
      <span>{label}</span>
      <span className="flex items-center gap-3">
        <span className="text-xs text-white/70">Próximamente</span>
        <IconPill>{icon}</IconPill>
      </span>
    </button>
  );
}

export default function ArchiveDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = findArchivedById(id);

  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0B1220]/90 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-lg bg-white/10 ring-1 ring-white/15 grid place-items-center"
            aria-label="Volver"
          >
            ←
          </button>
          <h1 className="text-lg font-semibold">Detalle</h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-24">
        {item ? (
          <div className="grid gap-5 md:grid-cols-[380px,1fr] lg:grid-cols-[420px,1fr] items-start mt-4">
            {/* Vista estilo Instagram */}
            <div className="rounded-[28px] bg-[#1f2a3b] p-3 ring-1 ring-white/10 shadow-2xl w-[320px] sm:w-[360px]">
              <div className="rounded-[20px] bg-[#0e1624] ring-1 ring-white/10 overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-400 ring-2 ring-white/10" />
                    <span className="text-sm font-semibold">Leadestate</span>
                  </div>
                  <span className="text-white/50">⋮</span>
                </div>
                <div className="bg-black">
                  <img src={item.image} alt={item.title} className="w-full aspect-square object-cover" />
                </div>
                <div className="px-3 pb-3">
                  <p className="text-sm leading-relaxed">
                    <span className="font-semibold">Leadestate </span>
                    <span className="text-white/90 whitespace-pre-wrap">{item.caption}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Acciones: todas deshabilitadas con “Próximamente” */}
            <div className="w-full max-w-sm md:ml-2 space-y-4">
              <ActionRow label="Publicar"   icon="＋" />
              <ActionRow label="Almacenar"  icon="🗄️" />
              <ActionRow label="Editar"     icon="✎" />
              <ActionRow label="Descargar"  icon="⬇" />
            </div>
          </div>
        ) : (
          <div className="p-6 text-white/70">El elemento no existe.</div>
        )}
      </main>
    </div>
  );
}
