// src/pages/Repository/RepositoryOverview.jsx
import { useNavigate } from 'react-router-dom';
import { ARCHIVE_GROUPS } from './data';

function SectionCard({ children, title, actionLabel, onAction }) {
  return (
    <section className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm uppercase tracking-wider text-white/70">{title}</h2>
        {actionLabel && (
          <button onClick={onAction} className="text-sm text-white/60 hover:text-white/80">
            {actionLabel}
          </button>
        )}
      </div>
      <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-3">{children}</div>
    </section>
  );
}

export default function RepositoryOverview() {
  const navigate = useNavigate();
  const preview = ARCHIVE_GROUPS[0]?.items.slice(0, 3) ?? [];

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
          <h1 className="text-lg font-semibold">Repositorio</h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-24">
        {/* Archivado */}
        <SectionCard
          title="Contenido archivado"
          actionLabel="Ver todo"
          onAction={() => navigate('/repository/archived')}
        >
          <div className="text-center text-xs text-white/60 mb-2">
            {ARCHIVE_GROUPS[0]?.date ?? ''}
          </div>
          <div className="space-y-3">
            {preview.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(`/repository/archived/${item.id}`)}
                className="w-full flex items-center gap-3 rounded-xl bg-white/5 ring-1 ring-white/10 p-2 hover:bg-white/10 transition text-left"
              >
                <img src={item.image} alt={item.title} className="w-20 h-16 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{item.title}</p>
                  <span className="inline-flex items-center mt-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30">
                    {item.tag}
                  </span>
                </div>
                <span className="text-white/40 pr-1">›</span>
              </button>
            ))}
          </div>
        </SectionCard>

        {/* Agendado (próximamente) */}
        <SectionCard title="Contenido agendado">
          <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4 text-white/70">
            Próximamente
          </div>
        </SectionCard>

        {/* Publicado (próximamente) */}
        <SectionCard title="Contenido publicado">
          <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4 text-white/70">
            Próximamente
          </div>
        </SectionCard>
      </main>
    </div>
  );
}
