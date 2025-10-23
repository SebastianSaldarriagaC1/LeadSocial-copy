import RegisterForm from "../../organisms/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Marca */}
        <h1 className="flex items-center justify-center gap-3 mb-8">
          {/* Ícono circular */}
          <img
            src="/assets/logo-icon.png" // 🔹 Reemplaza por el path real
            alt="Lead Social logo"
            className="w-12 h-12 md:w-14 md:h-14"
          />

          {/* Texto del logo */}
          <div className="flex flex-col leading-tight">
            <div className="flex flex-col text-left">
              <span className="text-white font-semibold tracking-[0.25em] text-lg md:text-xl">
                LEAD
              </span>
              <span className="text-white font-light tracking-[0.25em] text-lg md:text-xl">
                SOCIAL
              </span>
            </div>
            <span className="text-[10px] md:text-xs text-white/60 tracking-[0.35em] mt-1 uppercase">
              IA 360 PARA REDES
            </span>
          </div>
        </h1>

        {/* Subtítulo */}
        <h2 className="mt-6 mb-8 text-2xl md:text-3xl font-semibold text-center">
          Crea tu cuenta
        </h2>

        <RegisterForm />
      </div>
    </div>
  );
}
