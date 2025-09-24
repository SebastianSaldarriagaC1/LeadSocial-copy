import RegisterForm from "../../organisms/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Marca */}
        <h1 className="text-center">
          <span className="text-4xl md:text-5xl font-semibold font-sans tracking-tight">
            Lead
          </span>
          <span className="text-4xl md:text-5xl italic font-brandSerif font-medium text-white/90 ml-1 align-baseline">
            Social 360
          </span>
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
