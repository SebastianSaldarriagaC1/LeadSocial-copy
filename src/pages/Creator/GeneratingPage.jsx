import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getInstagramAccessToken } from '../../lib/ig'

export default function GeneratingPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const payload = state?.payload
  // Soporta modos anteriores; por defecto hacemos ambos
  const mode = state?.mode ?? 'both' // 'both' | 'text'

  useEffect(() => {
    if (!payload) {
      navigate('/instruct', { replace: true })
      return
    }

    const run = async () => {
      try {
        const BASE = 'https://utilizable-peridermal-candace.ngrok-free.app'
        const textURL  = `${BASE}/api/ai/generate/text`
        const imageURL = `${BASE}/api/ai/generate/image`

        const igAccess = getInstagramAccessToken()
        if (!igAccess) {
          console.warn('IG access token no encontrado')
          navigate('/first-time', { replace: true })
          return
        }

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${igAccess}`,
        }
        const body = JSON.stringify(payload)

        // --- MODO SOLO TEXTO (compatibilidad) ---
        if (mode === 'text') {
          const res = await fetch(textURL, { method: 'POST', headers, body })
          if (res.status === 401) {
            navigate('/first-time', { replace: true }); return
          }
          if (!res.ok) throw new Error((await res.text()) || `HTTP ${res.status}`)

          const data = await res.json()
          const generatedText =
            data?.['post-text'] ?? data?.postText ?? data?.text ?? data?.content ?? data?.result ?? ''

          navigate('/instruct/result', {
            replace: true,
            state: { text: generatedText, image: null, payload },
          })
          return
        }

        // --- MODO AMBOS: disparamos en paralelo ---
        const textReq  = fetch(textURL,  { method: 'POST', headers, body })
        const imageReq = fetch(imageURL, { method: 'POST', headers, body })

        // 1) Esperamos SOLO el texto para navegar rápido
        const textRes = await textReq
        if (textRes.status === 401) { navigate('/first-time', { replace: true }); return }
        if (!textRes.ok) throw new Error((await textRes.text()) || `HTTP ${textRes.status}`)

        const textJson = await textRes.json()
        const generatedText =
          textJson?.['post-text'] ?? textJson?.postText ?? textJson?.text ?? textJson?.content ?? textJson?.result ?? ''

        // Navegamos ya con el texto (sin imagen aún)
        navigate('/instruct/result', {
          replace: true,
          state: { text: generatedText, image: null, payload },
        })

        // 2) Cuando la imagen esté lista, actualizamos la misma ruta con replace
        imageReq
          .then(async (imgRes) => {
            if (!imgRes.ok) throw new Error((await imgRes.text()) || `HTTP ${imgRes.status}`)
            const imgJson = await imgRes.json()
            const imageUrl =
              imgJson?.['image-url'] ?? imgJson?.imageUrl ?? imgJson?.image ?? null
            if (imageUrl) {
              navigate('/instruct/result', {
                replace: true,
                state: { text: generatedText, image: imageUrl, payload },
              })
            }
          })
          .catch((e) => {
            // No rompemos el flujo si falla la imagen; solo lo registramos
            console.warn('Error generando imagen:', e)
          })
      } catch (err) {
        navigate('/instruct/result', {
          replace: true,
          state: {
            text:
              'Hubo un problema generando el contenido. Intenta nuevamente.\n\n' +
              String(err),
            payload,
            error: true,
          },
        })
      }
    }

    run()
  }, [navigate, payload, mode])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E64FA] relative overflow-hidden">
      <div className="absolute -left-24 -top-24 w-80 h-80 rounded-[40px] border-[32px] border-blue-300/25" />
      <div className="absolute -right-20 top-10 w-72 h-72 rounded-[40px] border-[32px] border-blue-300/25" />
      <div className="absolute -left-10 bottom-0 w-80 h-80 rounded-[40px] border-[32px] border-blue-300/25" />
      <div className="flex flex-col items-center gap-6 z-10">
        <div className="w-24 h-24 rounded-[20px] border-[12px] border-blue-300/40 relative">
          <div className="absolute bottom-0 right-0 w-9 h-9 bg-white rounded-md animate-pulse" />
        </div>
        <p className="text-white text-lg font-semibold">Creando publicación…</p>
      </div>
    </div>
  )
}
