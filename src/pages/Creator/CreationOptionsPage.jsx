import Button from "../../atoms/Button";
import { useNavigate } from "react-router-dom";

export default function CreationOptionsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B1220] text-white grid place-items-center px-4">
      <div className="w-[92%] max-w-sm rounded-2xl bg-[#475569]/80 p-6 shadow-2xl ring-1 ring-white/10">
        <h2 className="text-center text-2xl font-extrabold leading-snug mb-5">
          ¿Cómo quieres crear el post?
        </h2>

        <div className="space-y-3">
          <Button onClick={() => navigate("/instruct/type")}>Desde cero</Button>

          <Button
            disabled
            className="bg-[#1E293B] text-gray-400 cursor-not-allowed"
          >
            Cargar Una Foto (Próximamente)
          </Button>

          <Button
            disabled
            className="bg-[#1E293B] text-gray-400 cursor-not-allowed"
          >
            Tomar Una Foto (Próximamente)
          </Button>
        </div>
      </div>
    </div>
  );
}
