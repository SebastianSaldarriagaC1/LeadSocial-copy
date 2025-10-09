// src/pages/Creator/ResultPage.jsx
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { instagramApi } from '../../lib/api'
import { getInstagramAccessToken } from '../../lib/ig'

/* ---------- ICONOS ---------- */
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
)
const RestartIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 12a9 9 0 109-9" />
    <path d="M3 4v8h8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const CancelIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
  </svg>
)
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M8 3v4M16 3v4M3 11h18" />
  </svg>
)
const DotsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <circle cx="5" cy="12" r="1.8" />
    <circle cx="12" cy="12" r="1.8" />
    <circle cx="19" cy="12" r="1.8" />
  </svg>
)
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20.8 5.6a5 5 0 00-7.1 0L12 7.3l-1.7-1.7a5 5 0 00-7.1 7.1l1.7 1.7L12 21l7.1-6.6 1.7-1.7a5 5 0 000-7.1z" />
  </svg>
)
const CommentIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M21 12a8 8 0 01-8 8H7l-4 3 1.5-5.5A8 8 0 113 12" strokeLinejoin="round" />
  </svg>
)
const SendIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 2L11 13" />
    <path d="M22 2l-7 20-4-9-9-4 20-7z" strokeLinejoin="round" />
  </svg>
)
const BookmarkIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M6 3h12a2 2 0 012 2v16l-8-4-8 4V5a2 2 0 012-2z" />
  </svg>
)

