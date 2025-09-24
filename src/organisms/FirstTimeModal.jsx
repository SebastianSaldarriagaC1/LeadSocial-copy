import Button from "../atoms/Button"
import { useNavigate } from "react-router-dom"

export default function FirstTimeModal({ open, onClose }) {
  const navigate = useNavigate()
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative w-[92%] max-w-sm rounded-2xl bg-[#475569] p-5 shadow-2xl ring-1 ring-white/10">
        <h2 className="text-center text-white text-2xl font-extrabold leading-snug mb-4">
          ¿Entras por primera vez?
        </h2>

        <div className="space-y-3">
          <Button onClick={() => navigate('/register')}>
            Nuevo usuario
          </Button>

          <Button
            className="bg-inputbg hover:bg-inputbg/90"
            onClick={onClose}
          >
            Antiguo usuario
          </Button>
        </div>
      </div>
    </div>
  )
}
