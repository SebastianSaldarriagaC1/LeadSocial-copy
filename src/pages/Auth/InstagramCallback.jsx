// src/pages/Auth/InstagramCallback.jsx
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { saveInstagramTokens } from '../../lib/ig'

export default function InstagramCallback() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = params.get('accessToken')
    const refreshToken = params.get('refreshToken')

    if (accessToken) {
      saveInstagramTokens({ accessToken, refreshToken })
    }

    // vuelve a tu flujo (ej. first-time o donde definas)
    navigate('/first-time', { replace: true })
  }, [params, navigate])

  return null
}
