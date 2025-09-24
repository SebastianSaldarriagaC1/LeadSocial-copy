// src/pages/Creator/InstructAIPage.jsx
import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { analyticsApi } from '../../lib/api'
import { getInstagramAccessToken } from '../../lib/ig'

/* Pasos del wizard */
const STEPS = ['Tipo', 'Tema', 'Mensaje', 'Tono', 'CTA', 'Emojis', 'Resumen', 'Red social']

/* ---------- Subcomponentes UI ---------- */
function Stepper({ current }) {
  return (
    <div className="px-1">
      <div className="flex items-center">
        {STEPS.map((_, i) => (
          <div key={i} className="flex items-center flex-1">
            <div
              className={[
                'w-6 h-6 rounded-md border',
                i <= current ? 'bg-brand-primary border-brand-primary' : 'border-white/20',
              ].join(' ')}
            />
            {i < STEPS.length - 1 && (
              <div
                className={[
                  'mx-2 h-0.5 flex-1',
                  i < current ? 'bg-brand-primary' : 'bg-white/20',
                ].join(' ')}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-8 text-[11px] sm:text-xs text-white/70">
        {STEPS.map((s, i) => (
          <div key={s} className="text-center">
            <span className={i === current ? 'text-white font-semibold' : ''}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Card({ children, className = '' }) {
  return (
    <div
      className={
        'rounded-2xl bg-[#475569]/70 backdrop-blur-md ring-1 ring-white/15 shadow-[0_14px_40px_rgba(0,0,0,0.45)] ' +
        className
      }
    >
      {children}
    </div>
  )
}

/** Fila de opción con soporte para disabled + hint "(próximamente)" */
function OptionRow({ label, selected, onClick, disabled = false, hint = '' }) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={[
        'w-full text-left px-4 py-4 rounded-xl flex items-center justify-between',
        'bg-inputbg text-white/90',
        selected && !disabled ? 'ring-2 ring-brand-primary' : 'ring-1 ring-white/10',
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-inputbg/90',
        'transition-colors',
      ].join(' ')}
    >
      <span className="font-semibold">{label}</span>
      <span className="flex items-center gap-2 opacity-60">
        {hint && <span className="text-xs">{hint}</span>}
        <span className="text-lg">{'›'}</span>
      </span>
    </button>
  )
}

function TextArea({ value, onChange, placeholder }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      className="w-full rounded-xl bg-inputbg text-white placeholder-slate-400 px-4 py-3 ring-1 ring-white/10
                 focus:outline-none focus:ring-2 focus:ring-brand-primary"
      placeholder={placeholder}
    />
  )
}

function TextInput({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-2 w-full rounded-xl bg-inputbg text-white placeholder-slate-400 px-4 py-3 ring-1 ring-white/10
                 focus:outline-none focus:ring-2 focus:ring-brand-primary"
      placeholder={placeholder}
    />
  )
}

/* ---------- Página principal ---------- */
export default function InstructAIPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)

  // --------- Tracking por paso (screen-time) ----------
  const [stepStartedAt, setStepStartedAt] = useState(() => Date.now())

  useEffect(() => {
    setStepStartedAt(Date.now())
  }, [])

  useEffect(() => {
    let hiddenAt = 0
    const onVis = () => {
      if (document.hidden) {
        hiddenAt = Date.now()
      } else if (hiddenAt) {
        const delta = Date.now() - hiddenAt
        setStepStartedAt((t) => t + delta)
        hiddenAt = 0
      }
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const sendStepTime = async (stepIndex, millis) => {
    const token = getInstagramAccessToken()
    if (!token) return
    const screenName = `instruct:${STEPS[stepIndex]}`
    try {
      await analyticsApi.screenTime(screenName, Math.max(0, Math.round(millis)), token)
    } catch {}
  }

  const goTo = async (toIndex) => {
    const now = Date.now()
    const spent = now - stepStartedAt
    await sendStepTime(step, spent)
    setStep(toIndex)
    setStepStartedAt(now)
  }

  const next = () => goTo(Math.min(step + 1, STEPS.length - 1))
  const back = () => goTo(Math.max(step - 1, 0))
  // --------- FIN tracking ----------

  const [form, setForm] = useState({
    tipo: '',
    tema: '',
    mensaje: '',
    tono: '',
    tonoOtro: '',
    cta: '',
    emojis: null,
    redes: {
      instagram: '',
      facebook: '',
      twitter: '',
      linkedin: '',
    },
  })

  /* Validación por paso (ajustada a tu regla) */
  const canNext = useMemo(() => {
    switch (step) {
      case 0: // solo válido si eligieron Post estático
        return form.tipo === 'Post estático'
      case 1:
        return form.tema.trim().length > 5
      case 2:
        return form.mensaje.trim().length > 5
      case 3:
        if (!form.tono) return false
        if (form.tono === 'Otro') return form.tonoOtro.trim().length > 0
        return true
      case 4:
        return form.cta.trim().length > 0
      case 5:
        return form.emojis !== null
      case 6:
        return true
      case 7: // solo válido si eligieron Orgánico
        return form.redes.instagram === 'Orgánico'
      default:
        return false
    }
  }, [step, form])

  const payloadForAPI = () => ({
    topic: form.tema,
    message: form.mensaje,
    tone: form.tono === 'Otro' ? form.tonoOtro : form.tono,
    cta: form.cta,
    emojis: form.emojis === true,
  })

  const handleFinish = async () => {
    const spent = Date.now() - stepStartedAt
    await sendStepTime(step, spent)
    const payload = payloadForAPI()
    navigate('/instruct/generating', { state: { payload, mode: 'both' } })
  }

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex flex-col">
      <div className="w-full mx-auto max-w-2xl px-4 pt-6 pb-28">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={step === 0 ? () => navigate(-1) : back}
            className="w-9 h-9 rounded-lg bg-white/10 ring-1 ring-white/15 flex items-center justify-center"
            aria-label="Volver"
          >
            ←
          </button>
          <h1 className="text-lg font-semibold">Instruye a la IA</h1>
        </div>

        <Stepper current={step} />

        {/* Contenido por paso */}
        <div className="mt-5 space-y-4">
          {/* 0: Tipo */}
          {step === 0 && (
            <Card className="p-4">
              <h2 className="text-xl font-extrabold mb-3">Tipo de publicación</h2>
              <div className="space-y-3">
                {['Reel', 'Story', 'Post estático', 'Video Post', 'Hilo', 'Evento en vivo'].map((t) => {
                  const isStatic = t === 'Post estático'
                  return (
                    <OptionRow
                      key={t}
                      label={t}
                      selected={form.tipo === t}
                      onClick={() => setForm((f) => ({ ...f, tipo: t }))}
                      disabled={!isStatic}
                      hint={!isStatic ? '(próximamente)' : ''}
                    />
                  )
                })}
              </div>
            </Card>
          )}

          {/* 1: Tema */}
          {step === 1 && (
            <Card className="p-4">
              <h2 className="text-xl font-extrabold mb-2">¿Sobre qué tema es tu publicación?</h2>
              <p className="text-white/60 text-sm mb-3">
                (Ej.: Lanzamiento de un nuevo producto, promoción, evento, historia de la marca, tip de valor, etc.)
              </p>
              <TextArea
                value={form.tema}
                onChange={(v) => setForm((f) => ({ ...f, tema: v }))}
                placeholder="Lanzamiento de un nuevo apartamento en preventa en Bogotá"
              />
            </Card>
          )}

          {/* 2: Mensaje */}
          {step === 2 && (
            <Card className="p-4">
              <h2 className="text-xl font-extrabold mb-2">¿Cuál es el mensaje principal que quieres comunicar?</h2>
              <TextArea
                value={form.mensaje}
                onChange={(v) => setForm((f) => ({ ...f, mensaje: v }))}
                placeholder="Exclusivo apartamento en preventa con lujo, comodidad y alta plusvalía."
              />
            </Card>
          )}

          {/* 3: Tono */}
          {step === 3 && (
            <Card className="p-4">
              <h2 className="text-xl font-extrabold mb-3">¿Qué tono quieres que tenga la publicación?</h2>
              <div className="space-y-3">
                {['Inspirador', 'Divertido', 'Profesional', 'Cercano', 'Otro'].map((t) => (
                  <OptionRow
                    key={t}
                    label={t}
                    selected={form.tono === t}
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        tono: t,
                        tonoOtro: t === 'Otro' ? f.tonoOtro : '',
                      }))
                    }
                  />
                ))}
                {form.tono === 'Otro' && (
                  <TextInput
                    value={form.tonoOtro}
                    onChange={(v) => setForm((f) => ({ ...f, tonoOtro: v }))}
                    placeholder="Especifica el tono (p. ej., elegante, cercano-profesional, minimalista...)"
                  />
                )}
              </div>
            </Card>
          )}

          {/* 4: CTA */}
          {step === 4 && (
            <Card className="p-4">
              <h2 className="text-xl font-extrabold mb-2">¿Tienes alguna llamada a la acción (CTA)?</h2>
              <TextArea
                value={form.cta}
                onChange={(v) => setForm((f) => ({ ...f, cta: v }))}
                placeholder="Contáctanos ahora y agenda tu visita. ¡No dejes pasar la oportunidad!"
              />
            </Card>
          )}

          {/* 5: Emojis */}
          {step === 5 && (
            <Card className="p-4">
              <h2 className="text-xl font-extrabold mb-3">¿Deseas que el post tenga emojis?</h2>
              <div className="space-y-3">
                <OptionRow
                  label="Sí"
                  selected={form.emojis === true}
                  onClick={() => setForm((f) => ({ ...f, emojis: true }))}
                />
                <OptionRow
                  label="No"
                  selected={form.emojis === false}
                  onClick={() => setForm((f) => ({ ...f, emojis: false }))}
                />
              </div>
            </Card>
          )}

          {/* 6: Resumen */}
          {step === 6 && (
            <Card className="p-4">
              <h2 className="text-xl font-extrabold mb-3">Verifica que la información sea correcta</h2>
              <ol className="space-y-3 text-white/90">
                <li>
                  <p className="font-semibold">Tipo de publicación</p>
                  <p className="text-white/70">{form.tipo || '—'}</p>
                </li>
                <li>
                  <p className="font-semibold">Tema</p>
                  <p className="text-white/70">{form.tema || '—'}</p>
                </li>
                <li>
                  <p className="font-semibold">Mensaje principal</p>
                  <p className="text-white/70">{form.mensaje || '—'}</p>
                </li>
                <li>
                  <p className="font-semibold">Tono</p>
                  <p className="text-white/70">
                    {form.tono ? (form.tono === 'Otro' ? (form.tonoOtro || '—') : form.tono) : '—'}
                  </p>
                </li>
                <li>
                  <p className="font-semibold">CTA</p>
                  <p className="text-white/70">{form.cta || '—'}</p>
                </li>
                <li>
                  <p className="font-semibold">Emojis</p>
                  <p className="text-white/70">
                    {form.emojis === null ? '—' : form.emojis ? 'Sí' : 'No'}
                  </p>
                </li>
              </ol>
            </Card>
          )}

          {/* 7: Red social */}
          {step === 7 && (
            <Card className="p-4">
              <h2 className="text-xl font-extrabold mb-3">Selecciona la red social donde publicarás</h2>

              {/* Instagram */}
              <div className="mb-4 rounded-xl ring-1 ring-white/15 p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">Instagram</p>
                </div>
                <div className="space-y-3">
                  <OptionRow
                    label="Orgánico"
                    selected={form.redes.instagram === 'Orgánico'}
                    onClick={() =>
                      setForm((f) => ({ ...f, redes: { ...f.redes, instagram: 'Orgánico' } }))
                    }
                  />
                  <OptionRow
                    label="Pagar publicidad"
                    selected={false}
                    onClick={() => {}}
                    disabled
                    hint="(próximamente)"
                  />
                </div>
              </div>

              {/* Otras (placeholder) */}
              {['Facebook', 'X (Twitter)', 'LinkedIn'].map((network) => (
                <div key={network} className="mb-3 rounded-xl ring-1 ring-white/10 p-3 opacity-80">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{network}</p>
                    <span className="text-xs text-white/60">(próximamente)</span>
                  </div>
                </div>
              ))}
            </Card>
          )}
        </div>
      </div>

      {/* Footer fijo */}
      <div className="fixed inset-x-0 bottom-0 bg-[#0B1220]/80 backdrop-blur-md border-t border-white/10">
        <div className="mx-auto w-full max-w-2xl px-4 py-3">
          <button
            onClick={step === STEPS.length - 1 ? handleFinish : next}
            disabled={!canNext}
            className={[
              'h-12 w-full rounded-xl font-semibold',
              'bg-brand-primary text-white',
              !canNext && 'opacity-50 cursor-not-allowed',
            ].join(' ')}
          >
            {step === STEPS.length - 1 ? 'Finalizar' : 'Continuar'}
          </button>
        </div>
      </div>
    </div>
  )
}