/* ---------- CARD IG ---------- */
function InstagramCard({ image, text, loading }) {
  return (
    <div className="rounded-[28px] bg-[#1f2a3b] p-3 ring-1 ring-white/10 shadow-2xl w-[320px] sm:w-[360px]">
      <div className="rounded-[20px] bg-[#0e1624] ring-1 ring-white/10 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-400 ring-2 ring-white/10" />
            <span className="text-sm font-semibold">Leadestate</span>
          </div>
          <DotsIcon />
        </div>

        <div className="relative bg-black">
          {image ? (
            <img src={image} alt="post" className="w-full aspect-square object-cover" />
          ) : (
            <div className="w-full aspect-square bg-gradient-to-br from-slate-700 to-slate-900" />
          )}
          {loading && (
            <div className="absolute inset-0 grid place-items-center bg-black/30">
              <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-4">
            <HeartIcon />
            <CommentIcon />
            <SendIcon />
          </div>
          <BookmarkIcon />
        </div>

        <div className="px-3 pb-3">
          <p className="text-sm leading-relaxed">
            <span className="font-semibold">Leadestate </span>
            <span className="text-white/90 whitespace-pre-wrap">{text || '—'}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

/* ---------- PÁGINA ---------- */
export default function ResultPage() {
  const navigate = useNavigate()
  const { state } = useLocation()

  // datos de navegación
  const initialText = state?.text || ''
  const initialImage = state?.image || null
  const payload = state?.payload || null

  // caption editable + imagen (y carga si falta)
  const [caption, setCaption] = useState(initialText)
  const [image, setImage] = useState(initialImage)
  const [imgLoading, setImgLoading] = useState(!initialImage)
  const [imgError, setImgError] = useState('')

  // publicación
  const [isPublishing, setIsPublishing] = useState(false)
  const [pubError, setPubError] = useState('')
  const [pubOk, setPubOk] = useState(false)

  // si se entra sin state, volver al instruct
  useEffect(() => {
    if (!state) navigate('/instruct', { replace: true })
  }, [state, navigate])

  // Si no llegó imagen pero sí payload, genera la imagen aquí y habilita "Publicar" al finalizar
  useEffect(() => {
    const run = async () => {
      if (image || !payload) return
      const token = localStorage.getItem("token")
      if (!token) {
        setImgLoading(false)
        setImgError('No hay token de Instagram. Conéctalo nuevamente.')
        return
      }
      try {
        setImgLoading(true)
        setImgError('')
        const res = await fetch('https://utilizable-peridermal-candace.ngrok-free.app/api/ai/generate/image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        })
        if (!res.ok) {
          const t = await res.text()
          throw new Error(t || `HTTP ${res.status}`)
        }
        const data = await res.json()
        const url =
          data?.data?.imageUrl ??
          data?.imageUrl ??
          data?.image ??
          data?.['image-url'] ??
          null
        if (!url) throw new Error('No se recibió imageUrl')
        setImage(url)
      } catch (e) {
        setImgError(e?.message || String(e))
      } finally {
        setImgLoading(false)
      }
    }
    run()
  }, [image, payload])

  const canPublish = useMemo(
    () => Boolean(caption?.trim()) && Boolean(image) && !imgLoading && !isPublishing,
    [caption, image, imgLoading, isPublishing]
  )

  const publish = async () => {
    try {
      setPubError('')
      setPubOk(false)
      setIsPublishing(true)

      const igToken = localStorage.getItem("token")
      if (!igToken) throw new Error('No hay token de Instagram. Conéctalo nuevamente.')

      const body = {
        provider: 'instagram',
        content: {
          caption: caption || '',
          ...(image ? { imageUrl: image } : {}),
        },
      }

      await instagramApi.post(body, igToken)
      setPubOk(true)
    } catch (e) {
      setPubError(e?.message || String(e))
    } finally {
      setIsPublishing(false)
    }
  }

  const restart = () => navigate('/instruct') // reiniciar publicación
  const cancel = () => navigate('/onboarding/returning-user') // cancelar y volver
  const goSchedule = () =>
    navigate('/instruct/schedule', {
      state: { caption, image }, // para mostrar preview arriba
    })

  return (
    <div className="min-h-screen bg-[#0B1220] text-white px-4 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/instruct')}
            className="w-9 h-9 rounded-lg bg-white/10 ring-1 ring-white/15 flex items-center justify-center"
            aria-label="Volver"
          >
            ←
          </button>
          <h1 className="text-lg font-semibold">Contenido generado</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-[380px,1fr] lg:grid-cols-[420px,1fr] items-start">
          {/* Preview IG */}
          <InstagramCard image={image} text={caption} loading={imgLoading} />

          {/* Panel derecho */}
          <div className="w-full max-w-sm md:ml-2 space-y-4">
            {/* Editor de caption */}
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-3">
              <label className="text-sm font-semibold mb-2 block">Editar texto</label>
              <textarea
                rows={6}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full rounded-xl bg-inputbg text-white placeholder-slate-400 px-4 py-3 ring-1 ring-white/10
                           focus:outline-none focus:ring-2 focus:ring-brand-primary"
                placeholder="Escribe tu pie de foto…"
              />
              {imgError && (
                <div className="mt-2 text-xs text-red-300 bg-red-900/20 ring-1 ring-red-500/30 rounded-lg px-3 py-2">
                  {imgError}
                </div>
              )}
            </div>

            {/* Publicar */}
            <button
              className={[
                'w-full h-14 rounded-2xl font-semibold flex items-center justify-between px-5',
                'shadow-[0_10px_30px_rgba(30,100,250,0.35)]',
                'text-white',
                canPublish ? 'bg-brand-primary hover:opacity-95' : 'bg-brand-primary/60 cursor-not-allowed',
              ].join(' ')}
              onClick={publish}
              disabled={!canPublish}
              title={!canPublish ? 'Esperando imagen o texto' : undefined}
            >
              <span>{isPublishing ? 'Publicando…' : pubOk ? '¡Publicado!' : 'Publicar'}</span>
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/15">
                <PlusIcon />
              </span>
            </button>

            {/* NUEVO: Agendar publicación */}
            <button
              onClick={goSchedule}
              className="w-full h-14 rounded-2xl bg-white/10 ring-1 ring-white/10 text-white
                         font-semibold flex items-center justify-between px-5 hover:bg-white/15"
            >
              <span>Agendar publicación</span>
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/10">
                <CalendarIcon />
              </span>
            </button>

            {pubError && (
              <div className="text-sm text-red-300 bg-red-900/20 ring-1 ring-red-500/30 rounded-xl px-3 py-2">
                {pubError}
              </div>
            )}
            {pubOk && !pubError && (
              <div className="text-sm text-emerald-300 bg-emerald-900/20 ring-1 ring-emerald-500/30 rounded-xl px-3 py-2">
                ¡Se envió a Instagram correctamente!
              </div>
            )}

            {/* Reiniciar publicación */}
            <button
              onClick={restart}
              className="w-full h-14 rounded-2xl bg-white/10 ring-1 ring-white/10 text-white
                         font-semibold flex items-center justify-between px-5 hover:bg-white/15"
            >
              <span>Reiniciar publicación</span>
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/10">
                <RestartIcon />
              </span>
            </button>

            {/* Cancelar publicación */}
            <button
              onClick={cancel}
              className="w-full h-14 rounded-2xl bg-white/10 ring-1 ring-white/10 text-white
                         font-semibold flex items-center justify-between px-5 hover:bg-white/15"
            >
              <span>Cancelar publicación</span>
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/10">
                <CancelIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
