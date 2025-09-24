// src/pages/Creator/SchedulePage.jsx
import { useLocation, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'

function MiniCard({ image, caption }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/5 ring-1 ring-white/10 p-2">
      <img
        src={image}
        alt="preview"
        className="w-16 h-16 rounded-lg object-cover bg-white/10"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm truncate">{caption || '—'}</p>
      </div>
    </div>
  )
}

const HOURS = ['08:00','09:00','10:00','11:00','13:00','15:00','16:00','18:00','19:00']

export default function SchedulePage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const image = state?.image || ''
  const caption = state?.caption || ''

  // calendario básico (mes navegable)
  const today = new Date()
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() }) // m: 0..11
  const [selected, setSelected] = useState(null) // string ISO date
  const [hour, setHour] = useState('')

  const monthLabel = useMemo(
    () =>
      new Date(view.y, view.m, 1).toLocaleString('es-ES', {
        month: 'long',
        year: 'numeric',
      }),
    [view]
  )

  const days = useMemo(() => {
    const first = new Date(view.y, view.m, 1)
    const startWeekday = (first.getDay() + 6) % 7 // L=0..D=6
    const len = new Date(view.y, view.m + 1, 0).getDate()
    const arr = []
    for (let i = 0; i < startWeekday; i++) arr.push(null)
    for (let d = 1; d <= len; d++) arr.push(new Date(view.y, view.m, d))
    return arr
  }, [view])

  const canSchedule = Boolean(selected && hour)

  const schedule = () => {
    // aquí luego pegas tu POST al backend de agendamiento
    navigate('/publish/success', { state: { image, caption } })
  }

  return (
    <div className="min-h-screen bg-[#0B1220] text-white px-4 py-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-lg bg-white/10 ring-1 ring-white/15 flex items-center justify-center"
            aria-label="Volver"
          >
            ←
          </button>
          <h1 className="text-lg font-semibold">Fecha de publicación</h1>
        </div>

        {/* Preview mini */}
        <MiniCard image={image} caption={caption} />

        {/* Contenedor calendario */}
        <div className="mt-4 rounded-2xl bg-white/5 ring-1 ring-white/10 p-3">
          {/* Mes */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() =>
                setView(v => {
                  const d = new Date(v.y, v.m - 1, 1)
                  return { y: d.getFullYear(), m: d.getMonth() }
                })
              }
              className="px-2 py-1 rounded-lg bg-white/10"
            >
              ‹
            </button>
            <div className="capitalize font-semibold">{monthLabel}</div>
            <button
              onClick={() =>
                setView(v => {
                  const d = new Date(v.y, v.m + 1, 1)
                  return { y: d.getFullYear(), m: d.getMonth() }
                })
              }
              className="px-2 py-1 rounded-lg bg-white/10"
            >
              ›
            </button>
          </div>

          {/* Grid días */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-white/60 mb-1">
            {['L','M','X','J','V','S','D'].map(d => (
              <div key={d} className="py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((d, i) => {
              if (!d) return <div key={i} />
              const iso = d.toISOString().slice(0,10)
              const sel = selected === iso
              return (
                <button
                  key={iso}
                  onClick={() => setSelected(iso)}
                  className={[
                    'py-2 rounded-lg',
                    sel ? 'bg-brand-primary text-white' : 'bg-white/5 hover:bg-white/10'
                  ].join(' ')}
                >
                  {d.getDate()}
                </button>
              )
            })}
          </div>

          {/* Horas */}
          <div className="mt-4">
            <p className="text-sm font-semibold mb-2">Selecciona hora</p>
            <div className="grid grid-cols-3 gap-2">
              {HOURS.map(h => (
                <button
                  key={h}
                  onClick={() => setHour(h)}
                  className={[
                    'py-2 rounded-xl text-sm',
                    hour === h ? 'bg-brand-primary' : 'bg-white/5 hover:bg-white/10'
                  ].join(' ')}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CTA agendar */}
        <div className="mt-4">
          <button
            onClick={schedule}
            disabled={!canSchedule}
            className={[
              'w-full h-12 rounded-xl font-semibold',
              canSchedule ? 'bg-brand-primary text-white hover:opacity-95' : 'bg-brand-primary/60 cursor-not-allowed'
            ].join(' ')}
          >
            Agendar publicación
          </button>
        </div>
      </div>
    </div>
  )
}
