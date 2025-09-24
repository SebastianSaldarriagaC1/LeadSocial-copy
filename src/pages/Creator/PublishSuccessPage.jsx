// src/pages/Creator/PublishSuccessPage.jsx
import { useLocation, useNavigate } from 'react-router-dom'

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
)
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 11l9-7 9 7" />
    <path d="M5 10v10h14V10" />
  </svg>
)

export default function PublishSuccessPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const image = state?.image || ''

  return (
    <div className="min-h-screen bg-brand-primary/95 text-white px-5 py-8 grid place-items-center">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-extrabold text-center leading-tight">
          ¡Publicado con<br />éxito!
        </h1>

        {/* Preview con glow */}
        <div className="mt-6 rounded-3xl bg-white/10 p-3 ring-1 ring-white/30">
          <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/20 relative">
            <img
              src={image}
              alt="preview"
              className="w-full aspect-square object-cover rounded-xl"
            />
            {/* Badge LS */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl bg-white shadow-xl grid place-items-center">
              <div className="w-12 h-12 rounded-xl bg-brand-primary text-white font-bold grid place-items-center">
                LS
              </div>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="mt-10 space-y-3">
          <button
            onClick={() => navigate('/instruct', { replace: true })}
            className="w-full h-12 rounded-xl bg-white text-brand-primary font-semibold
                       flex items-center justify-center gap-2"
          >
            Crear nueva publicación <PlusIcon />
          </button>

          <button
            onClick={() => navigate('/onboarding/returning-user', { replace: true })}
            className="w-full h-12 rounded-xl bg-transparent ring-2 ring-white/70 text-white font-semibold
                       flex items-center justify-center gap-2"
          >
            Regresar al home <HomeIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
